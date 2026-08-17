---
name: apple-design
description: Apple Human Interface Guidelines와 apple.com 마케팅 페이지의 디자인 언어를 강제하는 단일 소스. UI 컴포넌트·페이지·섹션을 새로 만들거나 수정할 때, 그리고 색상·여백·타이포그래피·버튼·카드·네비게이션·애니메이션·다크모드·글래스모피즘을 결정할 때 반드시 사용한다. "디자인", "스타일", "예쁘게", "애플st", "히어로 섹션", "랜딩", "레이아웃", "폰트", "색 정해줘", "Tailwind 클래스", "globals.css", "@theme", "motion 애니메이션" 같은 요청에 반응한다. 이 스킬의 토큰을 벗어난 값(임의의 hex, 임의의 radius, 임의의 여백)을 쓰려는 순간에도 먼저 이 스킬을 확인한다.
---

# Apple Design System (kdy-math)

수학 강사 개인 포트폴리오/프로필 사이트. 대상은 **학부모(한국어)**. 정적 사이트, 서버 없음.
톤: 신뢰감 · 절제 · 여백. 화려함이 아니라 **정돈된 무게감**이 목표다.

## 기술 전제 (반드시 지킬 것)

- **Tailwind CSS v4**. `tailwind.config.js`는 존재하지 않으며 만들지 않는다.
  토큰은 전부 `app/globals.css`의 **`@theme` 블록**에 선언한다.
- CSS 진입은 `@import "tailwindcss";` 하나. v3의 `@tailwind base/components/utilities`는 **금지**.
- Next.js 16 App Router, TypeScript, `src/` 없음, import alias `@/*`.
- 사용 가능한 패키지: `pretendard`, `lucide-react`, `clsx`, `tailwind-merge`.
  **JS 애니메이션 라이브러리는 쓰지 않는다**(`motion`/`framer-motion` 제거됨). 진입 애니메이션은 CSS transition + IntersectionObserver로 처리한다.

## 핵심 토큰 요약 (상세는 각 reference 참조)

### 컬러
| 역할 | Light | Dark |
|---|---|---|
| 텍스트 | `#1d1d1f` | `#f5f5f7` |
| 보조 텍스트 | `#6e6e73` | `#86868b` |
| 배경 | `#ffffff` | `#000000` |
| 대체 섹션 배경 | `#f5f5f7` | `#1d1d1f` |
| 구분선 | `#d2d2d7` | `#424245` |
| 액센트(CTA) | `#0071e3` / hover `#0077ed` | 동일 |

액센트는 **1개뿐**. 컬러는 강조가 아니라 **행동 유도(CTA)** 에만 쓴다. → [colors.md](references/colors.md)

### 타이포그래피 (데스크톱 → 모바일)
| 역할 | 크기 | tracking | line-height | weight |
|---|---|---|---|---|
| Display | 80 → 64px | `-0.03em` | 1.05 | 700 (여기만 허용) |
| H1 | 56 → 40px | `-0.03em` | 1.05 | 600 |
| H2 | 40 → 32px | `-0.02em` | 1.15 | 600 |
| H3 | 28 → 24px | `-0.02em` | 1.15 | 600 |
| Body-L | 21 → 19px | `-0.01em` | 1.5 | 400 |
| Body | 17px | `-0.01em` | 1.5 | 400 |
| Caption | 14px | `0` | 1.5 | 400 |

폰트는 **Pretendard**만. SF Pro는 라이선스·한글 미지원으로 금지.
한국어 텍스트에는 **`word-break: keep-all` 필수**. → [typography.md](references/typography.md)

### 여백 · 레이아웃
- 4px 배수만 사용.
- 섹션 상하 패딩: 데스크톱 `120~160px`, 모바일 `80px`.
- 콘텐츠 폭: 본문 `1024px`, 풀블리드 히어로 `1440px`. 거터 모바일 `24px` / 데스크톱 `40px`.
- 섹션 사이 여백 ≥ 요소 사이 여백 × 3. → [spacing-layout.md](references/spacing-layout.md)

### Radius (이 4개 외 금지)
`980px` 버튼(pill) · `18px` 카드 · `24px` 큰 컨테이너/이미지 · `12px` 작은 요소

### 그림자
거의 쓰지 않는다. 필요 시 `0 4px 24px rgba(0,0,0,0.06)` 하나만.
깊이는 그림자가 아니라 **배경색 대비(`#ffffff` vs `#f5f5f7`)** 로 만든다.

### 모션
이징 `cubic-bezier(0.16, 1, 0.3, 1)` → 토큰 `--ease-apple`.
진입은 `opacity 0→1` + `translateY 24px→0`, `0.6s`, stagger `0.08s`.
**전부 CSS transition으로 구현한다.** 클래스 토글(`.reveal` / `.is-visible`)만 JS가 담당한다.
**인라인 style로 opacity/transform 초기값을 심지 마라** — SSR HTML에 남아 JS 실패 시 콘텐츠가 사라진다.
숨김 규칙은 반드시 `html[data-js]` 안에 둔다(JS 없으면 규칙 미적용 → 콘텐츠 노출). → [animations.md](references/animations.md)

---

## 라우팅 표 — 언제 무엇을 읽는가

| 지금 하려는 일 | 읽을 파일 |
|---|---|
| 왜 이렇게 하는지 / 판단이 애매할 때 | [references/principles.md](references/principles.md) |
| 색을 고르거나 다크모드를 다룰 때 | [references/colors.md](references/colors.md) |
| 제목·본문 크기, 폰트, 한글 줄바꿈 | [references/typography.md](references/typography.md) |
| 섹션 패딩, 컨테이너 폭, 그리드 | [references/spacing-layout.md](references/spacing-layout.md) |
| 반투명 블러(네비게이션 바) | [references/glassmorphism.md](references/glassmorphism.md) |
| 등장 애니메이션, 스크롤 트리거 | [references/animations.md](references/animations.md) |
| 버튼을 만들 때 | [references/components/buttons.md](references/components/buttons.md) |
| 카드·통계 블록을 만들 때 | [references/components/cards.md](references/components/cards.md) |
| 헤더·모바일 메뉴를 만들 때 | [references/components/navigation.md](references/components/navigation.md) |
| `app/globals.css`에 토큰을 심을 때 | [references/frameworks/tailwind.md](references/frameworks/tailwind.md) |
| 컴포넌트 파일 배치, `cn()`, `"use client"` 경계 | [references/frameworks/react.md](references/frameworks/react.md) |

---

## 🚫 절대 금지 목록

1. **보라/바이올렛/네온 그라데이션** — AI가 만든 티가 나는 1순위 원인.
2. **이모지를 아이콘으로 사용** — 아이콘은 `lucide-react`만.
3. **진한 드롭섀도 / 다중 그림자** — 깊이는 배경색 대비로.
4. **폰트 웨이트 3종 이상 혼용** — 400과 600만. Display에 한해 700.
5. **900(Black) 웨이트**.
6. **좁은 여백** — 부족한 것보다 과한 게 낫다.
7. **중앙정렬 남발** — 히어로 외의 본문은 **좌측정렬**.
8. **무한 루프 장식 애니메이션** — 모션은 "등장"에만.
9. **임의의 border-radius 값** — 위 4개만.
10. **액센트 컬러 2개 이상** — `#0071e3` 하나.
11. **채도 높은 배경 그라데이션**.
12. **글래스모피즘을 카드/일반 섹션에 사용** — 고정 네비게이션 바 전용.
13. **`tailwind.config.js` 생성 / `@tailwind` 디렉티브 사용** — v4 문법 위반.
14. **하드코딩된 hex 값을 컴포넌트에 직접 작성** — 반드시 `@theme` 토큰 경유.

## 자체 점검 체크리스트

UI를 만들거나 고친 뒤 아래를 통과하지 못하면 되돌린다.

- [ ] 사용한 색이 위 표 6종 + 액센트 안에 있는가?
- [ ] radius가 `980px / 24px / 18px / 12px` 중 하나인가?
- [ ] 폰트 웨이트가 400과 600(예외 700)만인가?
- [ ] 한국어 문단에 `break-keep`이 걸려 있는가?
- [ ] 본문 폭이 `65ch` 이하인가?
- [ ] 섹션 세로 패딩이 모바일 80px / 데스크톱 120px 이상인가?
- [ ] 그림자를 안 썼거나, 썼다면 `0 4px 24px rgba(0,0,0,0.06)` 하나뿐인가?
- [ ] 애니메이션 이징이 `[0.16, 1, 0.3, 1]`인가? 무한 루프는 없는가?
- [ ] `prefers-reduced-motion`을 대응했는가?
- [ ] 다크모드에서도 대비가 유지되는가?
