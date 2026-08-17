import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** 제목 요소의 id — Section 의 labelledBy 와 같은 값을 넘긴다 */
  id: string;
  /** 제목 위 작은 라벨 */
  eyebrow: string;
  title: string;
  /** 제목 아래 설명. 없으면 렌더하지 않는다 */
  lead?: string;
  className?: string;
};

/** 섹션 머리말 — 라벨 / 제목(H2) / 설명 3단 구성 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-[40ch]", className)}>
      <p className="text-caption text-text-secondary break-keep">{eyebrow}</p>
      <h2 id={id} className="mt-3 text-h2 text-balance break-keep md:text-h2-lg">
        {title}
      </h2>
      {lead ? (
        <p className="mt-4 max-w-[65ch] text-body text-text-secondary text-pretty break-keep">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
