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
        {/* 2열 분할은 lg(1024px)부터. md(768px)에서 나누면 텍스트 열이 264px 로 좁아진다. */}
        <div
          className={cn(
            "grid items-center gap-12 lg:gap-16",
            photo && "lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)]",
          )}
        >
          <div>
            <Reveal immediate>
              <p className="text-caption text-text-secondary break-keep">
                {intro.eyebrow}
              </p>
              {/* 페이지 최상단 제목이므로 데스크톱에서 Display(64px) — 페이지당 1회 */}
              <h1 className="mt-4 max-w-[24ch] text-h1 text-balance break-keep md:text-display">
                {intro.title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>
            </Reveal>

            <Reveal immediate delay={0.08}>
              <p className="mt-6 max-w-[65ch] text-body-l text-text-secondary text-pretty break-keep md:text-body-l-lg">
                {intro.lead}
              </p>
            </Reveal>
          </div>

          {photo ? (
            <Reveal immediate delay={0.16}>
              {/* 세로 사진(1067x1600). 폭을 360px 로 제한하지 않으면 1열로 쌓일 때 높이가 1000px 을 넘는다 */}
              <div className="relative aspect-[2/3] w-full max-w-[360px] overflow-hidden rounded-container bg-bg-alt">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  priority
                  sizes="(min-width: 408px) 360px, calc(100vw - 48px)"
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
