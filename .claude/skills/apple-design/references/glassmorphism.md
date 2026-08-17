# 글래스모피즘 (Glassmorphism)

## 적용 범위 — 고정 네비게이션 바 전용

이 사이트에서 반투명 블러를 쓸 수 있는 곳은 **딱 두 곳**이다.

1. 상단 고정 네비게이션 바 (`position: sticky` / `fixed`)
2. 모바일 풀스크린 메뉴 오버레이

**금지 대상:** 카드, 섹션 배경, 히어로 위 텍스트 박스, 모달 내부, 버튼, 배지, 푸터.
카드에 글래스를 쓰면 곧바로 "AI가 만든 랜딩페이지" 인상이 된다.

## 왜 네비게이션에만 쓰는가

블러의 목적은 장식이 아니라 **"내 아래로 콘텐츠가 지나가고 있다"는 신호**다.
스크롤로 콘텐츠가 통과하지 않는 요소에는 블러를 걸 이유가 없다.

## 스펙

| 속성 | Light | Dark |
|---|---|---|
| `backdrop-filter` | `saturate(180%) blur(20px)` | 동일 |
| `background` | `rgba(255, 255, 255, 0.72)` | `rgba(0, 0, 0, 0.72)` |
| 하단 보더 | `0.5px solid #d2d2d7` | `0.5px solid #424245` |
| 높이 | `48px` | 동일 |

- `saturate(180%)`가 핵심이다. 이게 없으면 뒤 콘텐츠가 탁하게 회색으로 죽는다.
- 블러는 `20px` 고정. 더 키우면 아래 콘텐츠 형태가 사라져 신호 역할을 못 한다.
- 투명도는 `0.72` 고정. 더 투명하면 텍스트 가독성이 무너진다.
- 보더는 `1px`가 아니라 **`0.5px`** — hairline이어야 한다.

## CSS

`@theme`은 커스텀 프로퍼티만 다루므로, 글래스는 `globals.css`의 유틸리티 클래스로 정의한다.

`@utility`는 **최상위(top-level)에만 선언할 수 있다.** `@media` 안에 중첩하면 동작하지 않으므로,
모드별 배경은 CSS 변수(`--app-glass-bg`)로 갈아끼운다.

```css
/* app/globals.css */
:root {
  --app-glass-bg: rgba(255, 255, 255, 0.72);
}

@media (prefers-color-scheme: dark) {
  :root:not(.light) {
    --app-glass-bg: rgba(0, 0, 0, 0.72);
  }
}

.dark {
  --app-glass-bg: rgba(0, 0, 0, 0.72);
}

@utility glass-nav {
  background-color: var(--app-glass-bg);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 0.5px solid var(--color-border);
}
```

> `@utility`는 Tailwind v4 문법이다. v3의 `@layer utilities { .glass-nav { @apply … } }` 를 쓰지 않는다.
> 변수 선언은 [frameworks/tailwind.md](frameworks/tailwind.md)의 `globals.css` 전체 코드에 이미 포함되어 있다.

## Tailwind 유틸리티만으로 쓰는 경우

별도 클래스를 만들지 않고 인라인으로 처리해도 된다. 값은 위와 동일해야 한다.

```tsx
<header
  className="
    fixed inset-x-0 top-0 z-50 h-12
    bg-[rgba(255,255,255,0.72)] dark:bg-[rgba(0,0,0,0.72)]
    backdrop-blur-[20px] backdrop-saturate-[180%]
    border-b-[0.5px] border-border
  "
>
```

`h-12` = 48px. → 실제 네비게이션 전체 구현은 [components/navigation.md](components/navigation.md).

## 폴백

`backdrop-filter` 미지원 브라우저(구형 Firefox 등)에서는 반투명 배경만 남아 뒤 텍스트가 비쳐 읽기 어렵다.

```css
@supports not (backdrop-filter: blur(20px)) {
  .glass-nav {
    background-color: var(--color-bg); /* 불투명으로 폴백 */
  }
}
```

## 성능 주의

- `backdrop-filter`는 GPU 합성 비용이 크다. **페이지당 1개 요소**를 넘기지 않는다.
- 블러가 걸린 요소에 동시에 `transform` 애니메이션을 걸지 않는다 (모바일 사파리에서 깜빡임).
- 네비게이션 배경을 스크롤 위치에 따라 페이드시키고 싶다면 `backdrop-filter`를 토글하지 말고
  **`background-color`의 alpha만** 전환한다 (`0` → `0.72`).

```tsx
"use client";
// 스크롤 시 글래스 등장 — blur는 항상 켜두고 배경 alpha만 바꾼다
<header
  className={cn(
    "fixed inset-x-0 top-0 z-50 h-12 backdrop-blur-[20px] backdrop-saturate-[180%]",
    "transition-colors duration-300",
    scrolled
      ? "bg-[rgba(255,255,255,0.72)] border-b-[0.5px] border-border dark:bg-[rgba(0,0,0,0.72)]"
      : "bg-transparent border-b-[0.5px] border-transparent",
  )}
/>
```

## 체크리스트

- [ ] 블러 요소가 페이지에 1개(+모바일 오버레이)뿐인가?
- [ ] `saturate(180%)`가 들어갔는가?
- [ ] `-webkit-backdrop-filter` 프리픽스를 넣었는가?
- [ ] 하단 보더가 `0.5px`인가?
- [ ] 다크모드 배경이 `rgba(0,0,0,0.72)`인가?
- [ ] 카드나 섹션에 블러를 쓰지 않았는가?
