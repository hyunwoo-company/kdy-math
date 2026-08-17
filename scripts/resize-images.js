/**
 * 프로필 원본 사진을 웹용으로 리사이즈한다.
 *
 * 사용법 (저장소 루트에서):
 *   node scripts/resize-images.js
 *
 * 입력  : _source-images/  (원본. gitignore 대상이므로 저장소에 없다 — 로컬 보관본을 쓴다)
 * 출력  : public/images/    (커밋 대상)
 *
 * 원본이 4000~6000px / 10MB대라 그대로 커밋하면 저장소가 수십 MB 불어난다.
 * 긴 변 1600px + jpeg quality 85 로 줄이면 100~200KB 수준이 되고, 이 해상도면
 * 레티나 디스플레이에서도 충분하다.
 *
 * 새 사진으로 교체할 때:
 *   1. 새 원본을 _source-images/ 에 넣는다
 *   2. 아래 JOBS 의 src 를 새 파일명으로 바꾼다 (out 은 그대로 두면 코드 수정이 불필요하다)
 *   3. 이 스크립트를 실행한다
 *   4. public/images/ 의 결과물을 커밋한다
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SRC_DIR = path.join(ROOT, "_source-images");
const OUT_DIR = path.join(ROOT, "public", "images");

/** 긴 변 기준 최대 픽셀 */
const MAX_EDGE = 1600;
/** jpeg 품질 */
const QUALITY = 85;

const JOBS = [
  { src: "profile2.jpg", out: "kdy-hero.jpg", note: "가로 / 손가락 든 니트 → 홈 히어로" },
  { src: "profile3.jpg", out: "kdy-about.jpg", note: "세로 / 팔짱 니트 → 소개" },
  { src: "profile1.jpg", out: "kdy-teaching.jpg", note: "세로 / 정장+마커 → 학부모용·상담" },
];

(async () => {
  if (!fs.existsSync(SRC_DIR)) {
    console.error(
      `원본 폴더가 없습니다: ${SRC_DIR}\n` +
        `_source-images/ 는 gitignore 대상입니다. 원본 사진을 이 폴더에 넣고 다시 실행하세요.`,
    );
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  let failed = 0;

  for (const job of JOBS) {
    const srcPath = path.join(SRC_DIR, job.src);
    const outPath = path.join(OUT_DIR, job.out);

    if (!fs.existsSync(srcPath)) {
      console.error(`건너뜀 — 원본 없음: ${job.src}`);
      failed += 1;
      continue;
    }

    const meta = await sharp(srcPath).metadata();
    const isLandscape = meta.width >= meta.height;

    await sharp(srcPath)
      .resize(isLandscape ? { width: MAX_EDGE } : { height: MAX_EDGE })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toFile(outPath);

    const before = fs.statSync(srcPath).size;
    const after = fs.statSync(outPath).size;
    const outMeta = await sharp(outPath).metadata();

    console.log(
      `${job.src} (${meta.width}x${meta.height}, ${Math.round(before / 1024)}KB)` +
        ` -> ${job.out} (${outMeta.width}x${outMeta.height}, ${Math.round(after / 1024)}KB)`,
    );
    console.log(`   ${job.note}`);
  }

  if (failed > 0) {
    console.error(`\n${failed}개 실패. 위 메시지를 확인하세요.`);
    process.exit(1);
  }
  console.log("\n완료. public/images/ 결과물을 커밋하세요.");
})();
