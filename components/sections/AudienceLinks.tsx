import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { home } from "@/content";
import { cn } from "@/lib/utils";

const cardLinkBase =
  "block rounded-card p-8 transition-colors duration-200 ease-apple " +
  "hover:bg-bg-alt-hover focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-accent focus-visible:ring-offset-2";

type AudienceLinksProps = {
  /** true 면 `#f5f5f7` 배경 섹션 + 흰 카드 */
  alt?: boolean;
};

/** 홈 → 학생용 / 학부모용 안내로 보내는 링크 카드 */
export function AudienceLinks({ alt = false }: AudienceLinksProps) {
  // 회색 섹션 위에는 흰 카드, 흰 섹션 위에는 회색 카드
  const cardLink = cn(
    cardLinkBase,
    alt
      ? "bg-bg focus-visible:ring-offset-bg-alt"
      : "bg-bg-alt focus-visible:ring-offset-bg",
  );

  return (
    <Section id="audience" labelledBy="audience-title" alt={alt}>
      {/* 머리말은 화면에 두지 않는다 — 카드 제목("학생용 안내"/"학부모용 안내")만으로
          뜻이 통한다. 다만 Section 의 aria-labelledby 가 가리킬 제목은 있어야 하므로
          스크린리더 전용으로 남긴다. */}
      <h2 id="audience-title" className="sr-only">
        {home.audience.srTitle}
      </h2>

      <Reveal>
        <ul className="grid gap-6 md:grid-cols-2 md:gap-8">
          {home.audience.cards.map((card) => (
            <li key={card.href}>
              <Link href={card.href} className={cardLink}>
                <h3 className="text-h3 break-keep md:text-h3-lg">
                  {card.title}
                </h3>
                <p className="mt-3 text-body text-text-secondary break-keep">
                  {card.body}
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-body text-accent break-keep">
                  {card.linkLabel}
                  <ChevronRight
                    className="size-4 shrink-0"
                    strokeWidth={2}
                    aria-hidden
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
