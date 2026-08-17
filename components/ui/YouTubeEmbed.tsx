import { cn } from "@/lib/utils";

type YouTubeEmbedProps = {
  /** 유튜브 영상 ID (전체 주소가 아니라 v= 뒤의 문자열) */
  youtubeId: string;
  /** iframe 의 접근성 제목 — 영상 제목을 그대로 넘긴다 */
  title: string;
  className?: string;
};

/**
 * 유튜브 임베드 (16:9).
 * content/videos.ts 의 videos 배열이 비어 있으면 이 컴포넌트는 렌더되지 않는다.
 */
export function YouTubeEmbed({
  youtubeId,
  title,
  className,
}: YouTubeEmbedProps) {
  return (
    <div className={cn("relative aspect-video w-full bg-bg-alt", className)}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`}
        title={title}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 size-full border-0"
      />
    </div>
  );
}
