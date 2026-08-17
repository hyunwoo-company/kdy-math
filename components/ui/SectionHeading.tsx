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
    // 폭 제한은 래퍼가 아니라 각 텍스트에 건다.
    // 래퍼에 걸면 ch 이 본문 17px 기준으로 계산돼(40ch = 404px) 40px 제목까지 같이 좁아져
    // 1024px 컨테이너의 우측 절반이 비어 보였다.
    <div className={className}>
      <p className="text-caption text-text-secondary break-keep">{eyebrow}</p>
      <h2
        id={id}
        className="mt-3 max-w-[28ch] text-h2 text-balance break-keep md:text-h2-lg"
      >
        {title}
      </h2>
      {lead ? (
        <p className="mt-4 max-w-[65ch] text-body-l text-text-secondary text-pretty break-keep md:text-body-l-lg">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
