# React / Next.js 규약

Next.js 16 App Router · TypeScript · `src/` 없음 · import alias `@/*`.

## `cn()` 유틸 — 필수

Tailwind 클래스 충돌을 뒤에 온 값이 이기도록 병합한다. 조건부 클래스가 있는 모든 곳에서 쓴다.

```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

```tsx
import { cn } from "@/lib/utils";

<div className={cn("rounded-card bg-bg-alt p-8", isActive && "bg-bg", className)} />
```

- 문자열 결합(`` `${a} ${b}` ``)이나 배열 `.join(" ")`을 쓰지 않는다. 충돌 해결이 안 된다.
- 컴포넌트는 항상 `className?: string`을 받아 마지막에 `cn()`으로 병합한다 — 호출부에서 여백을 조정할 수 있어야 한다.

### tailwind-merge와 커스텀 토큰

`rounded-pill`, `text-h2`, `ease-apple` 같은 커스텀 토큰도 tailwind-merge가 그룹을 인식한다
(`rounded-*`, `text-*`, `ease-*` 접두사 기반). 별도 설정 없이 동작한다.
단 `text-h2`(font-size)와 `text-text-secondary`(color)는 tailwind-merge가 같은 `text-` 그룹으로 볼 수 있으므로,
**둘을 동시에 쓸 때는 `cn()`의 같은 인자 안에 나란히** 두고 조건부로 덮어쓰지 않는다.

## 서버 컴포넌트가 기본

App Router의 모든 컴포넌트는 기본적으로 서버 컴포넌트다. **`"use client"`를 습관적으로 붙이지 않는다.**

### `"use client"`가 필요한 경우 (이것뿐)

| 상황 | 예 |
|---|---|
| `motion` 사용 | `<motion.div>`, `whileInView`, `useReducedMotion` |
| `useState` / `useEffect` / `useRef` | 모바일 메뉴 토글, 스크롤 감지 |
| 이벤트 핸들러 | `onClick`, `onSubmit` |
| 브라우저 API | `window`, `document`, `localStorage` |

### 경계는 최대한 잎사귀(leaf)에 둔다

```tsx
// ❌ 페이지 전체를 클라이언트로 만든다
"use client";
export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <Lessons />
    </>
  );
}
```

```tsx
// ✅ 애니메이션이 필요한 래퍼만 클라이언트
// app/page.tsx — 서버 컴포넌트
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";

export default function Page() {
  return (
    <>
      <Hero />
      <About />
    </>
  );
}
```

```tsx
// components/ui/reveal.tsx — 클라이언트 경계는 여기 하나
"use client";

import { motion, useReducedMotion } from "motion/react";

export function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
}
```

서버 컴포넌트에서 `<Reveal>{children}</Reveal>` 형태로 감싸면,
children은 **서버에서 렌더된 채로** 클라이언트 컴포넌트에 슬롯으로 전달된다 (번들에 안 들어간다).

## 파일 배치 규칙

실제 구조는 아래와 같다. 파일명은 **PascalCase** 를 쓴다.

```
app/
  layout.tsx          루트 레이아웃 (pretendard.css/globals.css import, Nav, <main className="pt-12">, Footer)
  page.tsx            홈
  students/page.tsx   학생용 안내
  parents/page.tsx    학부모용 안내
  videos/page.tsx     수업 영상
  contact/page.tsx    상담 문의
  globals.css         @import "tailwindcss" + @theme 토큰
  pretendard.css      @font-face 92개 (자동 생성물. 손으로 고치지 말 것)
components/
  Nav.tsx             상단 글래스 네비 ("use client" — usePathname)
  ui/                 도메인 지식 없는 재사용 프리미티브
    Button.tsx  Card.tsx  Section.tsx  SectionHeading.tsx
    Reveal.tsx        진입 애니메이션 래퍼 ("use client")
    YouTubeEmbed.tsx
  sections/           페이지를 구성하는 섹션 블록 (콘텐츠는 content/ 에서 주입받는다)
    Hero.tsx  PageIntro.tsx  Statement.tsx  CardsSection.tsx
    CheckListSection.tsx  ProseSection.tsx  CredentialsSection.tsx
    AudienceLinks.tsx  CallToAction.tsx  ContactSection.tsx
    VideoSection.tsx  Footer.tsx
lib/
  utils.ts            cn()
content/              사이트의 모든 한국어 문자열 (여기 밖에 하드코딩 금지)
  index.ts            배럴. 컴포넌트는 "@/content" 에서만 import
  site.ts  instructor.ts  home.ts  students.ts  parents.ts  videos.ts  contact.ts
public/
  fonts/pretendard/   subset woff2 92개
  images/             kdy-hero.jpg  kdy-about.jpg  kdy-teaching.jpg
```

- `sections/` 는 **재사용 가능한 섹션 형태**로 만든다(`CardsSection`, `ProseSection` 처럼). 특정 페이지 전용 이름을 붙이면 다음 페이지에서 복제된다.
- 섹션은 콘텐츠를 **props 로 받는다.** 섹션 안에서 `content/` 를 직접 import하면 페이지마다 다른 데이터를 넣을 수 없다.

### `ui/` vs `sections/` 판단 기준

| 질문 | ui/ | sections/ |
|---|---|---|
| 다른 사이트에 그대로 복사할 수 있나? | ✅ | ❌ |
| 한국어 카피가 하드코딩되어 있나? | ❌ | ✅ |
| `<section>` 태그와 세로 패딩을 소유하나? | ❌ | ✅ |

`ui/` 컴포넌트는 **바깥 여백(margin)을 스스로 갖지 않는다.** 배치는 부모의 책임이다.

## 컴포넌트 작성 규약

### Props 타입

```tsx
// 네이티브 요소를 감싸면 해당 HTML 속성을 전부 상속한다
export function Button({
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" }) {
  return <button {...props} className={cn(base, variants[variant], className)} />;
}
```

- `React.FC`를 쓰지 않는다.
- `any` 금지. props에 인라인 타입 또는 `type` 별칭을 쓴다.
- `interface`보다 `type`을 기본으로 한다(일관성).

### 데이터는 컴포넌트 밖 상수로

```ts
// content/profile.ts
export const STATS = [
  { value: "10년", label: "강의 경력" },
  { value: "1,200명", label: "누적 지도 학생" },
] as const;
```

JSX 안에서 배열 리터럴을 직접 `.map()` 하지 않는다 (재렌더 시 참조가 매번 바뀐다).

### 이미지

```tsx
import Image from "next/image";

<Image
  src="/images/portrait.jpg"
  alt="김도윤 강사 프로필 사진"
  width={800}
  height={1000}
  sizes="(min-width: 768px) 50vw, 100vw"
  priority   // 히어로 이미지에만
  className="rounded-container object-cover"
/>
```

- `<img>` 대신 `next/image` 사용.
- `alt`는 한국어로 의미 있게. 장식용이면 `alt=""`.
- `priority`는 첫 화면 이미지 1장에만.

### 아이콘

```tsx
import { ChevronRight } from "lucide-react";

<ChevronRight className="size-4 shrink-0 text-text-secondary" strokeWidth={1.5} aria-hidden />
```

- 개별 named import만 (`import * as Icons` 금지 — 트리셰이킹 실패).
- 크기: `size-4`(16px) 인라인, `size-5`(20px) 버튼 내, `size-6`(24px) 카드.
- `strokeWidth`: `1.5` 기본, chevron만 `2`.
- 의미 없는 아이콘엔 `aria-hidden`.
- **이모지를 아이콘 대신 쓰지 않는다.**

## 시맨틱 마크업

```tsx
<main className="pt-12">
  <section id="about" aria-labelledby="about-title" className="bg-bg py-20 md:py-30">
    <Container>
      <h2 id="about-title" className="text-h2 md:text-h2-lg break-keep">소개</h2>
    </Container>
  </section>
</main>
```

- 페이지당 `<h1>` 1개 (히어로).
- 제목 레벨을 크기 때문에 건너뛰지 않는다 (`h2` 다음은 `h3`).
- `<div>` 남발 대신 `<section>`, `<article>`, `<nav>`, `<ul>` 사용.
- `<html lang="ko">` 필수.

## 메타데이터

```tsx
// app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "김도윤 수학",
  description: "개념부터 다시 세우는 중고등 수학 수업.",
};
```

정적 사이트이므로 서버 액션·API 라우트·`fetch` 데이터 로딩을 만들지 않는다.

## 🚫 금지

- 루트나 페이지에 `"use client"` 부착
- `cn()` 없이 조건부 클래스 문자열 결합
- 컴포넌트 안에 raw hex/px 하드코딩 (토큰 사용)
- `styled-components` / CSS Modules / 인라인 `style` 추가
- 새 UI 라이브러리 설치(shadcn, Radix, MUI 등) — 이 시스템은 자체 프리미티브로 충분하다
- `React.FC`, `any`
- `ui/` 컴포넌트가 외부 margin을 갖는 것
- 이모지 아이콘
