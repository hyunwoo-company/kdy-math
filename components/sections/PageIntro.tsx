import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import type { Intro, Photo } from "@/content";
import { cn } from "@/lib/utils";

type PageIntroProps = {
  intro: Intro;
  /** 함께 보여줄 세로 사진. 없으면 텍스트만 좌측정렬로 표시한다 */
  photo?: Photo;
};

/** 홈이 아닌 탭의 첫 화면. 첫 화면이므로 Reveal 은 immediate. */
export function PageIntro({ intro, photo }: PageIntroProps) {
  return (
    <section id="top" className="bg-bg py-20 md:py-40">
      <div className="mx-auto w-full max-w-content px-6 md:px-10">
        <div
          className={cn(
            "grid items-center gap-12 md:gap-16",
            photo && "md:grid-cols-[minmax(0,1fr)_minmax(0,360px)]",
          )}
        >
          <div>
            <Reveal immediate>
              <p className="text-caption text-text-secondary break-keep">
                {intro.eyebrow}
              </p>
              <h1 className="mt-4 max-w-[22ch] text-h1 text-balance break-keep md:text-h1-lg">
                {intro.title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>
            </Reveal>

            <Reveal immediate delay={0.08}>
              <p className="mt-6 max-w-[60ch] text-body-l text-text-secondary text-pretty break-keep md:text-body-l-lg">
                {intro.lead}
              </p>
            </Reveal>
          </div>

          {photo ? (
            <Reveal immediate delay={0.16}>
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-container bg-bg-alt">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  priority
                  sizes="(min-width: 768px) 360px, calc(100vw - 48px)"
                  className="object-cover"
                />
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
