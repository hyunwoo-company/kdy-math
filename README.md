# kdy-math — DYnamic MATH

수학 강사 **김동영**(브랜드 `DYnamic MATH`)의 프로필 사이트. 학부모·학생 대상, 한국어, 서버 없는 정적 사이트다.
배포 주소: **https://kdy-math.vercel.app**

## 스택

Next.js 16.3.1 (App Router) · TypeScript · Tailwind CSS v4 · Pretendard · lucide-react · Vercel

## 빠른 시작

```bash
npm install
npm run dev
# http://localhost:3000
```

## 디렉터리 구조

| 경로 | 내용 |
|---|---|
| `app/` | 라우트·레이아웃·전역 스타일(`globals.css`)·폰트 |
| `components/` | `ui/`(Button·Card·Reveal·Section), `sections/`(페이지 섹션), `Nav.tsx` |
| `content/` | **사이트의 모든 텍스트.** 글을 고칠 곳은 여기뿐이다 |
| `lib/` | 유틸 (`cn()`) |
| `public/images/` | 웹용으로 리사이즈된 프로필 사진 |
| `_source-images/` | 사진 원본 (저장소에 커밋하지 않음) |
| `.claude/skills/apple-design/` | 디자인 시스템 단일 소스 (UI 작업 전 필독) |

## 문서

| 문서 | 대상 |
|---|---|
| [AGENTS.md](AGENTS.md) | **컨벤션 단일 소스.** 모든 AI 코딩 도구와 개발자가 먼저 읽는다 |
| [DEPLOY.md](DEPLOY.md) | 빌드·실행·배포·트러블슈팅 |
| [CONTENT-GUIDE.md](CONTENT-GUIDE.md) | 비개발자용 — AI에게 글·사진 수정을 시키는 방법 |

`CLAUDE.md` · `GEMINI.md` · `.github/copilot-instructions.md` 는 각 도구가 `AGENTS.md` 를 읽도록 하는 포인터다.
