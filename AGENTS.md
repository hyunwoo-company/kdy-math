<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- ↑ 위 블록은 `next dev` 가 자동 생성·재삽입한다. 지우지 말 것 (근거: node_modules/next/dist/server/lib/generate-agent-files.js) -->

# AGENTS.md — 이 저장소의 컨벤션 단일 소스

이 파일이 **원본**이다. `CLAUDE.md` / `GEMINI.md` / `.github/copilot-instructions.md` 는 이 파일을 가리키는 포인터일 뿐이다.
규칙을 바꿀 때는 **이 파일만** 고친다. 다른 파일에 규칙을 복제하지 마라.

관련 문서: 배포·실행은 [DEPLOY.md](DEPLOY.md), 비개발자용 콘텐츠 수정 안내는 [CONTENT-GUIDE.md](CONTENT-GUIDE.md).

---

## 1. 이 프로젝트는 무엇인가

수학 강사 **김동영**(브랜드 **`DYnamic MATH`**)의 개인 프로필 사이트다. 독자는 **학부모와 학생**, 언어는 **한국어**.
목적은 수강 상담 유도이며 명함의 QR 코드로 연결할 예정이다. 서버·DB·백엔드가 없는 **정적 사이트**이고, 상담 문의는 `tel:` / `mailto:` 링크로만 처리한다(**문의 폼을 만들지 않는다**). 환경변수도 없다.
저장소는 **독립 저장소**다. 모노레포가 아니며, 강사가 늘어나면 이 저장소를 템플릿으로 복제해 **새 저장소 + 새 Vercel 프로젝트**를 만든다(절차는 DEPLOY.md). 비개발자가 각자 자기 저장소만 관리하도록 서로 건드릴 여지를 없앤 구조다.

## 2. 스택 (package.json 기준)

| 항목 | 값 |
|---|---|
| 프레임워크 | Next.js **16.3.1**, App Router, `src/` 없음 |
| 언어 | TypeScript, import alias `@/*` → 저장소 루트 |
| 스타일 | Tailwind CSS **v4** (`@tailwindcss/postcss`). 토큰은 `app/globals.css` 의 `@theme` / `@theme inline` |
| 폰트 | Pretendard Variable **dynamic subset**. `app/pretendard.css` 의 `@font-face` 92개 + `public/fonts/pretendard/*.woff2`. **`next/font` 를 쓰지 않는다** |
| 아이콘 | `lucide-react` |
| 유틸 | `clsx` + `tailwind-merge` → `lib/utils.ts` 의 `cn()` |
| 애니메이션 | **CSS transition + IntersectionObserver** (`components/ui/Reveal.tsx`) |
| 분석 | Vercel Web Analytics (`@vercel/analytics`). `app/layout.tsx` 의 `<Analytics />` 하나로 동작하며 개발 환경에서는 전송하지 않는다 |
| 린트 | ESLint 9 + `eslint-config-next` (`npm run lint` = `eslint`) |
| Node | `next@16.3.1` 요구사항 `>=20.9.0` |

`motion` / `framer-motion` 은 **의도적으로 제거**했다. 재설치 금지(이유는 6절 3번).

## 3. 최우선 규칙 — UI를 만지기 전에 디자인 스킬을 읽어라

UI(페이지·섹션·컴포넌트·색·여백·타이포·애니메이션)를 **새로 만들거나 고치기 전에** 반드시 아래를 읽는다.

```
.claude/skills/apple-design/SKILL.md
```

- **Claude Code** 는 이 스킬이 자동 로드된다.
- **그 외 도구(GPT·Codex·Gemini CLI·Cursor·Copilot 등)는 스킬이 자동 로드되지 않는다.** 파일을 직접 열어 읽어야 한다. "스킬이 없다"는 이유로 임의 디자인을 하지 마라.
- 상세 문서: `.claude/skills/apple-design/references/` 의 `principles.md`, `colors.md`, `typography.md`, `spacing-layout.md`, `glassmorphism.md`, `animations.md`, `components/{buttons,cards,navigation}.md`, `frameworks/{react,tailwind}.md`.
- SKILL.md 끝의 **자체 점검 체크리스트**를 UI 작업 후 통과시켜라.

### 3-1. 스킬을 못 읽었더라도 최소한 이건 지켜라 (요약이며, 원본은 SKILL.md)

**색** — 이 목록 밖의 hex를 쓰지 않는다. 컴포넌트에 hex 직접 작성 금지, 반드시 `@theme` 토큰 경유.

| 역할 | Light | Dark |
|---|---|---|
| 텍스트 / 보조 텍스트 | `#1d1d1f` / `#6e6e73` | `#f5f5f7` / `#86868b` |
| 배경 / 대체 섹션 배경 | `#ffffff` / `#f5f5f7` | `#000000` / `#1d1d1f` |
| 구분선 | `#d2d2d7` | `#424245` |
| 액센트 (**CTA 전용, 딱 1개**) | `#0071e3` (hover `#0077ed`) | 동일 |

- **radius 4종만**: `980px`(pill 버튼) · `24px`(큰 컨테이너/이미지) · `18px`(카드) · `12px`(작은 요소). 임의값 금지.
- **폰트 웨이트 400·600만**. Display에 한해 700. **900 금지**.
- **그림자 사실상 미사용**. 깊이는 배경색 대비(`#ffffff` vs `#f5f5f7`)로 만든다. 꼭 필요하면 `0 4px 24px rgba(0,0,0,0.06)` 하나만.
- **이징 `cubic-bezier(0.16, 1, 0.3, 1)`** (토큰 `--ease-apple`). 등장 애니메이션에만 쓰고 무한 루프 장식 금지.
- **한국어 텍스트에 `break-keep`(word-break: keep-all) 필수**, 본문 폭 **`65ch` 이하**.
- 보라/네온 그라데이션, 이모지 아이콘, 액센트 2개 이상, 히어로 밖 본문 중앙정렬, 카드에 글래스모피즘 — 전부 금지.

## 4. 콘텐츠 수정 위치

**원칙: 사이트에 보이는 모든 한국어 문자열은 `content/` 안에만 존재한다.** 컴포넌트·페이지는 `content/` 모듈에서 import해서 쓴다. `aria-label`·`alt`·버튼 문구까지 포함한다. 비개발자가 AI에게 "content 폴더만 고쳐줘"라고 지시할 수 있어야 하는 것이 이 구조의 목적이다.

페이지별 파일로 분리돼 있고, `content/index.ts` 배럴을 통해서만 import한다. **컴포넌트·페이지는 항상 `@/content` 에서 가져온다** (`@/content/reviews` 처럼 개별 파일을 직접 가리키지 마라).

| 무엇을 바꾸려면 | 파일 | export |
|---|---|---|
| 브랜드명 · 홈 SEO · 상단 탭 목록 · 푸터 · 접근성 라벨 | `content/site.ts` | `site`, `seo`, `titleTemplate`, `nav`, `footer`, `a11y` |
| 공용 타입 (`Cta`, `PageMeta`, `Photo`, `Intro`, `SectionHeader`, `CardItem`, `InfoItem`, `CtaBlock`) | `content/site.ts` | 위 타입들 |
| 강사 이름 · 슬로건 · 핵심 카피 · 사진 · 학력 · 경력 · 지도 철학 · 지도 방식 3가지 | `content/instructor.ts` | `instructor`, `photos`, `education`, `career`, `philosophy`, `methods` |
| 홈(`/`) 문구 | `content/home.ts` | `home` |
| 학생용 안내(`/students`) | `content/students.ts` | `students` |
| 학부모용 안내(`/parents`) | `content/parents.ts` | `parents` |
| 수업 영상(`/videos`) | `content/videos.ts` | `videos`(목록), `videosPage`(문구) |
| 수업 후기(`/reviews`) — 인용문 · 캡쳐 · 홈 요약 | `content/reviews.ts` | `reviews`, `ReviewQuote` |
| 상담 문의(`/contact`) — 전화·이메일 | `content/contact.ts` | `contact`, `ContactChannel` |

- `content/*.ts` 의 값에 `as const` 를 쓰면 `readonly` 배열이 된다. props 타입을 `readonly` 호환으로 잡아야 타입 에러가 안 난다.
- **`content/reviews.ts` 는 개인정보가 걸린 파일이다.** 실명·학교·연락처를 넣지 마라. 파일 맨 위 주석의 4개 원칙을 반드시 읽고 지켜라. 캡쳐 이미지를 추가할 때는 `scripts/resize-review-images.js` 주석의 절차를 따른다.
- 연락처(`content/contact.ts`)의 실제 값은 아직 전달받지 못했다 — 임의로 만들어 넣지 말고 TODO 주석으로 남겨라(11절).

## 5. 라우트 구조

6탭 구조. 전부 구현돼 있다.

| 라우트 | 파일 | 내용 |
|---|---|---|
| `/` | `app/page.tsx` | 홈 |
| `/students` | `app/students/page.tsx` | 학생용 안내 |
| `/parents` | `app/parents/page.tsx` | 학부모용 안내 |
| `/videos` | `app/videos/page.tsx` | 수업 영상 (촬영 전 → "준비 중"을 정식 디자인) |
| `/reviews` | `app/reviews/page.tsx` | 수업 후기 (인용 카드 + 카카오톡 캡쳐) |
| `/contact` | `app/contact/page.tsx` | 상담 문의 (폼 없음, `tel:`/`mailto:` 만) |

각 페이지는 `export const metadata` 로 개별 title/description을 둔다. 네비게이션은 `next/link` + `usePathname()` 기반이며, 활성 탭은 **텍스트 색 대비**로 표시한다(액센트 `#0071e3` 는 CTA 전용).

## 6. 금지 사항

1. **`tailwind.config.js` 생성 금지** — Tailwind v4다. 설정은 CSS(`@theme`)로 한다.
2. **`@tailwind base/components/utilities` 디렉티브 금지** — 진입은 `@import "tailwindcss";` 하나뿐이다.
3. **`motion` / `framer-motion` 재설치 금지** — `initial={false}` 가 인라인 스타일을 지우지 않아 reduced-motion 사용자에게 페이지가 백지가 되는 사고가 있었다. 진입 애니메이션은 CSS transition + IntersectionObserver로 한다.
4. **`app/globals.css` 의 `@source not` 규칙 삭제 금지**
   ```css
   @source not "../.claude";
   @source not "../*.md";
   ```
   Tailwind v4의 자동 소스 탐지가 `.claude/skills/**/*.md` 와 루트 마크다운을 스캔하기 때문에, 스킬 문서에 **금지 예시로 적어둔 클래스**(`bg-slate-100`, `shadow-lg` 등)가 프로덕션 CSS에 생성된다. 이 규칙은 상대 경로이므로 파일 위치를 옮기면 **경로를 재조정**해야 한다.
5. **컴포넌트·페이지에 한국어 문자열 하드코딩 금지** (`aria-label`, `alt`, `title` 포함). 전부 `content/` 로.
6. **진입 애니메이션에 인라인 `style` 로 `opacity`/`transform` 초기값 심기 금지** — SSR HTML에 남아 JS가 실패하면 콘텐츠가 통째로 사라진다. 숨김 규칙은 `html[data-js]` 안에만 둔다(JS 없으면 규칙 미적용 → 콘텐츠 노출).
7. **`app/layout.tsx` 의 `suppressHydrationWarning` 제거 금지** — `<body>` 최상단 인라인 스크립트가 `<html>` 에 `data-js` 를 붙이므로 서버/클라이언트 속성 불일치가 필연이다. 억제하지 않으면 하이드레이션 미스매치로 진입 애니메이션이 깨진다.
8. **문의 폼 추가 금지** — 서버가 없다. 상담은 `tel:` / `mailto:` (+ 카카오톡 채널 링크 자리)로만.
9. **`public/images/` 밖에 대용량 이미지 커밋 금지.** 원본 사진은 `_source-images/`(gitignore 대상)에 두고 리사이즈본만 커밋한다(9절).
10. **애플리케이션 코드에서 환경변수를 쓰지 마라** — 이 사이트는 서버·API·비밀값이 없다. `process.env` 를 읽는 기능이 필요해졌다면 설계가 잘못된 것이다. Vercel 대시보드에도 환경변수를 등록하지 않는다.
    - 예외: 루트의 **`.env.local` 은 Vercel CLI 가 자동 생성**한 것이다(`VERCEL_OIDC_TOKEN`). `vercel link` 시 만들어지고 `.gitignore` 대상이며 빌드 로그에 `- Environments: .env.local` 로 표시된다. **정상이므로 지우거나 커밋하지 마라.**

## 7. 검증 의무 — 빌드를 돌려보지 않고 "완료"라고 보고하지 마라

작업을 끝냈다고 보고하기 **전에** 아래 3개를 **실제로 실행해서 통과를 확인**한다. 정적으로 코드를 읽는 것만으로는 6·7번 같은 런타임 사고를 잡지 못한다.

| 명령 | 무엇을 잡는가 |
|---|---|
| `npm run build` | 실제 프로덕션 빌드. 타입·SSR·CSS 생성까지 전부 통과하는지 |
| `npx tsc --noEmit` | 타입 에러만 빠르게 (`as const` readonly 불일치 등) |
| `npm run lint` | ESLint 규칙 위반, `next/image`·hooks 관련 경고 |

- 통과 로그를 근거로 보고하고, 실패했으면 실패했다고 보고하라. 추측으로 "정상 동작할 것"이라고 쓰지 마라.
- UI를 바꿨으면 `npm run dev` 로 실제 화면도 확인하라. **모바일 뷰와 다크모드는 아직 실물 검증이 안 된 영역이다**(토큰은 준비돼 있음).

## 8. 알려진 함정 (실제로 당한 것들)

1. **`tailwind-merge` 가 커스텀 타이포 토큰을 삼킨다** — 이전 세션 실측 기록: `twMerge("text-body-l text-text-secondary")` → `"text-text-secondary"` (font-size 토큰 소멸). `cn()` 을 통과하는 한 문자열에 font-size 토큰과 색 토큰을 함께 넣지 마라.
2. **`@utility` 는 최상위 전용** — `@media` 안에 중첩하면 동작하지 않는다. 모드별 값은 CSS 변수 스와핑으로 처리한다.
3. **폰트는 `next/font` 가 아니라 순수 CSS 로 로드한다** — `app/layout.tsx` 가 `./pretendard.css` 를 import하고, `app/globals.css` 의 `--font-sans` 가 패밀리명 `"Pretendard Variable"` 을 직접 참조한다. `--font-pretendard` 같은 변수는 **없다**. `next/font/local` 로 되돌리지 마라(2MB 단일 파일을 무조건 전송하게 된다).
4. **`app/pretendard.css` 는 BOM 없이(UTF-8 no BOM) 저장해야 한다.** BOM 이 붙으면 PostCSS 단계에서 `Invalid dangling combinator in selector` 로 빌드가 실패한다. Windows PowerShell 의 `Set-Content -Encoding utf8` 은 BOM 을 붙이므로 이 파일 생성에 쓰지 마라.
5. **`app/pretendard.css` 를 손으로 수정하지 마라.** `pretendard` 패키지 버전을 올렸을 때만 재생성한다(파일 상단 주석에 절차가 있다). 폰트 파일 92개는 `public/fonts/pretendard/` 에 있고 `@font-face` 의 `unicode-range` 로 분할돼 있어, 브라우저는 페이지에 실제 쓰인 글자 범위만 내려받는다.

## 9. 이미지 추가·교체 절차

**원본(수 MB짜리)을 그대로 커밋하지 마라.** 현재 원본 3장은 각 10~11MB이고 리사이즈본은 도합 약 430KB다.

1. 원본을 `_source-images/` 에 둔다 (`.gitignore` 대상. 재리사이즈에 필요하므로 삭제 금지).
2. **긴 변 1600px, JPEG quality 85** 로 리사이즈해 `public/images/` 에 저장한다.
3. 리사이즈는 **직접 하지 말고 스크립트를 쓴다.** 저장소 루트에서:
   ```bash
   node scripts/resize-images.js
   ```
   `_source-images/` 를 읽어 `public/images/` 에 저장한다. 사진을 교체할 때는 스크립트 안 `JOBS` 의 `src` 만 새 파일명으로 바꾸면 되고, `out` 은 그대로 두면 컴포넌트 수정이 필요 없다.
4. 파일명은 용도가 드러나게: `kdy-hero.jpg`(홈 히어로, 1600×1067) / `kdy-about.jpg`(소개, 1067×1600) / `kdy-teaching.jpg`(수업·상담, 1067×1600).
5. 이미지는 `next/image` 로 렌더하고 `alt` 문구는 `content/` 에서 가져온다.

### 9-1. 수업 후기 캡쳐는 별도 파이프라인이다

프로필 사진과 규격·주의사항이 다르므로 스크립트도 따로 둔다.

| 항목 | 프로필 사진 | 후기 캡쳐 |
|---|---|---|
| 원본 | `_source-images/` | `_source-images/reviews/` |
| 출력 | `public/images/` | `public/images/reviews/` |
| 스크립트 | `scripts/resize-images.js` | `scripts/resize-review-images.js` |
| 규격 | 긴 변 1600px, q85 | **가로 1200px, q88** (텍스트라 사진보다 품질을 높게) |

- **개인정보가 화면에 남은 캡쳐를 커밋하지 마라.** 실명·연락처·학교명, 합격증/성적표 원본(수험번호·성명이 찍힌다), 식별 가능한 프로필 사진이 보이면 게시 대상에서 제외한다. 카카오톡 기본 아이콘, "쌤"/"학생" 표기, 발신 시각은 특정 정보가 아니므로 그대로 둔다.
- 캡쳐 비율이 4320×816(5.3:1) 부터 953×1609(0.6:1) 까지 제각각이다. **썸네일을 고정 비율로 잘라내지 마라.** `aspect-[4/3] object-cover` 를 시도했다가 가로로 긴 캡쳐의 좌우가 잘려 "전교 49등"이 "9등"으로 보이는 문제를 겪었다. 지금은 원본 비율을 그대로 두고, `width / height >= 2.5` 인 캡쳐만 `md:col-span-2` 로 두 열을 차지하게 해서 글자가 읽히는 폭을 확보한다(`components/sections/ReviewShots.tsx`). 판정은 `content/reviews.ts` 의 `width`/`height` 로 자동 계산되므로 새 캡쳐에도 그대로 적용된다.
- 원본을 잘라 저장하지도 마라. 확대 보기(`<dialog>`)가 원본 전체를 보여주는 것이 이 구조의 목적이다.
- 게시할 캡쳐 목록은 `scripts/resize-review-images.js` 의 `JOBS` 가 단일 소스다. 여기에 넣지 않은 원본은 출력되지 않는다.
- 후기 문구·캡쳐는 학생·학부모가 보낸 것이다. 새로 추가할 때는 **동의 여부를 사용자에게 먼저 확인하라.** 임의로 추가하지 마라.

## 10. 커밋 메시지 규칙

- **한국어로 간결하게. "무엇을" 바꿨는지와 "왜" 바꿨는지.**
- 한 줄 요약(50자 내외) + 필요하면 빈 줄 뒤 본문. 예:
  - `히어로 슬로건을 실제 원문으로 교체`
  - `학생용 안내 페이지 추가 — 학부모용과 톤 분리`
  - `프로필 사진 리사이즈본 교체 (원본 교체에 따른 재생성)`
- 커밋·push는 사용자가 요청했을 때만 한다.
- **`main` 에 push하면 Vercel 이 직접 감지해 자동 배포한다**(2026-08-20 부터 GitHub 연동 사용). GitHub Actions 는 배포에 관여하지 않는다.
- ⚠️ **자동 검사가 없다.** 예전 Actions 워크플로가 배포 전에 돌려 주던 `npx tsc --noEmit` / `npm run lint` 가 사라졌다(Vercel 은 `npm run build` 만 한다). **push 전에 7절 검증 3종을 직접 돌려서 통과시켜라.** 이것이 유일한 안전망이다.
- 예전 워크플로는 지우지 않고 `.github/workflows-archive/deploy.yml` 에 보관돼 있다. Actions 는 `.github/workflows/` 만 읽으므로 실행되지 않는다. 되살리는 절차는 그 파일 맨 위 주석과 [DEPLOY.md](DEPLOY.md) 4-D 에 있다. **이 보관본을 지우지 마라.**
- push 후 배포 성공을 단정하지 마라. Vercel 대시보드 Deployments 또는 `npx vercel@latest ls --scope jenu8628s-projects` 로 확인하고 보고하라.
- 이 파일 맨 위의 `BEGIN:nextjs-agent-rules` 관리 블록이 diff에 떠 있으면 지우지 말고 작업과 함께 커밋해 트리를 깨끗하게 유지한다.

## 11. 아직 확정되지 않은 것 (임의로 채우지 마라)

- **실제 연락처** — 전화번호, 이메일, 카카오톡 채널, 상담 가능 시간, 위치. 현재 코드 값은 전부 더미다.
- **수강료·수업 운영 세부 정보** — 현재 `classInfo` 값은 더미이며 실제 정보를 받지 못했다.
- **QR 코드** — 최종 URL이 확정된 뒤에 생성해야 한다.

이 항목들은 사용자 확인이 필요하다. 그럴듯한 값을 지어내지 말고 TODO로 남기고 보고하라.

## 12. 결정 기록 · 향후 계획

이미 결론이 난 사안이다. **다시 제안하지 마라.**

### 배경음악(BGM) — 넣지 않는다 (2026-08-21 결정)

검토를 마치고 **포기**한 사안이다. 근거는 세 가지다.

1. **실효가 없다.** 소리 있는 자동재생은 브라우저가 막는다. 실측으로 확인했다 — 코드로 버튼을 눌러도(`element.click()`, `dispatchEvent`) 이벤트의 `isTrusted` 가 `false` 라서 `play()` 가 `NotAllowedError` 로 실패하고, `navigator.userActivation.hasBeenActive` 도 `false` 로 남는다. 스크롤(500px 실측)도 상호작용으로 인정되지 않는다. HTML 표준이 인정하는 것은 `keydown`·`mousedown`·`mouseup`·`pointerdown`·`pointerup`·`touchend`·`click` 뿐이다.
2. **맥락이 맞지 않는다.** 이 사이트는 명함 QR 로 열린다 — 상담실·교실·대중교통에서 소리가 나면 곤란하다.
3. **직접 연주한 녹음도 안전하지 않다.** 연주 녹음에는 실연자 권리와 별개로 **원곡(작곡·편곡) 저작권**이 남는다. 자작곡이 아니라면 악보 자체가 권리 대상이다.

로열티프리 음원을 쓰면 저작권 문제는 없앨 수 있지만, 1번과 2번이 남으므로 결론은 바뀌지 않는다.

### 배경 동영상 — 추후 진행 예정 (미착수)

히어로 배경에 영상을 재생하는 기능을 나중에 넣기로 했다. **아직 착수하지 않았다.** 시작할 때 아래를 지켜라.

- `muted` · `playsinline` · `loop` 는 필수다. **음소거 자동재생만 항상 허용된다.** 소리를 켜려 하지 마라(위 BGM 결정과 같은 이유).
- `poster` 이미지를 반드시 둔다. 영상이 로드되기 전/실패했을 때 히어로가 비면 안 된다.
- `prefers-reduced-motion: reduce` 일 때는 영상을 재생하지 말고 `poster` 만 보여준다.
- 용량은 이 저장소 기준을 따른다. 현재 이미지 전체가 800KB 수준이다. **영상은 `public/` 에 수 MB 를 커밋하기 전에 사용자와 상의하라.** 원본은 `_source-images/`(gitignore) 에 두고 압축본만 커밋한다.
- 영상 위에 텍스트를 얹어야 하면 대비를 확보해야 한다. 이때도 보라/네온 그라데이션 오버레이는 금지다(3-1절).

