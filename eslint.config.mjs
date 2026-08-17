import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // 작업용 임시 스크립트(커밋 대상 아님, .gitignore 처리됨)
    "tmp/**",
  ]),
  {
    // scripts/ 는 브라우저 번들이 아니라 `node scripts/*.js` 로 직접 실행하는
    // CommonJS 유틸리티다. require() 를 쓰는 것이 정상이다.
    files: ["scripts/**/*.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
]);

export default eslintConfig;
