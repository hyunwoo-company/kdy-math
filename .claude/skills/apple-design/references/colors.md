# 컬러 (Colors)

## 팔레트 — 이 값 외의 hex는 쓰지 않는다

### Light
| 토큰 | 값 | 용도 |
|---|---|---|
| `--color-text` | `#1d1d1f` | 제목, 본문 |
| `--color-text-secondary` | `#6e6e73` | 캡션, 부제, 보조 설명 |
| `--color-bg` | `#ffffff` | 기본 섹션 배경 |
| `--color-bg-alt` | `#f5f5f7` | 대체 섹션 배경, 카드 배경 |
| `--color-border` | `#d2d2d7` | hairline 구분선 |

### Dark
| 토큰 | 값 | 용도 |
|---|---|---|
| `--color-text` | `#f5f5f7` | 제목, 본문 |
| `--color-text-secondary` | `#86868b` | 캡션, 부제 |
| `--color-bg` | `#000000` | 기본 섹션 배경 |
| `--color-bg-alt` | `#1d1d1f` | 대체 섹션 배경, 카드 배경 |
| `--color-border` | `#424245` | hairline 구분선 |

### Accent (라이트/다크 공통)
| 토큰 | 값 | 용도 |
|---|---|---|
| `--color-accent` | `#0071e3` | Primary 버튼 배경, 텍스트 링크 |
| `--color-accent-hover` | `#0077ed` | 위의 hover 상태 |

액센트는 **이 하나뿐이다.** 성공/경고/에러용 초록·주황·빨강을 추가하지 않는다.
(정적 프로필 사이트에 폼 검증 상태가 없다. 필요해지면 그때 이 문서를 갱신한다.)

## 규칙

### 1. 채도 높은 그라데이션 금지
배경 그라데이션 자체를 쓰지 않는다. 필요하다면 **같은 색 계열의 극히 미세한 명도 변화**만 허용:

```css
/* 허용 (거의 안 보이는 수준) */
background: linear-gradient(180deg, #ffffff 0%, #f5f5f7 100%);

/* 금지 */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
background: linear-gradient(90deg, #ff00cc, #3333ff);
```

### 2. 보라 / 바이올렛 / 인디고 계열 전면 금지
`purple`, `violet`, `indigo`, `fuchsia` — Tailwind 기본 팔레트 포함 전부 사용하지 않는다.
AI 생성 UI의 가장 강한 시그니처이며, 학부모 대상 신뢰 톤과 정면으로 충돌한다.

### 3. 액센트는 "행동 유도"에만
| 상황 | 액센트 사용 |
|---|---|
| CTA 버튼 배경 | ✅ |
| 텍스트 링크 / "자세히 보기 ›" | ✅ |
| 섹션 제목 강조 | ❌ → 크기·웨이트로 |
| 통계 숫자 강조 | ❌ → 크기로 |
| 아이콘 색 | ❌ → `--color-text-secondary` |
| 밑줄/하이라이터 효과 | ❌ |

### 4. 배경색으로 층위 만들기
섹션을 위에서 아래로 쌓을 때 `bg` → `bg-alt` → `bg` 를 번갈아 배치한다.
같은 배경색 섹션이 연속되면 그 사이에는 여백만 두고 구분선을 넣지 않는다.

```tsx
<section className="bg-bg py-30">   {/* #ffffff */}
<section className="bg-bg-alt py-30"> {/* #f5f5f7 */}
<section className="bg-bg py-30">
```

### 5. 구분선은 hairline
```css
border-top: 1px solid var(--color-border);
```
글래스 네비게이션 하단만 `0.5px`. → [glassmorphism.md](glassmorphism.md)

### 6. 투명도 사용 제한
`rgba` 는 두 곳에서만 쓴다.
- 글래스 네비게이션 배경 (`0.72`)
- 유일하게 허용된 그림자 (`rgba(0,0,0,0.06)`)

텍스트에 `opacity`를 걸어 회색을 만들지 않는다. `--color-text-secondary`를 쓴다.

## 다크모드 전략

`prefers-color-scheme` 기반을 기본으로 하고, `.dark` 클래스로 수동 오버라이드를 병행한다.
구현 코드는 [frameworks/tailwind.md](frameworks/tailwind.md) 참조.

다크모드에서 주의:
- 순수 `#000000` 배경 위의 카드는 `#1d1d1f`. 카드에 흰 테두리를 두르지 않는다.
- 액센트 `#0071e3`는 `#000000` 위에서 대비 충분(약 4.6:1). 밝게 조정하지 않는다.
- 이미지에 `filter: brightness()`를 걸지 않는다. 사진은 원본 그대로.

## 대비 검증 결과 (WCAG AA 본문 기준 4.5:1)

| 조합 | 비율 | 판정 |
|---|---|---|
| `#1d1d1f` on `#ffffff` | ~16.9:1 | ✅ |
| `#1d1d1f` on `#f5f5f7` | ~15.6:1 | ✅ |
| `#6e6e73` on `#ffffff` | ~5.0:1 | ✅ |
| `#6e6e73` on `#f5f5f7` | ~4.6:1 | ✅ (경계선 — 14px 미만 금지) |
| `#f5f5f7` on `#000000` | ~18.4:1 | ✅ |
| `#86868b` on `#000000` | ~5.9:1 | ✅ |
| `#86868b` on `#1d1d1f` | ~5.0:1 | ✅ |
| `#ffffff` on `#0071e3` | ~4.6:1 | ✅ (버튼 텍스트 17px/400 이상 유지) |

`#6e6e73`보다 옅은 회색을 새로 만들지 않는다. 위 표가 깨진다.
