/**
 * 수업 후기 카카오톡 캡쳐 원본을 웹용으로 리사이즈한다.
 *
 * 사용법 (저장소 루트에서):
 *   node scripts/resize-review-images.js
 *
 * 입력  : _source-images/reviews/  (원본. gitignore 대상 — 로컬 보관본을 쓴다)
 * 출력  : public/images/reviews/    (커밋 대상)
 *
 * ── 개인정보 원칙 ─────────────────────────────────────────────
 * 아래 JOBS 에는 "사람을 특정할 수 있는 정보가 화면에 없는" 캡쳐만 넣는다.
 * 게시하면 안 되는 것:
 *   - 학생·학부모 실명, 전화번호, 학교명
 *   - 합격증·성적표 원본 (수험번호·성명이 찍혀 있다)
 *   - 식별 가능한 프로필 사진
 * 카카오톡 기본 프로필 아이콘, "쌤"/"학생" 표기, 발신 시각은 특정 정보가
 * 아니므로 그대로 둔다.
 *
 * 새 캡쳐를 추가할 때:
 *   1. 원본을 _source-images/reviews/ 에 넣는다
 *   2. 위 원칙에 따라 게시 가능한지 직접 눈으로 확인한다
 *   3. 아래 JOBS 에 { src, out, note } 를 추가한다
 *   4. 이 스크립트를 실행하고 public/images/reviews/ 결과물을 커밋한다
 *   5. content/reviews.ts 의 shots 배열에 같은 파일명을 추가한다
 *      (width/height 는 이 스크립트가 출력한 값을 그대로 적는다)
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SRC_DIR = path.join(ROOT, "_source-images", "reviews");
const OUT_DIR = path.join(ROOT, "public", "images", "reviews");

/**
 * 가로 폭 기준 최대 픽셀.
 * 캡쳐는 사진이 아니라 텍스트라 축소하면 글자가 흐려진다. 원본이 4320px 대이므로
 * 1200px 이면 썸네일(약 380px)에서 3배, 확대 보기에서 1배 이상을 확보한다.
 */
const MAX_WIDTH = 1200;
/** jpeg 품질 — 텍스트 캡쳐라 사진(85)보다 약간 높게 잡는다 */
const QUALITY = 88;

/**
 * 게시할 캡쳐 목록.
 * out 파일명은 content/reviews.ts 의 shots 와 1:1로 맞춘다.
 */
const JOBS = [
  { src: "KakaoTalk_20260815_193034494_02.jpg", out: "review-01.jpg", note: "학생 — 전교 49등" },
  { src: "KakaoTalk_20260815_193034494_07.jpg", out: "review-02.jpg", note: "학생 — 모의고사 수학 1등급" },
  { src: "KakaoTalk_20260815_193034494_12.jpg", out: "review-03.jpg", note: "학생 — 1등급, 전교 11등" },
  { src: "KakaoTalk_20260815_193034494_14.jpg", out: "review-04.jpg", note: "학생 — 최종 85.9점" },
  { src: "KakaoTalk_20260815_193034494_16.jpg", out: "review-05.jpg", note: "학생 — 수학 100점" },
  { src: "KakaoTalk_20260815_193034494_17.jpg", out: "review-06.jpg", note: "학생 — 원점수 96점, 대학 합격" },
  { src: "KakaoTalk_20260815_193034494_21.jpg", out: "review-07.jpg", note: "학생 — 가내신 거의 만점" },
  { src: "KakaoTalk_20260815_193034494_23.jpg", out: "review-08.jpg", note: "학생 — 대학 추가 합격" },
  { src: "KakaoTalk_20260815_193034494_03.jpg", out: "review-09.jpg", note: "학부모 — 클리닉 감사 (이름 이미 가려짐)" },
  { src: "KakaoTalk_20260815_193034494_13.jpg", out: "review-10.jpg", note: "학부모 — 감사 인사 (이름 이미 가려짐)" },
];

(async () => {
  if (!fs.existsSync(SRC_DIR)) {
    console.error(
      `원본 폴더가 없습니다: ${SRC_DIR}\n` +
        `_source-images/reviews/ 는 gitignore 대상입니다. 캡쳐 원본을 이 폴더에 넣고 다시 실행하세요.`,
    );
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  let failed = 0;
  /** content/reviews.ts 에 붙여 넣을 수 있도록 결과를 모아 마지막에 출력한다 */
  const lines = [];

  for (const job of JOBS) {
    const srcPath = path.join(SRC_DIR, job.src);
    const outPath = path.join(OUT_DIR, job.out);

    if (!fs.existsSync(srcPath)) {
      console.error(`건너뜀 — 원본 없음: ${job.src}`);
      failed += 1;
      continue;
    }

    const meta = await sharp(srcPath).metadata();

    await sharp(srcPath)
      // 원본이 MAX_WIDTH 보다 작으면 확대하지 않는다 (withoutEnlargement)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
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

    lines.push(`  { src: "/images/reviews/${job.out}", width: ${outMeta.width}, height: ${outMeta.height} },`);
  }

  if (failed > 0) {
    console.error(`\n${failed}개 실패. 위 메시지를 확인하세요.`);
    process.exit(1);
  }

  console.log("\n── content/reviews.ts 의 shots 에 넣을 크기값 ──");
  console.log(lines.join("\n"));
  console.log("\n완료. public/images/reviews/ 결과물을 커밋하세요.");
})();
