import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SectionHeader } from "@/content";

type CheckListSectionProps = {
  id: string;
  header: SectionHeader;
  /** 한 줄씩 표시되는 문장 목록 */
  items: string[];
  /** 목록 아래 한 줄. 없으면 렌더하지 않는다 */
  note?: string;
  alt?: boolean;
};

/** 한 줄 문장을 hairline 구분선으로 나열하는 섹션 */
export function CheckListSection({
  id,
  header,
  items,
  note,
  alt = false,
}: CheckListSectionProps) {
  const titleId = `${id}-title`;

  return (
    <Section id={id} labelledBy={titleId} alt={alt}>
      <Reveal>
        <SectionHeading id={titleId} {...header} />
      </Reveal>

      <Reveal delay={0.08} className="mt-16">
        <ul className="max-w-[65ch] border-t border-border">
          {items.map((item) => (
            <li
              key={item}
              className="border-b border-border py-6 text-body-l break-keep md:text-body-l-lg"
            >
              {item}
            </li>
          ))}
        </ul>
        {note ? (
          <p className="mt-8 max-w-[65ch] text-body text-text-secondary break-keep">
            {note}
          </p>
        ) : null}
      </Reveal>
    </Section>
  );
}
