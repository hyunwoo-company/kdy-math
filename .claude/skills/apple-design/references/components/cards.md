# 카드 (Cards)

## 공통 규격

| 항목 | 값 |
|---|---|
| 배경 | `#f5f5f7` (다크 `#1d1d1f`) |
| radius | `18px` |
| 내부 패딩 | `32px` (`p-8`) |
| 그림자 | **없음** |
| 보더 | **없음** |
| 텍스트 정렬 | 좌측 |

카드는 **`#ffffff` 섹션 안에 놓는다.** `#f5f5f7` 섹션 위에 `#f5f5f7` 카드를 얹으면 형태가 사라진다.
`bg-alt` 섹션에 카드를 놓아야 한다면 카드를 `#ffffff`(다크 `#000000`)로 뒤집는다.

```
섹션 #ffffff  →  카드 #f5f5f7   ✅
섹션 #f5f5f7  →  카드 #ffffff   ✅
섹션 #f5f5f7  →  카드 #f5f5f7   ❌ 안 보임
```

## 1. 기본 카드

```tsx
<article className="rounded-[18px] bg-bg-alt p-8">
  <h3 className="text-[24px] font-semibold leading-[1.15] tracking-[-0.02em] break-keep md:text-[28px]">
    개념 재정립
  </h3>
  <p className="mt-4 max-w-[65ch] text-[17px] leading-[1.5] tracking-[-0.01em] text-text-secondary break-keep">
    공식을 외우기 전에 정의와 조건을 스스로 설명할 수 있게 만듭니다.
  </p>
</article>
```

### 아이콘이 있는 경우 (lucide-react만)

```tsx
import { BookOpen } from "lucide-react";

<article className="rounded-[18px] bg-bg-alt p-8">
  <BookOpen className="size-6 text-text-secondary" strokeWidth={1.5} aria-hidden />
  <h3 className="mt-6 text-[24px] font-semibold leading-[1.15] tracking-[-0.02em] break-keep">
    개념 재정립
  </h3>
  <p className="mt-3 text-[17px] leading-[1.5] tracking-[-0.01em] text-text-secondary break-keep">
    공식을 외우기 전에 정의와 조건을 스스로 설명할 수 있게 만듭니다.
  </p>
</article>
```

- 아이콘 크기 `size-6`(24px), `strokeWidth={1.5}`.
- 아이콘 색은 `text-text-secondary`. **액센트 컬러 금지.**
- 아이콘 뒤에 원형/사각 배경 칩을 두지 않는다.
- 이모지 절대 금지.

### 클릭 가능한 카드

```tsx
import Link from "next/link";

<Link
  href="/lessons/concept"
  className="
    block rounded-[18px] bg-bg-alt p-8
    transition-colors duration-200 ease-apple
    hover:bg-[#ebebef] dark:hover:bg-[#2a2a2c]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg
  "
>
  {/* 카드 내용 */}
</Link>
```

hover는 배경 명도만 미세하게 바꾼다. `scale`, `translateY`, `shadow` 금지.

## 2. 이미지 카드

```tsx
import Image from "next/image";

<article className="overflow-hidden rounded-[24px] bg-bg-alt">
  <div className="relative aspect-[4/3] w-full">
    <Image
      src="/images/lesson.jpg"
      alt="수업 중인 교실 모습"
      fill
      sizes="(min-width: 768px) 33vw, 100vw"
      className="object-cover"
    />
  </div>
  <div className="p-8">
    <h3 className="text-[24px] font-semibold leading-[1.15] tracking-[-0.02em] break-keep">
      1:1 맞춤 첨삭
    </h3>
    <p className="mt-3 text-[17px] leading-[1.5] tracking-[-0.01em] text-text-secondary break-keep">
      풀이 과정을 직접 읽고 오류 지점을 짚어드립니다.
    </p>
  </div>
</article>
```

- 이미지가 포함된 큰 카드는 radius **`24px`** (이미지 컨테이너 규격).
- `overflow-hidden` 필수 — 이미지 모서리가 radius를 따르게 한다.
- `aspect-[4/3]` 또는 `aspect-[3/2]` 고정. 이미지마다 비율이 다르면 그리드가 흔들린다.
- 이미지 위에 텍스트를 겹치지 않는다. 겹쳐야 한다면 오버레이 그라데이션 대신 텍스트를 아래로 뺀다.
- `alt`는 반드시 의미 있게 작성한다(한국어).

## 3. 통계 카드

숫자는 크고 조용하게. 카운트업 애니메이션 금지.

```tsx
<div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
  {[
    { value: "10년", label: "강의 경력" },
    { value: "1,200명", label: "누적 지도 학생" },
    { value: "94%", label: "재수강 의향" },
    { value: "1:1", label: "개별 첨삭" },
  ].map((stat) => (
    <div key={stat.label} className="rounded-[18px] bg-bg-alt p-8">
      <p className="text-[40px] font-semibold leading-[1.15] tracking-[-0.02em] whitespace-nowrap">
        {stat.value}
      </p>
      <p className="mt-2 text-[14px] leading-[1.5] text-text-secondary break-keep">
        {stat.label}
      </p>
    </div>
  ))}
</div>
```

- 숫자는 H2 크기(`40px` / weight 600). 액센트 컬러를 쓰지 않는다.
- 단위(년, 명, %)가 숫자에서 떨어지지 않도록 `whitespace-nowrap`.
- 라벨은 Caption(`14px`) + `text-secondary`.
- 값과 라벨 사이는 `mt-2`(8px) — 밀접한 관계이므로 좁게.

### 구분선 버전 (카드 배경 없이)

같은 배경 섹션에서 카드 배경을 쓸 수 없을 때만 사용한다.

```tsx
<div className="grid grid-cols-2 gap-8 md:grid-cols-4">
  {stats.map((stat) => (
    <div key={stat.label} className="border-t border-border pt-6">
      <p className="text-[40px] font-semibold leading-[1.15] tracking-[-0.02em] whitespace-nowrap">
        {stat.value}
      </p>
      <p className="mt-2 text-[14px] text-text-secondary break-keep">{stat.label}</p>
    </div>
  ))}
</div>
```

## 그리드 배치

```tsx
<div className="grid gap-6 md:grid-cols-3 md:gap-8">
  {/* 카드 3개 */}
</div>
```

- 카드 사이 간격: 모바일 `24px`, 데스크톱 `32px`.
- 카드 높이를 억지로 맞추지 않는다. grid가 자동으로 맞춘다 (`items-stretch` 기본).
- 카드 안 텍스트 길이가 크게 다르면 문구를 줄인다. `line-clamp`로 자르지 않는다.

## 🚫 금지

- 카드 그림자 (`shadow-md`, `shadow-lg` 등 전부)
- 카드 보더 + 배경색 동시 사용
- `rounded-2xl`, `rounded-3xl` 등 18/24px 아닌 radius
- 카드에 글래스모피즘(`backdrop-blur`)
- 카드 배경 그라데이션
- hover 시 카드가 뜨는 효과 (`hover:-translate-y-1`, `hover:shadow-xl`)
- 카드 내부 중앙정렬
- 이모지 아이콘
- 카드 안에 액센트 컬러 배지/태그
- 패딩 `p-4`, `p-6` (32px = `p-8` 고정)
