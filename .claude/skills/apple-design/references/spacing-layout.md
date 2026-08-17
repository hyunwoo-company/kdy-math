# 여백 · 레이아웃 (Spacing & Layout)

## 대원칙

> **여백이 부족한 것보다 과한 게 낫다.**
> **섹션 사이 여백 ≥ 섹션 내부 요소 사이 여백 × 3.**

## 스페이싱 스케일 — 4px 배수만

허용 값 (px): `4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 120 · 160`

Tailwind v4 기본 `--spacing`은 `0.25rem`(4px)이므로 숫자 유틸이 그대로 4px 배수다.

| Tailwind | px | 용도 |
|---|---|---|
| `gap-1` | 4 | 아이콘-라벨 미세 간격 |
| `gap-2` | 8 | 인라인 요소 간격 |
| `gap-3` | 12 | 리스트 아이템 사이 |
| `gap-4` | 16 | 제목-본문 사이 |
| `gap-6` | 24 | 카드 그리드 간격(모바일) |
| `gap-8` | 32 | 카드 그리드 간격(데스크톱), 카드 내부 패딩 |
| `gap-12` | 48 | 섹션 내 블록 그룹 사이 |
| `gap-16` | 64 | 섹션 헤더-콘텐츠 사이 |
| `py-20` | 80 | 섹션 세로 패딩(모바일) |
| `py-30` | 120 | 섹션 세로 패딩(데스크톱 최소) |
| `py-40` | 160 | 섹션 세로 패딩(데스크톱 최대, 히어로급) |

`5px`, `10px`, `15px`, `18px`, `30px` 같은 값은 쓰지 않는다.

## 섹션 세로 패딩

| 뷰포트 | 값 |
|---|---|
| 모바일 (< 768px) | `80px` |
| 데스크톱 (≥ 768px) | `120px` ~ `160px` |

```tsx
<section className="py-20 md:py-30">        {/* 80 → 120 */}
<section className="py-20 md:py-40">        {/* 80 → 160, 히어로/주요 섹션 */}
```

같은 배경색 섹션이 연속되면 사이 패딩을 합산해 과해지지 않도록 한쪽을 줄이지 말고,
**둘을 하나의 섹션으로 합친다.**

## 컨테이너 폭

| 용도 | max-width |
|---|---|
| 본문 중심 콘텐츠 | `1024px` |
| 풀블리드 히어로 · 대형 이미지 | `1440px` |
| 읽기용 문단 | `65ch` (컨테이너 안에서 추가 제한) |

### 거터 (좌우 패딩)
| 뷰포트 | 값 |
|---|---|
| 모바일 | `24px` |
| 데스크톱 (≥ 768px) | `40px` |

### 컨테이너 컴포넌트

```tsx
// components/ui/container.tsx
import { cn } from "@/lib/utils";

export function Container({
  wide = false,
  className,
  children,
}: {
  wide?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-10",
        wide ? "max-w-[1440px]" : "max-w-[1024px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
```

`px-6` = 24px, `px-10` = 40px. 이 두 값 외의 거터를 쓰지 않는다.

## 섹션 골격 패턴

```tsx
<section className="bg-bg-alt py-20 md:py-30">
  <Container>
    {/* 섹션 헤더 */}
    <div className="max-w-[40ch]">
      <p className="text-[14px] text-text-secondary break-keep">수업 방식</p>
      <h2 className="mt-3 text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] break-keep md:text-[40px]">
        개념을 먼저, 문제는 그다음
      </h2>
      <p className="mt-4 max-w-[65ch] text-[17px] leading-[1.5] tracking-[-0.01em] text-text-secondary break-keep">
        무작정 문제를 푸는 대신 정의와 원리부터 다시 세웁니다.
      </p>
    </div>

    {/* 콘텐츠 — 헤더와 64px 거리 */}
    <div className="mt-16 grid gap-6 md:grid-cols-3 md:gap-8">
      {/* … */}
    </div>
  </Container>
</section>
```

간격 위계가 그대로 드러난다: `mt-3`(12) < `mt-4`(16) < `mt-16`(64) < `py-30`(120).

## 그리드

```tsx
{/* 2열 */}
<div className="grid gap-6 md:grid-cols-2 md:gap-8">

{/* 3열 */}
<div className="grid gap-6 md:grid-cols-3 md:gap-8">

{/* 통계 4개 — 모바일 2열, 데스크톱 4열 */}
<div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
```

- 열 수는 **1 / 2 / 3 / 4**만. 5열 이상 금지.
- 모바일은 항상 1열(통계만 예외로 2열).
- `grid-cols-*` 는 `md:` 이상에서만 적용한다. 태블릿 전용 브레이크포인트를 새로 만들지 않는다.

## 브레이크포인트

Tailwind v4 기본값을 그대로 쓴다. 실제로는 `md`(768px) 하나로 대부분 해결된다.

| 이름 | 값 | 사용 |
|---|---|---|
| `md` | 768px | 주 분기점. 타이포·패딩·그리드 전부 여기서 전환 |
| `lg` | 1024px | 컨테이너가 최대폭에 닿는 지점. 꼭 필요할 때만 |

`sm`, `xl`, `2xl`은 쓰지 않는다. 분기점이 많아질수록 유지 비용만 늘어난다.

## 수직 리듬

한 섹션 안에서 요소 사이 간격은 아래 3단계만 쓴다.

| 관계 | 간격 |
|---|---|
| 밀접 (라벨↔값, 제목↔부제) | `12~16px` (`mt-3`, `mt-4`) |
| 보통 (문단↔문단, 카드↔카드) | `24~32px` (`mt-6`, `gap-8`) |
| 분리 (헤더↔콘텐츠 그룹) | `48~64px` (`mt-12`, `mt-16`) |

## 자주 하는 실수

| 잘못 | 올바름 |
|---|---|
| 섹션 패딩 `py-12`(48px) | `py-20 md:py-30` |
| `space-y-4`로 모든 간격 통일 | 위계에 따라 3단계로 구분 |
| 컨테이너 `max-w-7xl` (1280px) | `max-w-[1024px]` 또는 `max-w-[1440px]` |
| `px-4` 거터 | `px-6 md:px-10` |
| 카드 내부 패딩 `p-4` | `p-8` (32px) |
| 모든 섹션 중앙정렬 | 히어로만 중앙, 나머지 좌측 |
