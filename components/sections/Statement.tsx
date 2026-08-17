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
        <h2
          id="statement-title"
          className="mt-4 max-w-[22ch] text-h2 text-balance break-keep md:text-h2-lg"
        >
          {instructor.coreCopy}
        </h2>
      </Reveal>
    </Section>
  );
}
