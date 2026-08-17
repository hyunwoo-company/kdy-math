# 모션 (Animations)

## 🔴 이 프로젝트의 표준: CSS transition + IntersectionObserver

**JS 애니메이션 라이브러리를 쓰지 않는다.** `motion` / `framer-motion` 은 제거됐고 다시 설치하지 않는다.

| | |
|---|---|
| 애니메이션 정의 | `app/globals.css` 의 `.reveal` / `.is-visible` 규칙 (CSS transition) |
| 발화 | `components/ui/Reveal.tsx` — `IntersectionObserver`로 클래스만 토글 |
| 폴백 | 숨김 규칙이 `html[data-js]` 안에만 있어, JS가 없으면 콘텐츠가 그냥 보인다 |

### 왜 이 구조인가 (실제로 겪은 실패에서 나온 결론)

정적 사이트에 JS 애니메이션 라이브러리를 쓰면 아래가 전부 실제 버그로 나타났다.

1. 라이브러리가 SSR HTML에 `style="opacity:0;transform:translateY(24px)"` 를 심는다
   → JS가 죽으면 **본문 전체가 영구히 사라진다.**
2. 첫 화면 요소를 스크롤 트리거로 걸면 초기 교차 판정이 누락돼 **히어로가 백지**가 된다.
3. `initial={false}` 같은 "안 그리기" 옵션은 **이미 심어진 인라인 스타일을 지워주지 않는다.**
4. 클라이언트에서 `<html>` 속성을 건드리면 **하이드레이션 미스매치**가 난다.
5. rAF 기반 재생은 백그라운드 탭에서 정지해 **자동화·백그라운드 환경에서 화면이 비어 보인다.**

CSS는 이 다섯 가지가 원천적으로 없다. 번들도 줄어든다.

## 이징 — 이 하나만 쓴다

```
cubic-bezier(0.16, 1, 0.3, 1)
```

빠르게 출발해 아주 길게 감속하는 곡선이다. Apple 특유의 "미끄러지듯 멈추는" 느낌이 여기서 나온다.
`ease-in-out`, `linear`, `spring`, `bounce`, `backOut` 등은 쓰지 않는다.

`@theme`의 `--ease-apple` 토큰으로 쓴다 (Tailwind 유틸은 `ease-apple`). → [frameworks/tailwind.md](frameworks/tailwind.md)

## 진입(Entrance) — 유일하게 허용되는 모션

| 속성 | 값 |
|---|---|
| opacity | `0 → 1` |
| translateY | `24px → 0` |
| duration | `0.6s` |
| stagger | `0.08s` (`--reveal-delay`) |
| easing | `var(--ease-apple)` |

**변화시키는 속성은 `opacity`와 `transform` 둘뿐이다.** `scale`, `rotate`, `filter`는 쓰지 않는다.

## 🔴 절대 규칙 3가지

### 1. 인라인 style로 opacity/transform 초기값을 심지 않는다

SSR HTML에 숨김 스타일이 남으면 JS 실패 시 콘텐츠가 사라진다.
초기 상태는 **반드시 CSS 클래스**로 표현한다.

```tsx
<div style={{ opacity: 0, transform: "translateY(24px)" }}>   {/* ❌ */}
<div className="reveal">                                       {/* ✅ */}
```

예외: **stagger 지연값만** CSS 변수로 인라인 전달한다. 서버·클라이언트가 동일하게 렌더하므로
미스매치가 없고, 값이 사라져도 `var(--reveal-delay, 0s)` 기본값으로 안전하게 동작한다.

### 2. 폴백은 "규칙을 적용하지 않으면 보이는" 방향으로 설계한다

기본이 **보임**이고, JS가 확인됐을 때만 숨긴다. 반대로 만들면(기본 숨김 + JS로 보이기)
JS가 죽는 순간 페이지가 백지가 된다.

```css
html[data-js] .reveal { opacity: 0; }   /* ✅ JS 있을 때만 숨김 */
.reveal { opacity: 0; }                 /* ❌ JS 죽으면 영영 안 보임 */
```

### 3. above the fold 요소에는 스크롤 트리거를 쓰지 않는다

| 요소 위치 | 방식 |
|---|---|
| **첫 화면(히어로 등)** | `<Reveal immediate>` — 마운트 직후 즉시 재생 |
| 스크롤해야 닿는 영역 | `<Reveal>` — IntersectionObserver |

첫 화면은 "스크롤을 유도"할 대상이 아니라 "이미 보여야 할" 대상이다.

## 구현 — `app/globals.css`

```css
html[data-js] .reveal {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.6s var(--ease-apple),
    transform 0.6s var(--ease-apple);
  transition-delay: var(--reveal-delay, 0s);
}

html[data-js] .reveal.is-visible {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  html[data-js] .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

`.reveal` / `.is-visible` 은 Tailwind 유틸이 아니라 직접 작성한 CSS 규칙이므로
소스 스캔(purge) 대상이 아니다. 빌드 산출물에서 존재를 확인하는 습관을 들인다.

## 구현 — `app/layout.tsx`

```tsx
const jsFlagScript =
  "var d=document.documentElement;d.setAttribute('data-js','');" +
  "setTimeout(function(){if(!d.hasAttribute('data-hydrated'))d.removeAttribute('data-js')},5000)";

<html lang="ko" className={pretendard.variable} suppressHydrationWarning>
  <body>
    <script dangerouslySetInnerHTML={{ __html: jsFlagScript }} />
    {/* … */}
  </body>
</html>
```

- `<body>` 최상단에서 **동기 실행** → 콘텐츠가 그려지기 전에 적용되어 깜빡임이 없다.
- **`suppressHydrationWarning` 필수.** 스크립트가 `<html>`에 속성을 붙이는 순간 서버 HTML과
  클라이언트 DOM이 달라진다. React는 자신이 렌더하지 않은 속성이라도 미스매치로 보고한다
  (`A tree hydrated but some attributes ... didn't match`). 이걸 억제하지 않으면 실제로 깨진다.
- 5초 워치독: 번들 로드/하이드레이션이 실패하면 `data-js`를 떼어내 콘텐츠를 되살린다.
  `data-hydrated`는 `Reveal`의 `useEffect`가 붙인다.

## 구현 — `components/ui/Reveal.tsx`

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
  immediate = false,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** 첫 화면 요소면 true — 스크롤 트리거 없이 즉시 재생 */
  immediate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-hydrated", "");
  }, []);

  useEffect(() => {
    const el = ref.current;
    const supportsObserver = typeof IntersectionObserver !== "undefined";

    // 첫 화면이거나 IntersectionObserver 미지원이면 즉시 재생
    if (immediate || !supportsObserver || !el) {
      // 같은 프레임에 켜면 transition이 생략된다 → 다음 프레임에서 켠다.
      // 백그라운드 탭은 rAF가 멈추므로 타이머로 한 번 더 보장한다.
      const frame = requestAnimationFrame(() => setVisible(true));
      const timer = window.setTimeout(() => setVisible(true), 100);
      return () => {
        cancelAnimationFrame(frame);
        clearTimeout(timer);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate]);

  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={
        delay ? ({ "--reveal-delay": `${delay}s` } as React.CSSProperties) : undefined
      }
    >
      {children}
    </div>
  );
}
```

- **이펙트 본문에서 `setState`를 동기 호출하지 않는다.** `react-hooks/set-state-in-effect`(React Compiler
  린트)가 에러로 잡는다. 상태 변경은 rAF·타이머·옵저버 **콜백 안에서만** 한다.
- 한 번 보이면 `disconnect()` — 스크롤을 되돌릴 때 다시 재생되면 산만하다.
- `threshold: 0.2` — 요소가 20% 보이면 발화. `rootMargin` 음수값은 쓰지 않는다
  (뷰포트를 축소해 이미 보이는 요소의 발화를 놓친다).
- 리스트는 항목마다 감싸지 말고 **부모 하나**로 감싼다. 한 페이지 `Reveal` 30개를 넘기지 않는다.

## Stagger (순차 등장)

`delay` prop만 0.08s 배수로 올린다.

```tsx
<Reveal immediate>{/* 아바타 */}</Reveal>
<Reveal immediate delay={0.08}>{/* 제목 */}</Reveal>
<Reveal immediate delay={0.16}>{/* 본문 */}</Reveal>
<Reveal immediate delay={0.24}>{/* CTA */}</Reveal>
```

- stagger 대상은 **최대 6개**. 그 이상이면 마지막 요소가 나타날 때까지 사용자가 기다린다.
- 중첩 stagger(부모-자식-손자) 금지. 한 단계만.

## Hover / Tap

hover는 CSS `transition`으로만 처리한다.

```tsx
className="transition-colors duration-200 ease-apple hover:bg-accent-hover"
```

| 속성 | duration |
|---|---|
| `background-color`, `color`, `border-color` | `200ms` |
| `opacity` | `200ms` |

hover에서 `transform: scale()`이나 `translateY`로 요소를 움직이지 않는다. 색만 바뀐다.

## 🚫 금지 목록

| 금지 | 이유 |
|---|---|
| **JS 애니메이션 라이브러리 설치**(`motion`, `framer-motion`, GSAP …) | CSS로 충분하다. SSR·폴백·하이드레이션 문제만 늘어난다 |
| **SSR에 인라인 `opacity:0` / `transform` 심기** | JS 실패 시 본문이 통째로 사라진다 |
| **기본 숨김 + JS로 보이기** 구조 | 폴백 방향이 반대다 |
| **첫 화면 요소에 스크롤 트리거** | 초기 교차 판정 누락 시 백지가 된다 |
| **`rootMargin` 음수값** | 뷰포트를 축소해 이미 보이는 요소의 발화를 놓친다 → `threshold` |
| `rotate` 애니메이션 | 장난스럽다 (`<details>` chevron 상태 표시만 예외) |
| `scale` 바운스 / 팝인 | Apple 톤 아님 |
| spring / 오버슈트 | 물리적 튐 금지 |
| 무한 반복(플로팅, 펄스, 그라데이션 이동) | 두 번째 스크롤부터 소음 |
| 카운트업 숫자 애니메이션 | 학부모 대상에서 신뢰 저하 |
| 패럴랙스 배경 | 성능·멀미 |
| 타이핑 효과 | 읽기 방해 |
| `blur` 필터 트랜지션 | 성능 |
| 마우스 커서 추종 효과 | 모바일 무의미 + 산만 |
| 페이지 전환 애니메이션 | 정적 사이트에 불필요 |

## `prefers-reduced-motion` 대응 (필수)

CSS 한 곳에서 끝난다. JS 분기(`useReducedMotion` 등)는 필요 없다.

```css
/* 1. .reveal 전용 — 초기 숨김 자체를 해제한다(트리거를 기다리지 않는다) */
@media (prefers-reduced-motion: reduce) {
  html[data-js] .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

/* 2. 전역 킬스위치 */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

전역 킬스위치만으로는 부족하다. `.reveal`은 트리거가 붙어야 보이는 구조라
**초기 숨김 자체를 해제**해 주어야 스크롤 없이도 콘텐츠가 보인다.

## 성능

- 애니메이션은 `opacity`와 `transform`만 건드린다 (컴포지터 처리 → 리플로우 없음).
- `height`, `width`, `top`, `margin` 애니메이션 금지.
- `"use client"`는 `Reveal` 같은 트리거 래퍼에만 붙인다. → [frameworks/react.md](frameworks/react.md)

## 체크리스트

- [ ] 이징이 `var(--ease-apple)`인가?
- [ ] `opacity`와 `transform`만 변하는가?
- [ ] 프리렌더 HTML에 인라인 `opacity:0` 이 **하나도 없는가?**
- [ ] 숨김 규칙이 `html[data-js]` 안에 있는가? (JS 끄고 열었을 때 본문이 보이는가?)
- [ ] 첫 화면 요소가 `immediate`인가?
- [ ] `rootMargin` 음수값을 안 썼는가? 한 번 보이면 `disconnect()` 하는가?
- [ ] 무한 반복 애니메이션이 없는가?
- [ ] `prefers-reduced-motion`에서 `.reveal` 초기 숨김이 해제되는가?
- [ ] hover가 CSS transition으로 되어 있는가?
- [ ] 빌드 산출물 CSS에 `.reveal` / `.is-visible` 규칙이 살아 있는가?
