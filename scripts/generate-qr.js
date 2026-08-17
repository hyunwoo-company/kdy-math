/**
 * 사이트 주소로 연결되는 QR 코드를 생성한다.
 *
 * 사용법 (저장소 루트에서):
 *   node scripts/generate-qr.js
 *
 * 출력 (public/qr/ — 커밋 대상):
 *   site-qr.svg      벡터. 명함·인쇄물용. 크기를 아무리 키워도 깨지지 않는다 → 인쇄는 이걸 쓴다
 *   site-qr.png      1024px. 웹·카톡 공유·간단한 미리보기용
 *   site-qr@2x.png   2048px. 고해상도가 필요할 때
 *
 * ⚠️ 사이트 주소가 바뀌면 QR 도 반드시 다시 만들어야 한다.
 *    이미 인쇄한 명함의 QR 은 고칠 수 없으므로, 명함 제작 전에 주소를 확정하라.
 *
 * 오류 보정 레벨은 'M'(약 15% 손상까지 복원)을 쓴다. 명함처럼 작게 인쇄하고
 * 손으로 만지는 매체에서는 이 정도 여유가 있어야 인식률이 안정적이다.
 */
const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");

/** 사이트 운영 주소. 변경 시 이 값만 고치고 다시 실행한다. */
const SITE_URL = "https://kdy-math.vercel.app";

const OUT_DIR = path.join(__dirname, "..", "public", "qr");

/** 공통 옵션 — 색은 apple-design 토큰의 텍스트/배경색과 맞춘다 */
const COMMON = {
  errorCorrectionLevel: "M",
  margin: 2,
  color: {
    dark: "#1d1d1f", // 디자인 시스템 텍스트 색
    light: "#ffffff",
  },
};

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const svg = await QRCode.toString(SITE_URL, { ...COMMON, type: "svg" });
  const svgPath = path.join(OUT_DIR, "site-qr.svg");
  fs.writeFileSync(svgPath, svg, "utf8");

  const targets = [
    { file: "site-qr.png", width: 1024 },
    { file: "site-qr@2x.png", width: 2048 },
  ];

  for (const t of targets) {
    await QRCode.toFile(path.join(OUT_DIR, t.file), SITE_URL, {
      ...COMMON,
      type: "png",
      width: t.width,
    });
  }

  console.log(`QR 대상 주소: ${SITE_URL}\n`);
  for (const f of ["site-qr.svg", ...targets.map((t) => t.file)]) {
    const p = path.join(OUT_DIR, f);
    console.log(`  ${f.padEnd(16)} ${Math.round(fs.statSync(p).size / 1024)}KB`);
  }
  console.log("\n명함·인쇄물에는 site-qr.svg 를 쓰세요 (확대해도 깨지지 않습니다).");
})();
