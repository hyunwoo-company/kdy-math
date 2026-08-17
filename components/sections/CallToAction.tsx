import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import type { CtaBlock } from "@/content";

type CallToActionProps = {
  cta: CtaBlock;
  alt?: boolean;
};

/** 페이지 맨 아래 상담 유도 블록 */
export function CallToAction({ cta, alt = false }: CallToActionProps) {
  return (
    <Section id="cta" labelledBy="cta-title" alt={alt}>
      <Reveal>
        <h2
          id="cta-title"
          className="max-w-[24ch] text-h2 text-balance break-keep md:text-h2-lg"
        >
          {cta.title}
        </h2>
        <p className="mt-4 max-w-[65ch] text-body-l text-text-secondary text-pretty break-keep md:text-body-l-lg">
          {cta.body}
        </p>
        <div className="mt-8">
          <Button href={cta.primaryCta.href} variant="primary">
            {cta.primaryCta.label}
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
