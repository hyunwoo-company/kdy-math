@AGENTS.md

## Claude Code 특화

- `.claude/skills/apple-design/` 는 **Claude Code Skill** 이다. UI 관련 요청에서 자동 로드되지만, 로드되지 않은 채로 UI를 만지고 있다면 `Skill` 도구로 `apple-design` 을 직접 호출하거나 `SKILL.md` 를 읽어라.
- `next dev` 는 `AGENTS.md` 가 관리 블록을 갖고 있으면 이 파일을 건드리지 않는다(`node_modules/next/dist/server/lib/generate-agent-files.js` 의 `writeAgentFiles`). 그래서 이 파일에는 위 한 줄 import 외에 내용을 둘 수 있다.
- 규칙 자체는 `AGENTS.md` 에만 쓴다. 여기에 복제하지 마라.
