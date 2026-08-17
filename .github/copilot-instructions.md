# GitHub Copilot 안내

이 저장소의 컨벤션 단일 소스는 저장소 루트의 **`AGENTS.md`** 다. 코드를 제안하기 전에 그 파일을 참조할 것.
UI 작업 시에는 **`.claude/skills/apple-design/SKILL.md`** (Apple HIG 기반 디자인 토큰)도 함께 따른다. Copilot에서는 자동 로드되지 않으니 직접 열어 읽어야 한다.

## 특히 자주 위반되는 금지 사항

1. **`tailwind.config.js` 를 만들지 않는다.** Tailwind CSS v4이며 토큰은 `app/globals.css` 의 `@theme` 블록에 있다. `@tailwind base/components/utilities` 디렉티브도 금지(진입은 `@import "tailwindcss";` 하나).
2. **컴포넌트·페이지에 한국어 문자열을 하드코딩하지 않는다** (`alt`·`aria-label` 포함). 모든 텍스트는 `content/` 에서 import한다.
3. **`motion` / `framer-motion` 을 도입하지 않는다.** 애니메이션은 CSS transition + IntersectionObserver로만 구현하며, 인라인 `style` 로 `opacity`/`transform` 초기값을 심지 않는다(SSR에서 콘텐츠가 사라진다).
4. **문의 폼을 만들지 않는다.** 서버가 없다. 상담은 `tel:` / `mailto:` 링크로만 처리한다.

세부 규칙과 검증 절차(`npm run build` / `npx tsc --noEmit` / `npm run lint`)는 `AGENTS.md` 를 따른다.
