# Tailwind CSS v4 설정

## 전제

- 이 프로젝트는 **Tailwind CSS v4** + `@tailwindcss/postcss`를 쓴다.
- **`tailwind.config.js`는 존재하지 않으며, 만들지 않는다.**
- **`@tailwind base/components/utilities` 디렉티브를 쓰지 않는다.** 진입은 `@import "tailwindcss";` 하나.
- 모든 디자인 토큰은 `app/globals.css`의 **`@theme` 블록**에 CSS 커스텀 프로퍼티로 선언한다.

## 네이밍 규칙 (Tailwind v4 테마 네임스페이스)

| 네임스페이스 | 생성되는 유틸리티 | 예 |
|---|---|---|
| `--color-*` | `bg-*`, `text-*`, `border-*`, `ring-*`, `fill-*` | `--color-accent` → `bg-accent` |
| `--radius-*` | `rounded-*` | `--radius-card` → `rounded-card` |
| `--font-*` | `font-*` | `--font-sans` → `font-sans` |
| `--text-*` | `text-*` (font-size) | `--text-h2` → `text-h2` |
| `--ease-*` | `ease-*` | `--ease-apple` → `ease-apple` |

`--text-*`는 `--text-{name}--line-height`, `--text-{name}--letter-spacing`, `--text-{name}--font-weight`
하위 프로퍼티로 동반 값을 지정할 수 있다.

## `app/globals.css` 전체 코드

아래를 그대로 붙여넣는다. Next.js 기본 생성물(`--font-geist-*`, `Arial` 폰트 스택)은 전부 교체한다.

```css
@import "tailwindcss";

/* ------------------------------------------------------------------
   1. 다크모드 variant
   prefers-color-scheme(시스템) + .dark 클래스(수동) 병행.
   .light 클래스를 붙이면 시스템이 다크여도 라이트로 고정된다.
------------------------------------------------------------------- */
@custom-variant dark {
  @media (prefers-color-scheme: dark) {
    &:where(:not(.light, .light *)) {
      @slot;
    }
  }
  &:where(.dark, .dark *) {
    @slot;
  }
}

/* ------------------------------------------------------------------
   2. 시맨틱 컬러 원본값
   @theme은 정적 값만 담으므로, 모드에 따라 바뀌는 색은
   :root 변수로 두고 @theme inline에서 참조한다.
------------------------------------------------------------------- */
:root {
  --app-text: #1d1d1f;
  --app-text-secondary: #6e6e73;
  --app-bg: #ffffff;
  --app-bg-alt: #f5f5f7;
  --app-border: #d2d2d7;
  --app-glass-bg: rgba(255, 255, 255, 0.72);
}

@media (prefers-color-scheme: dark) {
  :root:not(.light) {
    --app-text: #f5f5f7;
    --app-text-secondary: #86868b;
    --app-bg: #000000;
    --app-bg-alt: #1d1d1f;
    --app-border: #424245;
    --app-glass-bg: rgba(0, 0, 0, 0.72);
  }
}

.dark {
  --app-text: #f5f5f7;
  --app-text-secondary: #86868b;
  --app-bg: #000000;
  --app-bg-alt: #1d1d1f;
  --app-border: #424245;
  --app-glass-bg: rgba(0, 0, 0, 0.72);
}

/* ------------------------------------------------------------------
   3. 테마 토큰
   @theme inline : var() 참조를 그대로 유지해 모드 전환이 반영되게 한다.
------------------------------------------------------------------- */
@theme inline {
  /* --- Colors (모드 의존) --- */
  --color-text: var(--app-text);
  --color-text-secondary: var(--app-text-secondary);
  --color-bg: var(--app-bg);
  --color-bg-alt: var(--app-bg-alt);
  --color-border: var(--app-border);

  /* --- Colors (모드 무관) --- */
  --color-accent: #0071e3;
  --color-accent-hover: #0077ed;

  /* --- Font ---
     'Pretendard Variable' 은 app/pretendard.css 의 @font-face 92개로 정의된다.
     next/font 를 쓰지 않으므로 --font-pretendard 같은 변수는 없다. → typography.md */
  --font-sans: "Pretendard Variable", -apple-system, BlinkMacSystemFont,
    system-ui, "Segoe UI", Roboto, sans-serif;

  /* --- Type scale (모바일 기준값. 데스크톱은 md: 프리픽스로 확대) --- */
  --text-display: 4rem; /* 64px */
  --text-display--line-height: 1.05;
  --text-display--letter-spacing: -0.03em;
  --text-display--font-weight: 700;

  --text-h1: 2.5rem; /* 40px */
  --text-h1--line-height: 1.05;
  --text-h1--letter-spacing: -0.03em;
  --text-h1--font-weight: 600;

  --text-h2: 2rem; /* 32px */
  --text-h2--line-height: 1.15;
  --text-h2--letter-spacing: -0.02em;
  --text-h2--font-weight: 600;

  --text-h3: 1.5rem; /* 24px */
  --text-h3--line-height: 1.15;
  --text-h3--letter-spacing: -0.02em;
  --text-h3--font-weight: 600;

  --text-body-l: 1.1875rem; /* 19px */
  --text-body-l--line-height: 1.5;
  --text-body-l--letter-spacing: -0.01em;
  --text-body-l--font-weight: 400;

  --text-body: 1.0625rem; /* 17px */
  --text-body--line-height: 1.5;
  --text-body--letter-spacing: -0.01em;
  --text-body--font-weight: 400;

  --text-caption: 0.875rem; /* 14px */
  --text-caption--line-height: 1.5;
  --text-caption--letter-spacing: 0em;
  --text-caption--font-weight: 400;

  /* --- 데스크톱 확대 스케일 --- */
  --text-display-lg: 5rem; /* 80px */
  --text-display-lg--line-height: 1.05;
  --text-display-lg--letter-spacing: -0.03em;
  --text-display-lg--font-weight: 700;

  --text-h1-lg: 3.5rem; /* 56px */
  --text-h1-lg--line-height: 1.05;
  --text-h1-lg--letter-spacing: -0.03em;
  --text-h1-lg--font-weight: 600;

  --text-h2-lg: 2.5rem; /* 40px */
  --text-h2-lg--line-height: 1.15;
  --text-h2-lg--letter-spacing: -0.02em;
  --text-h2-lg--font-weight: 600;

  --text-h3-lg: 1.75rem; /* 28px */
  --text-h3-lg--line-height: 1.15;
  --text-h3-lg--letter-spacing: -0.02em;
  --text-h3-lg--font-weight: 600;

  --text-body-l-lg: 1.3125rem; /* 21px */
  --text-body-l-lg--line-height: 1.5;
  --text-body-l-lg--letter-spacing: -0.01em;
  --text-body-l-lg--font-weight: 400;

  /* --- Radius (이 4개 외 사용 금지) --- */
  --radius-sm-el: 12px; /* 작은 요소 */
  --radius-card: 18px; /* 카드 */
  --radius-container: 24px; /* 큰 컨테이너 / 이미지 */
  --radius-pill: 980px; /* 버튼 */

  /* --- Easing --- */
  --ease-apple: cubic-bezier(0.16, 1, 0.3, 1);

  /* --- Shadow (유일하게 허용된 값) --- */
  --shadow-subtle: 0 4px 24px rgba(0, 0, 0, 0.06);

  /* --- Container --- */
  --container-content: 1024px;
  --container-wide: 1440px;
}

/* ------------------------------------------------------------------
   4. Base
------------------------------------------------------------------- */
body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  font-size: var(--text-body);
  line-height: 1.5;
  letter-spacing: -0.01em;
  word-break: keep-all; /* 한국어 어절 단위 줄바꿈 — 필수 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  scroll-behavior: smooth;
}

/* 고정 헤더(48px) 아래로 앵커가 숨지 않게 */
[id] {
  scroll-margin-top: 72px;
}

/* ------------------------------------------------------------------
   5. Utilities
------------------------------------------------------------------- */
@utility glass-nav {
  background-color: var(--app-glass-bg);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 0.5px solid var(--color-border);
}

@supports not ((backdrop-filter: blur(20px)) or (-webkit-backdrop-filter: blur(20px))) {
  .glass-nav {
    background-color: var(--color-bg);
  }
}

/* ------------------------------------------------------------------
   6. 접근성 — prefers-reduced-motion
------------------------------------------------------------------- */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 사용 예

```tsx
{/* 반응형 타이포 — 모바일 토큰 + md: 데스크톱 토큰 */}
<h1 className="text-h1 md:text-h1-lg break-keep">김도윤 수학</h1>
<p className="text-body text-text-secondary max-w-[65ch] break-keep">…</p>

{/* 색 */}
<section className="bg-bg-alt text-text">
<button className="bg-accent text-white hover:bg-accent-hover">

{/* radius */}
<button className="rounded-pill">
<article className="rounded-card">
<figure className="rounded-container overflow-hidden">

{/* easing */}
<a className="transition-colors duration-200 ease-apple">

{/* 컨테이너 */}
<div className="mx-auto w-full max-w-content px-6 md:px-10">
<div className="mx-auto w-full max-w-wide px-6 md:px-10">

{/* 글래스 (네비게이션 전용) */}
<header className="glass-nav fixed inset-x-0 top-0 z-50 h-12">
```

## `@theme` vs `@theme inline`

| | 동작 |
|---|---|
| `@theme { --color-x: #fff; }` | 값을 그대로 CSS 변수로 내보낸다. 정적 값에 사용. |
| `@theme inline { --color-x: var(--app-x); }` | 유틸리티가 `var(--app-x)`를 **직접 참조**한다. 모드에 따라 값이 바뀌는 색은 반드시 이쪽. |

`@theme`(non-inline)에 `var()`를 넣으면 Tailwind가 값을 스냅샷해서 다크모드 전환이 반영되지 않는다.

## 다크모드 전략 정리

1. **기본은 CSS 변수 스와핑.** `bg-bg`, `text-text` 같은 시맨틱 유틸을 쓰면
   `dark:` 프리픽스 없이도 라이트/다크가 자동으로 전환된다. **이게 기본 경로다.**
2. `dark:` 프리픽스는 **변수로 표현할 수 없는 값**(예: `rgba` 리터럴, hover 배경 미세값)에만 쓴다.
3. `@custom-variant dark`는 `prefers-color-scheme`과 `.dark` 클래스 **양쪽**을 커버하도록 위 코드처럼 정의한다.
4. 수동 토글이 필요하면 `<html>`에 `.dark` / `.light`를 붙인다. 정적 사이트이므로
   토글 UI가 필요 없다면 클래스 없이 시스템 설정만 따르면 된다.

## 🚫 금지

- `tailwind.config.js` / `tailwind.config.ts` 생성
- `@tailwind base;` `@tailwind components;` `@tailwind utilities;`
- `@layer utilities { … }` 로 커스텀 유틸 정의 (v4에서는 `@utility`)
- `theme()` 함수 사용 (v4에서는 `var(--…)`)
- 컴포넌트에 raw hex 하드코딩 (`bg-[#0071e3]` → `bg-accent`)
- Tailwind 기본 팔레트 사용 (`bg-slate-100`, `text-gray-500`, `bg-purple-*` 등 전부)
- `rounded-lg`, `rounded-xl`, `rounded-2xl` 등 기본 radius 유틸
- `shadow-md` / `shadow-lg` 등 기본 그림자 유틸 (`shadow-subtle`만)
- `ease-in-out`, `ease-linear` 등 기본 이징 (`ease-apple`만)
