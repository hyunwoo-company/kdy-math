import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Cta, ReviewQuote, SectionHeader } from "@/content";
import { cn } from "@/lib/utils";

type ReviewQuotesProps = {
  /** 섹션 id — 앵커 링크와 제목 id 에 함께 쓰인다 */
  id: string;
  header: SectionHeader;
  quotes: readonly ReviewQuote[];
  /** true 면 `#f5f5f7` 배경 섹션 + 흰 카드 */
  alt?: boolean;
  /** 데스크톱 열 수 */
  columns?: 2 | 3;
  /** 카드 그리드 아래 텍스트 링크. 홈 요약에서 "후기 더 보기" 로 쓴다 */
  footerLink?: Cta;
};

/** 후기 인용 카드 섹션 — 홈 요약(3개)과 /reviews 전체 목록에 공용으로 쓴다 */
export function ReviewQuotes({
  id,
  header,
  quotes,
  alt = false,
  columns = 3,
  footerLink,
}: ReviewQuotesProps) {
  const titleId = `${id}-title`;
  const gridClass = cn(
    "grid gap-6 md:gap-8",
    columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3",
  );
  // 회색 섹션 위에는 흰 카드, 흰 섹션 위에는 회색 카드 (같은 색이면 카드 형태가 사라진다)
  const surface = alt ? "base" : "alt";

  return (
    <Section id={id} labelledBy={titleId} alt={alt}>
      <Reveal>
        <SectionHeading id={titleId} {...header} />
      </Reveal>

      <Reveal delay={0.08} className="mt-16">
        <ul className={gridClass}>
          {/* 같은 문구가 다시 들어올 수 있으므로 quote 문자열을 key 로 쓰지 않는다 */}
          {quotes.map((item, index) => (
            <li key={`${item.label}-${index}`} className="h-full">
              {/* li 가 grid item 이라 행 높이만큼 늘어난다. 카드도 그만큼 채워
                  같은 행 카드의 아래쪽 선이 맞는다 (h-full 이 없으면 들쭉날쭉해진다) */}
              <Card surface={surface} className="h-full">
                <p className="text-caption text-text-secondary break-keep">
                  {item.label}
                </p>
                <blockquote className="mt-4 max-w-[65ch] text-body-l break-keep md:text-body-l-lg">
                  {item.quote}
                </blockquote>
                <cite className="mt-6 block text-caption not-italic text-text-secondary break-keep">
                  — {item.from}
                </cite>
              </Card>
            </li>
          ))}
        </ul>
      </Reveal>

      {footerLink ? (
        <Reveal delay={0.16} className="mt-12">
          <Button
            href={footerLink.href}
            variant="text"
            className={alt ? "focus-visible:ring-offset-bg-alt" : undefined}
          >
            {footerLink.label}
            <ChevronRight
              className="size-4 shrink-0"
              strokeWidth={2}
              aria-hidden
            />
          </Button>
        </Reveal>
      ) : null}
    </Section>
  );
}
