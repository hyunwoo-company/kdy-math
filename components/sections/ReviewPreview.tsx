import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { reviews } from "@/content";
import { cn } from "@/lib/utils";

const { header, collage, moreLink } = reviews.homeSection;

type ReviewPreviewProps = {
  /** 섹션 id — 앵커 링크와 제목 id 에 함께 쓰인다 */
  id: string;
  /** true 면 `#f5f5f7` 배경 섹션 */
  alt?: boolean;
};

/**
 * 홈의 후기 섹션 — 캡쳐를 한 장으로 모은 이미지를 보여주고 /reviews 로 보낸다.
 *
 * 이미지 전체가 링크다. 접근성 이름은 이미지의 alt 가 담당하고,
 * hover 로 뜨거나 커지는 효과(scale·translate·shadow)는 쓰지 않는다(카드 규격).
 */
export function ReviewPreview({ id, alt = false }: ReviewPreviewProps) {
  const titleId = `${id}-title`;
  const linkClass = cn(
    // 원본이 891px 이라 720px 를 넘겨 늘리면 흐려진다
    "block w-full max-w-[720px] overflow-hidden rounded-container",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
    "focus-visible:ring-offset-2",
    alt ? "focus-visible:ring-offset-bg-alt" : "focus-visible:ring-offset-bg",
  );

  return (
    <Section id={id} labelledBy={titleId} alt={alt}>
      <Reveal>
        <SectionHeading id={titleId} {...header} />
      </Reveal>

      <Reveal delay={0.08} className="mt-16">
        <Link href={moreLink.href} className={linkClass}>
          <Image
            src={collage.src}
            alt={collage.alt}
            width={collage.width}
            height={collage.height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full"
          />
        </Link>
      </Reveal>

      <Reveal delay={0.16} className="mt-12">
        <Button
          href={moreLink.href}
          variant="text"
          className={alt ? "focus-visible:ring-offset-bg-alt" : undefined}
        >
          {moreLink.label}
          <ChevronRight className="size-4 shrink-0" strokeWidth={2} aria-hidden />
        </Button>
      </Reveal>
    </Section>
  );
}
