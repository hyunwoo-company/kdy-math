import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { home, instructor, photos } from "@/content";

/** 홈 히어로 — 슬로건 + 상담 CTA + 가로 사진 (첫 화면이므로 Reveal 은 전부 immediate) */
export function Hero() {
  return (
    <section id="top" className="bg-bg pt-20 pb-20 md:pt-40 md:pb-30">
      <div className="mx-auto w-full max-w-content px-6 text-center md:px-10">
        <Reveal immediate>
          <p className="text-caption text-text-secondary break-keep">
            {home.hero.eyebrow}
          </p>
          <h1 className="mx-auto mt-4 max-w-[20ch] text-display text-balance break-keep md:text-display-lg">
            {instructor.slogan.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
        </Reveal>

        <Reveal immediate delay={0.08}>
          <p className="mx-auto mt-6 max-w-[60ch] text-body-l text-text-secondary text-pretty break-keep md:text-body-l-lg">
            {home.hero.lead}
          </p>
        </Reveal>

        <Reveal
          immediate
          delay={0.16}
          className="mt-8 flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-4"
        >
          <Button href={home.hero.primaryCta.href} variant="primary">
            {home.hero.primaryCta.label}
          </Button>
          <Button href={home.hero.secondaryCta.href} variant="secondary">
            {home.hero.secondaryCta.label}
          </Button>
        </Reveal>
      </div>

      <Reveal immediate delay={0.24} className="mt-16 md:mt-20">
        {/* 가로 사진이라 컨테이너 전체 폭으로 두면 세로 높이가 첫 화면을 덮는다.
            폭을 640px 로 제한해 높이를 427px 로 낮춘다(1600x1067 원본 비율 유지). */}
        <div className="mx-auto w-full max-w-content px-6 md:px-10">
          <Image
            src={photos.hero.src}
            alt={photos.hero.alt}
            width={photos.hero.width}
            height={photos.hero.height}
            priority
            sizes="(min-width: 688px) 640px, calc(100vw - 48px)"
            className="mx-auto h-auto w-full max-w-[640px] rounded-container"
          />
        </div>
      </Reveal>
    </section>
  );
}
