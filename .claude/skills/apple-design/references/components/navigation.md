# 네비게이션 (Navigation)

## 규격

| 항목 | 값 |
|---|---|
| 높이 | `48px` (`h-12`) |
| 위치 | `fixed inset-x-0 top-0 z-50` |
| 배경 | 글래스 — `rgba(255,255,255,0.72)` / 다크 `rgba(0,0,0,0.72)` |
| 블러 | `saturate(180%) blur(20px)` |
| 하단 보더 | `0.5px solid var(--color-border)` |
| 링크 폰트 | `14px` / weight `400` |
| 로고 | `17px` / weight `600` |

글래스 상세 스펙은 [../glassmorphism.md](../glassmorphism.md).
네비게이션 높이만큼 `<body>` 또는 첫 섹션에 `pt-12`를 줘야 콘텐츠가 가려지지 않는다.

## 데스크톱 + 모바일 통합 구현

```tsx
// components/sections/site-header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/#about", label: "소개" },
  { href: "/#lessons", label: "수업" },
  { href: "/#career", label: "이력" },
  { href: "/#contact", label: "상담" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  // 오버레이가 열린 동안 배경 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ESC로 닫기
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className="
        fixed inset-x-0 top-0 z-50
        border-b-[0.5px] border-border
        bg-[rgba(255,255,255,0.72)] dark:bg-[rgba(0,0,0,0.72)]
        backdrop-blur-[20px] backdrop-saturate-[180%]
      "
    >
      <nav
        aria-label="주 메뉴"
        className="mx-auto flex h-12 max-w-[1024px] items-center justify-between px-6 md:px-10"
      >
        <Link
          href="/"
          className="
            text-[17px] font-semibold tracking-[-0.01em] text-text
            transition-colors duration-200 ease-apple hover:text-text-secondary
            focus-visible:outline-none focus-visible:rounded-[12px]
            focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg
          "
          onClick={() => setOpen(false)}
        >
          김도윤 수학
        </Link>

        {/* 데스크톱 링크 */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="
                  text-[14px] font-normal text-text break-keep
                  transition-colors duration-200 ease-apple hover:text-text-secondary
                  focus-visible:outline-none focus-visible:rounded-[12px]
                  focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                "
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* 모바일 햄버거 — 44px 터치 타깃 */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          className="
            -mr-2 flex size-11 items-center justify-center rounded-[12px] text-text md:hidden
            transition-colors duration-200 ease-apple
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
            focus-visible:ring-offset-2 focus-visible:ring-offset-bg
          "
        >
          {open ? (
            <X className="size-5" strokeWidth={1.5} aria-hidden />
          ) : (
            <Menu className="size-5" strokeWidth={1.5} aria-hidden />
          )}
        </button>
      </nav>

      {/* 모바일 풀스크린 오버레이 */}
      <div
        id="mobile-menu"
        hidden={!open}
        className={cn(
          "fixed inset-x-0 bottom-0 top-12 z-40 md:hidden",
          "bg-[rgba(255,255,255,0.72)] dark:bg-[rgba(0,0,0,0.72)]",
          "backdrop-blur-[20px] backdrop-saturate-[180%]",
        )}
      >
        <ul className="flex flex-col px-6 pt-4">
          {NAV_ITEMS.map((item) => (
            <li key={item.href} className="border-b-[0.5px] border-border">
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="
                  flex h-14 items-center text-[21px] font-normal tracking-[-0.01em] text-text break-keep
                  transition-colors duration-200 ease-apple hover:text-text-secondary
                  focus-visible:outline-none focus-visible:rounded-[12px]
                  focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg
                "
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
```

### 레이아웃 연결

```tsx
// app/layout.tsx
import { SiteHeader } from "@/components/sections/site-header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="font-sans antialiased">
        <SiteHeader />
        <main className="pt-12">{children}</main>
      </body>
    </html>
  );
}
```

`pt-12`(48px)로 고정 헤더 높이를 보상한다.

## 앵커 스크롤 오프셋

`#about` 같은 앵커로 이동할 때 헤더에 제목이 가려지지 않게 한다.

```css
/* app/globals.css */
html {
  scroll-behavior: smooth;
}

[id] {
  scroll-margin-top: 72px; /* 헤더 48px + 여유 24px */
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

## 모바일 오버레이 규칙

- **풀스크린**: 헤더 아래 전체를 덮는다 (`top-12 bottom-0 inset-x-0`).
- 링크 항목 높이 `56px`(`h-14`) — 터치 타깃 여유 확보.
- 항목 사이 `0.5px` hairline 구분선.
- 오버레이 텍스트는 Body-L(`21px`).
- 열려 있는 동안 `body` 스크롤 잠금.
- ESC 키로 닫힌다.
- 슬라이드/스케일 애니메이션 없이 즉시 표시한다. (fade가 필요하면 `opacity`만 `200ms`)
- 오버레이 안에 CTA 버튼을 넣지 않는다. 링크만.

## 접근성

- `<nav aria-label="주 메뉴">`
- 햄버거 버튼: `aria-expanded`, `aria-controls`, `aria-label` 3종 필수.
- 닫힌 오버레이는 `hidden` 속성으로 접근성 트리에서 제거한다 (`opacity-0`만으로는 스크린리더가 읽는다).
- 모든 링크에 `focus-visible` 링.
- 햄버거 터치 타깃 `size-11`(44px). 아이콘만 `size-5`(20px).

## 🚫 금지

- 헤더 높이를 48px 외의 값으로 변경
- 헤더에 그림자
- 스크롤 시 헤더 높이가 줄어드는 효과
- 헤더에 CTA 버튼 배치 (Apple은 안 한다 — 링크만)
- 드롭다운 메가메뉴 (이 사이트 규모에 불필요)
- 햄버거 → X 아이콘 회전 애니메이션 (아이콘 교체만)
- 모바일 오버레이를 사이드 드로어(슬라이드인)로 구현
- 현재 섹션 링크에 액센트 컬러 표시 (필요하면 `text-text-secondary`로 비활성 항목을 낮춘다)
