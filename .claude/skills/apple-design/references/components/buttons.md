# 버튼 (Buttons)

## 공통 규격

| 항목 | 값 |
|---|---|
| 높이 | `44px` (터치 타깃 최소치) |
| 좌우 패딩 | `24px` (`px-6`) |
| radius | `980px` (pill) |
| 폰트 | `17px` / weight `400` / tracking `-0.01em` |
| transition | `colors 200ms cubic-bezier(0.16,1,0.3,1)` |

- 버튼 라벨에 굵은 웨이트를 쓰지 않는다. 400이다.
- 라벨은 짧게. "상담 신청하기" (O), "지금 바로 무료 상담을 신청해보세요" (X).
- 버튼 안에 이모지 금지. 아이콘이 필요하면 `lucide-react`.
- hover에서 크기·위치가 변하지 않는다. **색만 바뀐다.**

## 종류는 3개뿐

| 종류 | 용도 | 페이지당 개수 |
|---|---|---|
| Primary | 주요 행동 1개 (상담 신청 등) | 히어로 1개 + 하단 CTA 1개 |
| Secondary | 부차적 행동 (수업 안내 보기) | Primary 옆에 1개 |
| Text | 인라인 이동 링크 | 자유 |

## 1. Primary — 블루 pill

```tsx
<button
  type="button"
  className="
    inline-flex h-11 items-center justify-center rounded-[980px] px-6
    text-[17px] font-normal tracking-[-0.01em] text-white
    bg-accent
    transition-colors duration-200 ease-apple
    hover:bg-accent-hover
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg
    disabled:cursor-not-allowed disabled:bg-accent disabled:opacity-40
    break-keep
  "
>
  상담 신청하기
</button>
```

| 상태 | 스타일 |
|---|---|
| 기본 | bg `#0071e3`, text `#ffffff` |
| hover | bg `#0077ed` |
| focus-visible | `ring-2 ring-accent ring-offset-2` (배경색 offset) |
| active | 별도 스타일 없음 (hover 유지) |
| disabled | `opacity-40`, `cursor-not-allowed` |

`h-11` = 44px.

## 2. Secondary — 보더 pill

```tsx
<button
  type="button"
  className="
    inline-flex h-11 items-center justify-center rounded-[980px] px-6
    text-[17px] font-normal tracking-[-0.01em] text-text
    border border-border bg-transparent
    transition-colors duration-200 ease-apple
    hover:bg-bg-alt
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg
    disabled:cursor-not-allowed disabled:opacity-40
    break-keep
  "
>
  수업 안내 보기
</button>
```

| 상태 | 스타일 |
|---|---|
| 기본 | border `#d2d2d7`(다크 `#424245`), text `#1d1d1f`(다크 `#f5f5f7`), 배경 투명 |
| hover | bg `#f5f5f7`(다크 `#1d1d1f`) |
| focus-visible | Primary와 동일 링 |
| disabled | `opacity-40` |

Secondary를 액센트 색 보더로 만들지 않는다. 액센트는 Primary 하나에만.

## 3. Text — 블루 텍스트 + chevron

```tsx
import { ChevronRight } from "lucide-react";

<a
  href="/lessons"
  className="
    group inline-flex items-center gap-1
    text-[17px] font-normal tracking-[-0.01em] text-accent
    transition-colors duration-200 ease-apple
    hover:text-accent-hover hover:underline hover:underline-offset-4
    focus-visible:outline-none focus-visible:rounded-[12px] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg
    aria-disabled:pointer-events-none aria-disabled:opacity-40
    break-keep
  "
>
  수업 자세히 보기
  <ChevronRight className="size-4 shrink-0" strokeWidth={2} aria-hidden />
</a>
```

| 상태 | 스타일 |
|---|---|
| 기본 | text `#0071e3`, chevron 16px |
| hover | text `#0077ed` + `underline underline-offset-4` |
| focus-visible | `rounded-[12px]` 링 (pill 아님 — 인라인 텍스트라 12px) |
| disabled | `aria-disabled` + `opacity-40` + `pointer-events-none` |

- chevron은 `size-4`(16px), `strokeWidth={2}`. 다른 크기 금지.
- chevron이 hover에서 오른쪽으로 움직이는 마이크로 인터랙션은 **쓰지 않는다** (transform 금지 규칙).
- `<a>`에는 `disabled` 속성이 없으므로 `aria-disabled`를 쓴다.

## 재사용 컴포넌트

```tsx
// components/ui/button.tsx
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

const base =
  "inline-flex h-11 items-center justify-center rounded-[980px] px-6 " +
  "text-[17px] font-normal tracking-[-0.01em] break-keep " +
  "transition-colors duration-200 ease-apple " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-bg " +
  "disabled:cursor-not-allowed disabled:opacity-40";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-hover",
  secondary:
    "border border-border bg-transparent text-text hover:bg-bg-alt",
};

export function Button({
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      {...props}
      className={cn(base, variants[variant], className)}
    />
  );
}
```

링크로 써야 하면 `<Link>`에 같은 클래스 문자열을 적용한다 (`asChild` 패턴을 위해 별도 라이브러리를 추가하지 않는다).

```tsx
import Link from "next/link";

<Link href="/contact" className={cn(base, variants.primary)}>
  상담 신청하기
</Link>
```

## 버튼 그룹

```tsx
<div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
  <Button variant="primary">상담 신청하기</Button>
  <Button variant="secondary">수업 안내 보기</Button>
</div>
```

모바일에서 버튼을 `w-full`로 늘리지 않는다. Apple은 모바일에서도 pill 폭을 콘텐츠에 맞춘다.
꼭 필요하면 `w-full sm:w-auto`를 쓰되, 두 버튼 모두 동일하게 적용한다.

## 🚫 금지

- 그라데이션 배경 버튼
- 그림자가 있는 버튼
- `scale`/`translateY` hover 효과
- 44px보다 낮은 버튼
- `rounded-lg`, `rounded-xl` 등 pill 아닌 radius (Text 버튼 focus 링의 `12px`만 예외)
- 굵은 웨이트(600 이상) 라벨
- 액센트 색 Secondary 버튼
- `outline: none`만 하고 focus 링을 안 주는 것
- 한 화면에 Primary 버튼 2개 이상
