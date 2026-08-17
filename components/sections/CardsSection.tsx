import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { CardItem, SectionHeader } from "@/content";
import { cn } from "@/lib/utils";

type CardsSectionProps = {
  /** 섹션 id — 앵커 링크와 제목 id 에 함께 쓰인다 */
  id: string;
  header: SectionHeader;
  items: CardItem[];
  /** true 면 `#f5f5f7` 배경 섹션 + 흰 카드 */
  alt?: boolean;
  /** 데스크톱 열 수 */
  columns?: 2 | 3;
  /** true 면 순서 있는 목록(ol)으로 렌더하고 번호를 자동으로 붙인다 */
  ordered?: boolean;
};

/** 카드 그리드 섹션 — 지도 방식, 수업에서 하는 일, 성장 로드맵, 선순환 단계에 공용으로 쓴다 */
export function CardsSection({
  id,
  header,
  items,
  alt = false,
  columns = 3,
  ordered = false,
}: CardsSectionProps) {
  const titleId = `${id}-title`;
  const gridClass = cn(
    "grid gap-6 md:gap-8",
    columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3",
  );
  const surface = alt ? "base" : "alt";

  const cards = items.map((item, index) => {
    const label = ordered ? String(index + 1).padStart(2, "0") : item.label;

    return (
      <Card key={item.title} surface={surface}>
        {label ? (
          <p className="text-caption text-text-secondary break-keep">{label}</p>
        ) : null}
        <h3
          className={cn(
            "text-h3 break-keep md:text-h3-lg",
            label ? "mt-4" : undefined,
          )}
        >
          {item.title}
        </h3>
        {item.body.map((paragraph) => (
          <p
            key={paragraph}
            className="mt-3 text-body text-text-secondary break-keep"
          >
            {paragraph}
          </p>
        ))}
      </Card>
    );
  });

  return (
    <Section id={id} labelledBy={titleId} alt={alt}>
      <Reveal>
        <SectionHeading id={titleId} {...header} />
      </Reveal>

      <Reveal delay={0.08} className="mt-16">
        {ordered ? (
          <ol className={gridClass}>
            {cards.map((card, index) => (
              <li key={items[index].title}>{card}</li>
            ))}
          </ol>
        ) : (
          <div className={gridClass}>{cards}</div>
        )}
      </Reveal>
    </Section>
  );
}
