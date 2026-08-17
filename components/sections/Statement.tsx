import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { home, instructor } from "@/content";

/** 홈 핵심 카피 — 한 문장만 크게 놓는 섹션 */
export function Statement() {
  return (
    <Section id="statement" labelledBy="statement-title" alt>
      <Reveal>
        <p className="text-caption text-text-secondary break-keep">
          {home.statement.eyebrow}
        </p>
        {/* 섹션에 이 문장 하나만 있으므로 H2 스케일로는 좌측이 비어 보인다.
            선언 문구는 H1 스케일(40 → 56px)로 크게 놓는다. Display 는 홈 히어로 전용.
            26ch = 867px(56px 기준). ch 은 라틴 숫자 기준(0.595em)이라
            한글로는 한 줄 약 15자 — 컨테이너 944px 를 두 줄로 채운다. */}
        <h2
          id="statement-title"
          className="mt-4 max-w-[26ch] text-h1 text-balance break-keep md:text-h1-lg"
        >
          {instructor.coreCopy}
        </h2>
      </Reveal>
    </Section>
  );
}
