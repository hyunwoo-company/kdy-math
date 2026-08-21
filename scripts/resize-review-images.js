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
 * 프로필 사진이 왼쪽 가장자리에 걸려 있는 캡쳐는 `cropLeft` 로 그만큼 잘라낸다.
 * 블러가 아니라 잘라내는 이유: 블러는 강도가 약하면 복원 여지가 남고, 어차피
 * 말풍선은 오른쪽에 있어 잘라도 내용이 보존된다.
 *
 * 제외한 원본 (JOBS 에 넣지 마라):
 *   _19  고려대 입학허가통지서 — 통지서에 성명·수험번호가 찍혀 있고,
 *        같은 캡쳐의 메시지 본문에도 학생 실명이 그대로 있다.
 *        이 소식은 content/reviews.ts 의 인용문으로만 익명화해 전달한다.
 *
 * 새 캡쳐를 추가할 때:
 *   1. 원본을 _source-images/reviews/ 에 넣는다
 *   2. 위 원칙에 따라 게시 가능한지 직접 눈으로 확인한다
 *   3. 아래 JOBS 에 { src, out, note } 를 추가한다 (필요하면 cropLeft)
 *   4. 이 스크립트를 실행하고 public/images/reviews/ 결과물을 커밋한다
 *   5. content/reviews.ts 의 shots.items 에 같은 파일명을 추가한다
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
 * 1200px 이면 두 칸 배치(약 944px)에서 1배 이상을 확보한다.
 */
const MAX_WIDTH = 1200;
/** jpeg 품질 — 텍스트 캡쳐라 사진(85)보다 약간 높게 잡는다 */
const QUALITY = 88;

const P = "KakaoTalk_20260815_193034494";

/**
 * 게시할 캡쳐 목록. out 파일명은 content/reviews.ts 의 shots 와 1:1로 맞춘다.
 * cropLeft = 왼쪽에서 잘라낼 픽셀(원본 기준). 프로필 사진 제거용.
 */
const JOBS = [
  { src: `${P}_02.jpg`, out: "review-01.jpg", note: "학생 — 전교 49등" },
  { src: `${P}_07.jpg`, out: "review-02.jpg", note: "학생 — 모의고사 수학 1등급" },
  { src: `${P}_12.jpg`, out: "review-03.jpg", note: "학생 — 1등급, 전교 11등" },
  { src: `${P}_14.jpg`, out: "review-04.jpg", note: "학생 — 최종 85.9점" },
  { src: `${P}_16.jpg`, out: "review-05.jpg", note: "학생 — 수학 100점" },
  { src: `${P}_17.jpg`, out: "review-06.jpg", note: "학생 — 원점수 96점, 대학 합격" },
  { src: `${P}_21.jpg`, out: "review-07.jpg", note: "학생 — 가내신 거의 만점" },
  { src: `${P}_23.jpg`, out: "review-08.jpg", note: "학생 — 대학 추가 합격" },
  { src: `${P}_03.jpg`, out: "review-09.jpg", note: "학부모 — 클리닉 감사 (이름 이미 가려짐)" },
  { src: `${P}_13.jpg`, out: "review-10.jpg", note: "학부모 — 감사 인사 (이름 이미 가려짐)" },
  { src: `${P}_01.jpg`, out: "review-11.jpg", note: "학생 — 18점 상승 (시험지 사진, 이름 없음)" },
  { src: `${P}_04.jpg`, out: "review-12.jpg", note: "학부모 — 수학을 버리느냐 마느냐 기로에서" },
  { src: `${P}_05.jpg`, out: "review-13.jpg", note: "학생 — 자료 감사, 수학 16등" },
  {
    src: `${P}_06.jpg`,
    out: "review-14.jpg",
    cropLeft: 470,
    note: "학부모 — 치키쿠폰 복습 / 왼쪽 프로필 사진(풍경) 잘라냄",
  },
  { src: `${P}_08.jpg`, out: "review-15.jpg", note: "학생 — 수강자수 346명 중 32번째" },
  { src: `${P}_09.jpg`, out: "review-16.jpg", note: "학생 — 72.9점, 최종 2등급 예상" },
  { src: `${P}_10.jpg`, out: "review-17.jpg", note: "학생 — 36등까지 2등급인데 35등" },
  { src: `${P}_11.jpg`, out: "review-18.jpg", note: "학생 — 처음으로 객관식 완주" },
  {
    src: `${P}_15.jpg`,
    out: "review-19.jpg",
    cropLeft: 45,
    note: "학생 — 89.7점 커리어 하이 / 왼쪽 프로필 조각 잘라냄",
  },
  {
    src: `${P}_18.jpg`,
    out: "review-20.jpg",
    cropLeft: 160,
    note: "학부모 — 감사 인사 / 왼쪽 프로필 사진 잘라냄",
  },
  { src: `${P}_20.jpg`, out: "review-21.jpg", note: "졸업생 — 스승의날 메시지" },
  { src: `${P}_22.jpg`, out: "review-22.jpg", note: "학생 — 시험지 사진과 100점 (이름 식별 불가)" },
  {
    src: `${P}.jpg`,
    out: "review-23.jpg",
    cropLeft: 50,
    note: "학생 — 362명 중 35등 / 왼쪽 프로필 조각 잘라냄",
  },
];

/**
 * 홈에 쓰는 "후기 모음" 이미지.
 *
 * 원본에는 위쪽에 제목 글자가 얹혀 있는데, 그림 속 글자는 검색엔진과 스크린리더가
 * 읽지 못하고 나중에 문구를 고칠 수도 없다. 그래서 **제목 영역을 잘라내고 콜라주만**
 * 남긴다. 제목은 content/reviews.ts 의 homeSection.header 로 화면에 얹는다.
 *
 * 잘라낼 높이는 고정값이 아니라 밝기로 찾는다. 제목 영역은 흰 배경이고 콜라주는
 * 어두운 카톡 캡쳐라, 위에서 아래로 내려가며 처음으로 어두워지는 행이 경계다.
 * (제목 줄 수가 바뀌거나 다른 이미지로 교체해도 그대로 동작한다)
 */
const COLLAGE = {
  src: "collage-source.png",
  out: "review-collage.jpg",
  /** 이 밝기 미만이면 "어두운 콜라주 영역"으로 본다 (0~255) */
  darkThreshold: 120,
  quality: 90,
};

async function buildCollage() {
  const srcPath = path.join(SRC_DIR, COLLAGE.src);
  if (!fs.existsSync(srcPath)) {
    console.error(`건너뜀 — 콜라주 원본 없음: ${COLLAGE.src}`);
    return false;
  }

  const { width, height } = await sharp(srcPath).metadata();
  const grey = await sharp(srcPath).greyscale().raw().toBuffer();

  const rowBrightness = (y) => {
    let sum = 0;
    for (let x = 0; x < width; x++) sum += grey[y * width + x];
    return sum / width;
  };

  let top = 0;
  for (let y = 0; y < height; y++) {
    if (rowBrightness(y) < COLLAGE.darkThreshold) {
      top = y;
      break;
    }
  }

  const outPath = path.join(OUT_DIR, COLLAGE.out);
  await sharp(srcPath)
    .extract({ left: 0, top, width, height: height - top })
    .jpeg({ quality: COLLAGE.quality, mozjpeg: true })
    .toFile(outPath);

  const meta = await sharp(outPath).metadata();
  console.log(
    `\n${COLLAGE.src} (${width}x${height}) [위쪽 제목 ${top}px 잘라냄]` +
      ` -> ${COLLAGE.out} (${meta.width}x${meta.height}, ${Math.round(fs.statSync(outPath).size / 1024)}KB)`,
  );
  console.log(
    `   content/reviews.ts 의 homeSection.collage → width: ${meta.width}, height: ${meta.height}`,
  );
  return true;
}

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
    let pipeline = sharp(srcPath);

    if (job.cropLeft) {
      if (job.cropLeft >= meta.width) {
        console.error(`건너뜀 — cropLeft(${job.cropLeft})가 원본 폭보다 큽니다: ${job.src}`);
        failed += 1;
        continue;
      }
      pipeline = pipeline.extract({
        left: job.cropLeft,
        top: 0,
        width: meta.width - job.cropLeft,
        height: meta.height,
      });
    }

    await pipeline
      // 원본이 MAX_WIDTH 보다 작으면 확대하지 않는다
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toFile(outPath);

    const after = fs.statSync(outPath).size;
    const outMeta = await sharp(outPath).metadata();

    console.log(
      `${job.src} (${meta.width}x${meta.height})` +
        `${job.cropLeft ? ` [좌측 ${job.cropLeft}px 잘라냄]` : ""}` +
        ` -> ${job.out} (${outMeta.width}x${outMeta.height}, ${Math.round(after / 1024)}KB)`,
    );
    console.log(`   ${job.note}`);

    lines.push(
      `  { src: "/images/reviews/${job.out}", width: ${outMeta.width}, height: ${outMeta.height} },` +
        `  // 비율 ${(outMeta.width / outMeta.height).toFixed(2)}`,
    );
  }

  if (!(await buildCollage())) failed += 1;

  if (failed > 0) {
    console.error(`\n${failed}개 실패. 위 메시지를 확인하세요.`);
    process.exit(1);
  }

  console.log("\n── content/reviews.ts 의 shots.items 에 넣을 크기값 ──");
  console.log(lines.join("\n"));
  console.log("\n완료. public/images/reviews/ 결과물을 커밋하세요.");
})();
