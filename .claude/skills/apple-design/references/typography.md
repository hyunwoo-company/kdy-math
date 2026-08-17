# 타이포그래피 (Typography)

## 폰트

**Pretendard 하나만 사용한다.** 한글 + 라틴 + 숫자를 모두 커버한다.

- SF Pro는 **사용 금지**: Apple 라이선스가 Apple 플랫폼용 앱/문서로 제한되고, 한글 글자체가 없다.
- 코드/모노스페이스 폰트도 이 사이트에는 불필요하다. 추가하지 않는다.
- `Noto Sans KR`, `Spoqa Han Sans` 등 다른 한글 폰트와 혼용하지 않는다.

### 적용 방법 — dynamic subset (이 프로젝트에서 확정된 방식)

**`next/font` 를 쓰지 않는다.** 가변 폰트 단일 파일은 2MB 라서 첫 방문자에게 무조건 전송된다.
대신 `unicode-range` 로 분할된 92개 subset 을 순수 CSS 로 로드해, 브라우저가 **그 페이지에 실제로 쓰인 글자가 속한 범위만** 내려받게 한다.

구성:

| 파일 | 역할 |
|---|---|
| `public/fonts/pretendard/*.woff2` (92개) | subset 폰트 파일 |
| `app/pretendard.css` | `@font-face` 92개. 패키지 CSS의 경로만 치환한 것 |
| `app/layout.tsx` | `import "./pretendard.css";` |
| `app/globals.css` | `--font-sans: "Pretendard Variable", -apple-system, …` |

```tsx
// app/layout.tsx
import "./pretendard.css";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="bg-bg text-text font-sans antialiased">{children}</body>
    </html>
  );
}
```

`@theme` 에서는 **패밀리명을 직접** 참조한다(`var(--font-pretendard)` 같은 변수는 존재하지 않는다).
→ [frameworks/tailwind.md](frameworks/tailwind.md)

`app/pretendard.css` 재생성 절차는 그 파일 상단 주석에 있다. 손으로 고치지 말 것.

> ⚠️ **`app/pretendard.css` 는 UTF-8 no BOM 으로 저장해야 한다.** BOM 이 붙으면 PostCSS 단계에서
> `Invalid dangling combinator in selector` 로 빌드가 실패한다. Windows PowerShell 의
> `Set-Content -Encoding utf8` 은 BOM 을 붙이므로 이 파일에 쓰지 마라.

> ⚠️ `next/font/local` 방식과 병행하지 마라. 폰트가 두 번 로드된다.

## 스케일

| 역할 | 데스크톱 | 모바일 | tracking | line-height | weight |
|---|---|---|---|---|---|
| Display | 80px | 64px | `-0.03em` | 1.05 | 700 |
| H1 | 56px | 40px | `-0.03em` | 1.05 | 600 |
| H2 | 40px | 32px | `-0.02em` | 1.15 | 600 |
| H3 | 28px | 24px | `-0.02em` | 1.15 | 600 |
| Body-L | 21px | 19px | `-0.01em` | 1.5 | 400 |
| Body | 17px | 17px | `-0.01em` | 1.5 | 400 |
| Caption | 14px | 14px | `0` | 1.5 | 400 |

- **Display는 히어로 최상단 한 곳에서만.** 페이지당 1회.
- 이 표에 없는 크기(예: 24px 본문, 18px 캡션)를 새로 만들지 않는다.
- Body는 반응형으로 변하지 않는다. 17px 고정.

## 웨이트 규칙

- 사용 가능: **400 (Regular)** 과 **600 (SemiBold)**.
- **700은 Display 한정.** H1 이하에는 쓰지 않는다.
- **900(Black) 금지.** 500(Medium), 800(ExtraBold)도 쓰지 않는다 — 3종 이상 혼용은 톤을 무너뜨린다.
- 강조하고 싶을 때 `<strong>` 대신 문장을 짧게 만들거나 단독 줄로 분리한다.

## 한국어 필수 규칙

### `word-break: keep-all`
가장 중요하다. 없으면 "선생님의" 같은 어절이 줄 끝에서 중간에 잘린다.

```tsx
<p className="break-keep text-[17px] leading-[1.5] tracking-[-0.01em]">
  10년간 중고등 수학을 가르치며 쌓은 학습 설계 노하우를 담았습니다.
</p>
```

- 모든 한국어 텍스트 요소(`h1`~`h3`, `p`, `li`, 버튼 라벨)에 `break-keep`을 건다.
- 전역 적용을 권장한다 (globals.css에서 `body { word-break: keep-all; }`).
- 예외: URL이나 아주 긴 영문 문자열이 들어가는 곳만 `break-words`로 덮어쓴다.

### 줄바꿈 제어
제목의 어색한 줄바꿈은 `<br />` 대신 `text-balance` / `text-pretty`로 처리한다.

```tsx
<h2 className="text-balance break-keep">고등 수학, 개념부터 다시 세웁니다</h2>
<p className="text-pretty break-keep">…</p>
```

`<br />` 하드코딩은 반응형에서 반드시 깨진다. 정말 필요하면 `hidden md:inline` 을 붙인 `<br />`만 허용.

### 숫자와 단위
숫자와 한글 단위 사이를 줄바꿈으로 분리하지 않는다. `<span className="whitespace-nowrap">10년</span>`.

## 본문 폭

**`max-w-[65ch]` 이하.** 한 줄이 길면 다음 줄 첫 글자를 찾기 어려워진다.

```tsx
<p className="max-w-[65ch] break-keep text-[17px] leading-[1.5] text-text-secondary">
```

제목은 폭 제한이 다르다: H1/Display는 `max-w-[20ch]` 내외가 자연스럽다.

## 정렬

- 히어로 섹션: 중앙정렬 허용.
- 그 외 모든 본문·카드·리스트: **좌측정렬 (`text-left`)**.
- 중앙정렬된 3줄 이상 문단은 금지.

## Tailwind v4 유틸리티 매핑

`@theme`에 `--text-*`를 선언하면 아래처럼 쓸 수 있다 (선언 코드는 [frameworks/tailwind.md](frameworks/tailwind.md)).

```tsx
{/* Display */}
<h1 className="text-display font-bold break-keep">김도윤 수학</h1>

{/* H2 */}
<h2 className="text-h2 font-semibold break-keep">수업 방식</h2>

{/* Body */}
<p className="text-body max-w-[65ch] break-keep text-text-secondary">…</p>
```

토큰을 아직 선언하지 않았다면 임의값으로 정확히 표기한다:

```tsx
<h1 className="text-[64px] leading-[1.05] tracking-[-0.03em] font-bold break-keep md:text-[80px]">
```

## 기타

- `antialiased` 를 `body`에 건다. 굵기가 과하게 보이는 것을 막는다.
- `text-transform: uppercase` 금지 (한글에 무의미하고 라틴에서는 톤이 강해진다).
- `letter-spacing` 양수 금지. 자간을 벌려 "고급스럽게" 만들려는 시도는 이 시스템에서 정반대 효과다.
- 밑줄 링크는 본문 안에서만. 버튼 형태 링크에는 밑줄을 넣지 않는다.
