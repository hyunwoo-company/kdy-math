import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type ProseSectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  /** 각 항목이 한 문단으로 표시된다 */
  paragraphs: string[];
  alt?: boolean;
};

/** 문단 위주 섹션 — 지도 철학처럼 읽는 글에 쓴다 */
export function ProseSection({
  id,
  eyebrow,
  title,
  paragraphs,
  alt = false,
}: ProseSectionProps) {
  const titleId = `${id}-title`;

  return (
    <Section id={id} labelledBy={titleId} alt={alt}>
      <Reveal>
        <SectionHeading id={titleId} eyebrow={eyebrow} title={title} />
      </Reveal>

      <Reveal delay={0.08} className="mt-12">
        <div className="max-w-[65ch]">
          {paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={
                index === 0
                  ? "text-body-l text-pretty break-keep md:text-body-l-lg"
                  : "mt-6 text-body-l text-text-secondary text-pretty break-keep md:text-body-l-lg"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
