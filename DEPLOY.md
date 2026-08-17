# DEPLOY.md — 빌드 · 실행 · 배포

개발을 모르는 분도 순서대로 따라갈 수 있게 정리했다. 명령어는 **저장소 루트 폴더**에서 실행한다.

- 저장소: `https://github.com/hyunwoo-company/kdy-math.git`
- 배포: Vercel 팀 `jenu8628s-projects` / 프로젝트 `kdy-math` → **https://kdy-math.vercel.app**
- 코딩 컨벤션은 [AGENTS.md](AGENTS.md), 글·사진만 고치고 싶으면 [CONTENT-GUIDE.md](CONTENT-GUIDE.md).

---

## 1. 준비물

| 항목 | 필요 버전 / 비고 |
|---|---|
| Node.js | **20.9.0 이상** (`next@16.3.1` 요구사항). 확인: `node -v` |
| npm | Node.js에 함께 설치됨. 확인: `npm -v` |
| Git | 확인: `git --version` |
| 계정 | GitHub 계정 + Vercel 계정(GitHub 로그인 권장) |

## 2. 로컬에서 실행하기

```bash
npm install      # 처음 한 번 (또는 package.json이 바뀐 뒤)
npm run dev      # 개발 서버 시작
```

브라우저에서 **http://localhost:3000** 을 연다. 파일을 저장하면 화면이 자동으로 갱신된다.
끄려면 터미널에서 `Ctrl + C`.

| 명령 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 (수정 즉시 반영) |
| `npm run build` | 배포와 동일한 방식으로 빌드 |
| `npm start` | 빌드 결과물을 로컬에서 실행 (`npm run build` 후에만) |

## 3. 검증 3종 — 올리기 전에 반드시

```bash
npm run build
npx tsc --noEmit
npm run lint
```

| 명령 | 무엇을 잡는가 |
|---|---|
| `npm run build` | 실제 배포와 같은 빌드. 이게 실패하면 **Vercel 배포도 실패한다** |
| `npx tsc --noEmit` | 타입 오류 (오타난 변수명, 빠진 필드 등) |
| `npm run lint` | 코드 규칙 위반, 이미지·훅 사용 경고 |

세 개 모두 오류 없이 끝나야 올린다. AI에게 작업을 시켰다면 **"이 세 명령을 실행해서 통과했는지 확인하고 결과를 보여줘"** 라고 요구한다.

## 4. 배포 흐름

```
파일 수정 → git add/commit → git push (main) → Vercel이 자동 빌드 → 1~2분 후 kdy-math.vercel.app 반영
```

```bash
git add -A
git commit -m "홈 슬로건 문구 수정"
git push
```

| push 대상 | 결과 |
|---|---|
| `main` 브랜치 | **운영 배포.** `kdy-math.vercel.app` 이 갱신된다 |
| 그 외 브랜치 / Pull Request | **미리보기(Preview) 배포.** 임의의 주소가 생성되고 운영 주소는 그대로. PR 화면과 Vercel 대시보드에서 미리보기 링크를 확인할 수 있다 |

큰 변경은 브랜치를 만들어 미리보기로 먼저 확인한 뒤 `main` 에 합치는 것이 안전하다.

```bash
git switch -c fix-hero      # 새 브랜치
git push -u origin fix-hero # 미리보기 배포 생성
```

### 아직 첫 커밋이 없는 경우

이 저장소는 `main` 브랜치와 원격(`origin`)이 설정돼 있으나 **커밋이 아직 없다**(문서 작성 시점 기준). 첫 업로드는 아래처럼 한다.

```bash
git add -A
git commit -m "초기 커밋 — 강사 프로필 사이트"
git push -u origin main
```

## 5. Vercel 초기 설정 (프로젝트를 처음 연결할 때, 1회)

1. https://vercel.com 에 GitHub 계정으로 로그인한다.
2. 화면 왼쪽 위에서 팀 **`jenu8628s-projects`** 를 선택한다. (개인 계정에 만들면 주소·권한이 달라진다)
3. **Add New → Project** → GitHub 저장소 목록에서 **`hyunwoo-company/kdy-math`** 를 **Import**.
   - 저장소가 안 보이면 `Adjust GitHub App Permissions` 로 해당 저장소 접근 권한을 준다.
4. 설정 화면에서 아래만 확인한다.

| 항목 | 값 |
|---|---|
| Project Name | **`kdy-math`** — 이 이름이 그대로 `kdy-math.vercel.app` 주소가 된다 |
| Framework Preset | **Next.js** (자동 감지됨. 손대지 않는다) |
| Root Directory | **저장소 루트** (기본값. 이 저장소는 모노레포가 아니다) |
| Build / Output / Install Command | **기본값 그대로** |
| Environment Variables | **없음** (이 프로젝트는 환경변수를 쓰지 않는다) |

5. **Deploy** 를 누른다. 이후로는 `main` 에 push할 때마다 자동 배포된다.

> 프로젝트 이름은 Vercel 전체에서 유일해야 한다. `kdy-math` 가 이미 선점돼 있으면 접미사가 붙은 다른 주소가 배정된다. 그 경우 실제 배정된 주소를 확인해서 QR 코드·명함에 반영해야 한다.

## 6. 새 강사 사이트를 만들 때

**모노레포가 아니다.** 강사 1명 = GitHub 저장소 1개 + Vercel 프로젝트 1개. 서로 완전히 독립이라 한 강사의 수정이 다른 강사 사이트에 영향을 주지 않는다.

1. **새 GitHub 저장소 생성** — 예: `hyunwoo-company/abc-math` (빈 저장소로 만든다).
2. **이 저장소를 템플릿으로 복제** — 아래 중 하나.
   - GitHub 화면에서 `Use this template` (이 저장소를 Template repository로 설정해 둔 경우)
   - 또는 로컬에서 폴더를 복사한 뒤 `.git` 폴더를 삭제하고 새로 시작:
     ```bash
     git init
     git add -A
     git commit -m "초기 커밋 — 신규 강사 사이트"
     git remote add origin https://github.com/hyunwoo-company/abc-math.git
     git push -u origin main
     ```
3. **교체할 것은 사실상 두 곳뿐이다.**

   | 교체 대상 | 내용 |
   |---|---|
   | `content/` | 이름·슬로건·소개·경력·커리큘럼·연락처 등 모든 글 |
   | `public/images/` | 프로필 사진 (긴 변 1600px, JPEG q85 로 리사이즈 → AGENTS.md 9절) |

   부수적으로 `package.json` 의 `"name"` 값과 `app/favicon.ico` 도 새 강사에 맞게 바꾼다. `components/` 와 `app/globals.css`(디자인 토큰)는 그대로 재사용한다.
4. **Vercel에 새 프로젝트 추가** — 5절과 동일. 팀은 `jenu8628s-projects`, Project Name은 새 저장소 이름(그 이름이 주소가 된다), Root Directory는 저장소 루트.
5. `npm install` → 검증 3종(3절) 통과 확인 → `main` push → 배포 확인.

## 7. 트러블슈팅

### 빌드가 실패한다
확인 순서대로 하나씩.

1. `npm install` 을 했는가? (`package.json` 이 바뀐 뒤에는 다시 필요)
2. `npx tsc --noEmit` — 타입 오류가 있으면 여기서 먼저 잡힌다. 오류 메시지의 **파일명:줄번호** 를 보고 해당 줄을 고친다.
3. `npm run lint`
4. `npm run build` 의 **첫 번째** 오류 메시지를 읽는다. 뒤쪽 오류는 대부분 첫 오류의 파생이다.
5. 그래도 모르겠으면 오류 메시지 전문을 그대로 AI에게 붙여넣고 고쳐 달라고 한다.
6. Vercel에서만 실패한다면 대시보드 → 해당 배포 → **Build Logs** 를 열어 로컬 로그와 비교한다. 대소문자만 다른 import(`Nav.tsx` vs `nav.tsx`)는 Windows에서는 통과하고 Vercel(Linux)에서는 실패하므로 가장 먼저 의심한다.

### 폰트가 이상하게 나온다
- `public/fonts/pretendard/` 에 `.woff2` 파일이 **92개** 있는지 확인한다. 누락되면 일부 글자만 기본 폰트로 보인다.
- `app/layout.tsx` 가 `import "./pretendard.css";` 를 하고 있는지 확인한다. 이 import가 빠지면 폰트가 전혀 적용되지 않는다.
- 브라우저 개발자도구 → Network에서 `PretendardVariable.subset.*.woff2` 요청이 404가 아닌지 본다.
  한 페이지에서 **전부 받지 않는 것이 정상**이다. `unicode-range` 로 분할돼 있어 그 페이지에 쓰인 글자가 속한 파일만 내려온다.
- 빌드가 `Invalid dangling combinator in selector` 로 실패하면 `app/pretendard.css` 에 **BOM** 이 붙은 것이다. UTF-8 no BOM으로 다시 저장한다.

### 이미지가 안 보인다
- 파일이 `public/images/` 안에 있는지 확인한다.
- 코드에서 경로는 `public` 을 빼고 쓴다: `public/images/kdy-hero.jpg` → `/images/kdy-hero.jpg`.
- **대소문자·확장자**를 정확히 맞춘다(`.jpg` vs `.JPG`).
- 새 이미지가 저장소에 실제로 커밋됐는지 확인한다: `git status` 에 남아 있으면 아직 올라가지 않은 것이다.

### Vercel 배포는 성공했는데 화면이 옛 버전이다
1. Vercel 대시보드에서 최신 배포의 커밋 메시지가 내가 push한 것인지 확인한다. 다르면 push가 안 된 것(`git log origin/main -1` 로 확인).
2. 브라우저 강력 새로고침: `Ctrl + Shift + R` (Mac은 `Cmd + Shift + R`).
3. 시크릿 창에서 열어본다. 여기서 최신이면 내 브라우저 캐시 문제다.
4. 대시보드에서 최신 배포를 **Redeploy** 한다. 이때 캐시 사용 옵션을 끄고 다시 빌드하면 확실하다.
5. 미리보기 주소만 최신이라면 그 브랜치가 `main` 에 합쳐지지 않은 상태다.

### 로컬 개발 서버가 이상하게 동작한다
빌드 캐시를 지우고 다시 시작한다.

```bash
# Windows PowerShell
Remove-Item -Recurse -Force .next
npm run dev
```
