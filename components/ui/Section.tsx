import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  /** 제목 요소의 id — `aria-labelledby` 연결용 */
  labelledBy?: string;
  /** true면 `#f5f5f7`(다크 `#1d1d1f`) 대체 배경 */
  alt?: boolean;
  /** 컨테이너 폭 1440px (기본 1024px) */
  wide?: boolean;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
};

export function Section({
  id,
  labelledBy,
  alt = false,
  wide = false,
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("py-20 md:py-30", alt ? "bg-bg-alt" : "bg-bg", className)}
    >
      <div
        className={cn(
          "mx-auto w-full px-6 md:px-10",
          wide ? "max-w-wide" : "max-w-content",
          containerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
