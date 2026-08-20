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

> ⚠️ **이 3종이 유일한 안전망이다.** 예전에는 GitHub Actions 가 push 직후 `tsc` 와 `lint` 를 자동으로 한 번 더 돌려서, 잘못된 코드가 배포되기 전에 막아 줬다. Vercel git 연동으로 전환하면서 그 자동 검사가 없어졌다(4-A). Vercel 은 `npm run build` 만 하고 `npm run lint` 는 하지 않는다.
> 그러니 **push 전에 위 3개를 직접 돌리는 것을 건너뛰지 마라.**

## 4. 배포 흐름 — push 하면 자동 배포된다

```
파일 수정 → git add/commit → git push → Vercel 이 감지 → 빌드 → 배포 → 1~3분 후 반영
```

```bash
git add -A
git commit -m "홈 슬로건 문구 수정"
git push
```

**이것만 하면 끝이다.** 나머지는 자동이다.

| push 대상 | 결과 |
|---|---|
| `main` 브랜치 | **운영 배포.** `kdy-math.vercel.app` 갱신 |
| 그 외 브랜치 / Pull Request | **미리보기 배포.** 임시 주소가 생기고 운영 주소는 그대로 |

배포 진행 상황은 **Vercel 대시보드 → 프로젝트 `kdy-math` → Deployments** 에서 본다.
(GitHub Actions 는 더 이상 배포에 관여하지 않는다 → 4-A)

큰 변경은 브랜치로 미리보기를 먼저 확인한 뒤 `main` 에 합치는 것이 안전하다.

```bash
git switch -c fix-hero
git push -u origin fix-hero   # 미리보기 배포 생성
```

### 4-A. 배포를 담당하는 것 — Vercel 의 GitHub 연동

**2026-08-20 부터 Vercel 이 직접 배포한다.** push 를 Vercel 이 감지해 저장소를 가져와 빌드한다. 저장소 쪽에 설정 파일이나 시크릿이 따로 필요하지 않다.

그전까지는 GitHub Actions 가 Vercel CLI 를 실행하는 방식이었다(연동이 안 돼서 우회한 것 → 4-C). 연동이 되면서 그 워크플로는 중복이 됐고, 두면 한 번의 push 에 배포가 두 번 일어나므로 보관 폴더로 옮겼다.

```
.github/workflows-archive/deploy.yml   ← 보관본. 실행되지 않는다
```

GitHub Actions 는 `.github/workflows/` 안의 파일만 읽으므로 이 경로에 있는 파일은 아무 동작도 하지 않는다. 되살리는 절차는 그 파일 맨 위 주석과 아래 4-D 에 적어 뒀다.

**대신 없어진 것이 있다.** Actions 가 배포 전에 돌려 주던 `npx tsc --noEmit` 과 `npm run lint` 자동 검사가 사라졌다. Vercel 은 `npm run build` 만 한다. 그래서 **push 전 검증 3종(3절)을 사람이 직접 돌려야 한다.**

### 4-B. 수동 배포 (급할 때 / Actions 가 막혔을 때)

```bash
npx vercel@latest --prod --yes --scope jenu8628s-projects
```

로컬 파일을 Vercel 로 직접 올린다. git 을 거치지 않으므로 **커밋하지 않은 변경도 올라간다** — 의도한 게 아니라면 주의.
Vercel 로그인이 안 돼 있으면 먼저 `npx vercel@latest login`.

### 4-C. (기록) 왜 한동안 Actions 로 우회했는가

> **이 문제는 2026-08-20 해결됐다.** 아래는 왜 그런 우회 구조가 있었는지, 같은 증상이 재발했을 때 무엇을 의심해야 하는지 남겨 두는 기록이다.

당시 Vercel 대시보드의 **Connect Git Repository** 가 무한 로딩으로 실패했다. 아래를 전부 시도했으나 해결되지 않았다.

- Vercel GitHub App 을 `hyunwoo-company` 조직에 설치
- 시크릿 창(쿠키·확장 프로그램 영향 배제)
- Vercel 계정의 GitHub 로그인 연결 disconnect → reconnect
- `vercel git connect` CLI

**직접 원인: 2026-08-17 GitHub 대규모 장애.** [githubstatus.com](https://www.githubstatus.com/) 기준 **API Requests 가 Major Outage**, Git Operations·Webhooks 는 Degraded, 웹/API 트래픽 약 20% 오류율이었다(SAML/OIDC·SCIM·Team Sync 영향 포함). Vercel 이 저장소 목록을 가져오려면 GitHub API 를 호출해야 하므로 응답이 오지 않아 스피너가 멈춘다. 같은 시각 아래도 전부 실패했다.

- `gh api /user/orgs` → 503
- `gh api /orgs/hyunwoo-company/memberships/{user}` → 503
- GitHub 앱 설치 페이지 → *"We couldn't respond to your request in time"*

배경 요인도 있었다. 같은 증상이 [Vercel 커뮤니티](https://community.vercel.com/t/github-commits-not-triggering-vercel-deployments-git-integration-broken/45476)에 2026-07 무렵부터 보고돼 있었고("Connected 로 표시되는데도 배포가 안 되고 재연결도 통하지 않음"), 이 팀에서도 2026-04 에 만든 `fgg-game` 만 연동돼 있고 08 월 생성 프로젝트는 전부 연동되지 않았다.

**그래서 Actions 로 우회했다.** 결과는 같았고(push → 자동 배포), Vercel 의 git 연동 상태와 무관하게 동작했다.

**결론:** GitHub API 장애가 걷힌 뒤 연동이 정상적으로 붙었다(2026-08-20). 같은 증상이 다시 보이면 **먼저 [githubstatus.com](https://www.githubstatus.com/) 의 API Requests 항목을 확인하라.** Vercel 쪽 설정을 만지기 전에 볼 것은 그쪽이다.

### 4-D. (완료) Vercel git 연동 전환 절차

> **이 전환은 2026-08-20 완료됐다.** 아래는 실제로 따라간 절차이며, 새 강사 사이트를 만들 때(6절)나 연동이 다시 깨졌을 때 재사용한다.

**0단계. GitHub 장애가 걷혔는지 먼저 확인한다.** 이걸 건너뛰면 아래가 전부 실패하고 원인을 오해하게 된다.
```bash
gh api /orgs/hyunwoo-company/installations   # 503 이 아니라 JSON 이 나와야 한다
```
[githubstatus.com](https://www.githubstatus.com/) 에서 **API Requests 가 Operational** 인지도 함께 본다.

**1단계. 조직에 Vercel GitHub App 을 설치한다.** (조직 소유자 권한 필요)
```
https://github.com/apps/vercel/installations/new/permissions?target_id=279386152
```
`target_id` 는 `hyunwoo-company` 의 조직 ID 다(`gh api /orgs/hyunwoo-company` 의 `id`).
설치 화면에서 저장소 범위에 **`kdy-math`** 를 포함시킨다.
버튼이 안 보이면 조직 소유자가 아닐 수 있다. 확인:
```bash
gh api /orgs/hyunwoo-company/memberships/<본인 GitHub 아이디>   # role 이 "admin" 이어야 설치 가능
```

**2단계. 설치 확인.**
```bash
gh api /orgs/hyunwoo-company/installations
```
`app_slug: "vercel"` 항목이 보여야 한다.

**3단계. Vercel 프로젝트에 저장소를 연결한다.**
```bash
npx vercel@latest git connect --yes --scope jenu8628s-projects
```
실패하면 대시보드에서: https://vercel.com/jenu8628s-projects/kdy-math/settings/git → **Connect Git Repository** → GitHub → `hyunwoo-company/kdy-math`

**4단계. 연결됐는지 객관적으로 확인한다.** 대시보드 표시를 믿지 말고 **도메인 목록**을 본다.
```bash
npx vercel@latest project inspect kdy-math --scope jenu8628s-projects
```
연동에 성공하면 **`kdy-math-git-main-jenu8628s-projects.vercel.app`** 형태의 `-git-<브랜치>-` 도메인이 자동 생성된다. 이 도메인이 없으면 연동되지 않은 것이다(연동된 `fgg-game` 에는 있고, 미연동 프로젝트에는 없다).

**5단계. Actions 배포 워크플로를 치운다.**
연동이 확인된 **뒤에만** 한다. 그러지 않으면 배포가 멈춘다.
지우지 말고 **보관 폴더로 옮긴다.** 나중에 연동이 깨지면 그대로 되살릴 수 있다.
```bash
mkdir -p .github/workflows-archive
git mv .github/workflows/deploy.yml .github/workflows-archive/deploy.yml
git commit -m "Vercel git 연동으로 전환, Actions 배포 워크플로 보관"
git push
```
GitHub Actions 는 `.github/workflows/` 안의 파일만 읽으므로 옮기는 것만으로 실행이 멈춘다.
치우지 않고 두면 push 할 때마다 **배포가 두 번** 일어난다(Actions + Vercel 자체).

> ⚠️ 이 단계로 `tsc` / `lint` **자동 검사도 함께 사라진다.** 이후로는 push 전에 검증 3종(3절)을 직접 돌려야 한다.

**6단계(선택).** 더 이상 쓰지 않는 토큰을 정리한다.
```bash
gh secret delete VERCEL_TOKEN --repo hyunwoo-company/kdy-math
```
https://vercel.com/account/tokens 에서 해당 토큰도 revoke 한다.
단 5단계 보관본을 되살릴 가능성을 남겨 두려면 **토큰은 그대로 두는 편이 편하다.** 시크릿이 있어도 워크플로가 실행되지 않으면 아무 일도 일어나지 않는다.

## 5. Vercel 프로젝트 현황 (이미 만들어져 있음)

이 프로젝트는 **이미 생성·배포 완료** 상태다. 아래는 실제 값이다.

| 항목 | 값 |
|---|---|
| 팀 | `jenu8628s-projects` |
| 프로젝트 이름 | `kdy-math` |
| 운영 주소 | **https://kdy-math.vercel.app** (확보 완료) |
| Framework | Next.js (자동 감지) |
| Root Directory | 저장소 루트 (모노레포 아님) |
| Environment Variables | 없음 |
| Git 연동 | ✅ **연결됨** (2026-08-20) — push 하면 Vercel 이 직접 배포한다 |
| GitHub Actions | 사용하지 않음. 배포 워크플로는 `.github/workflows-archive/` 에 보관 |

프로젝트를 로컬과 연결하는 정보는 `.vercel/project.json` 에 저장돼 있다(gitignore 대상).
새 컴퓨터에서 배포하려면 먼저 한 번:

```bash
npx vercel@latest login
npx vercel@latest link --yes --scope jenu8628s-projects --project kdy-math
```

> 프로젝트 이름은 Vercel 전체에서 유일해야 한다. `kdy-math` 는 이미 이 팀이 확보했으므로 주소가 바뀌지 않는다.
> 다른 강사 사이트를 만들 때는 이름이 선점돼 있을 수 있고, 그 경우 접미사가 붙은 주소가 배정된다.
> **QR 코드·명함을 만들기 전에 실제 배정된 주소를 반드시 확인하라.**

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
