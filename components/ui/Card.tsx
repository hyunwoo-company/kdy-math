import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLElement> & {
  /**
   * 카드 배경.
   * - `alt`  : `#f5f5f7` — 흰 섹션(`bg-bg`) 위에 놓을 때
   * - `base` : `#ffffff` — 회색 섹션(`bg-bg-alt`) 위에 놓을 때
   */
  surface?: "alt" | "base";
};

export function Card({ surface = "alt", className, ...props }: CardProps) {
  return (
    <article
      {...props}
      className={cn(
        "rounded-card p-8",
        surface === "alt" ? "bg-bg-alt" : "bg-bg",
        className,
      )}
    />
  );
}
