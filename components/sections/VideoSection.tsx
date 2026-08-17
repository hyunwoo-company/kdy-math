import { Clapperboard } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";
import { videos, videosPage } from "@/content";

/**
 * 수업 영상 목록.
 * content/videos.ts 의 videos 배열이 비어 있으면 준비 중 안내를,
 * 한 편 이상 있으면 임베드 그리드를 렌더한다.
 */
export function VideoSection() {
  const isEmpty = videos.length === 0;

  return (
    <Section id="videos" labelledBy="videos-title" alt>
      {isEmpty ? (
        <Reveal>
          <div className="rounded-container bg-bg p-8">
            <Clapperboard
              className="size-6 text-text-secondary"
              strokeWidth={1.5}
              aria-hidden
            />
            <h2
              id="videos-title"
              className="mt-6 max-w-[24ch] text-h2 text-balance break-keep md:text-h2-lg"
            >
              {videosPage.emptyState.title}
            </h2>
            {videosPage.emptyState.body.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 max-w-[65ch] text-body-l text-text-secondary text-pretty break-keep md:text-body-l-lg"
              >
                {paragraph}
              </p>
            ))}
            <div className="mt-8">
              <Button href={videosPage.emptyState.cta.href} variant="primary">
                {videosPage.emptyState.cta.label}
              </Button>
            </div>
          </div>
        </Reveal>
      ) : (
        <>
          <Reveal>
            <h2
              id="videos-title"
              className="text-h2 text-balance break-keep md:text-h2-lg"
            >
              {videosPage.listTitle}
            </h2>
            {videosPage.listNote ? (
              <p className="mt-4 max-w-[65ch] text-body text-text-secondary break-keep">
                {videosPage.listNote}
              </p>
            ) : null}
          </Reveal>

          <Reveal delay={0.08} className="mt-16">
            <ul className="grid gap-6 md:grid-cols-2 md:gap-8">
              {videos.map((video) => (
                <li
                  key={video.youtubeId}
                  className="overflow-hidden rounded-container bg-bg"
                >
                  <YouTubeEmbed
                    youtubeId={video.youtubeId}
                    title={video.title}
                  />
                  <div className="p-8">
                    <h3 className="text-h3 break-keep md:text-h3-lg">
                      {video.title}
                    </h3>
                    <p className="mt-3 text-body text-text-secondary break-keep">
                      {video.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </>
      )}
    </Section>
  );
}
