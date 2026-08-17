import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "text";

/** pill 버튼 공통 — 높이 44px, radius 980px, 17px/400 */
const pillBase =
  "inline-flex h-11 items-center justify-center gap-2 rounded-pill px-6 " +
  "text-[17px] font-normal tracking-[-0.01em] break-keep " +
  "transition-colors duration-200 ease-apple " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-bg " +
  "disabled:cursor-not-allowed disabled:opacity-40 " +
  "aria-disabled:pointer-events-none aria-disabled:opacity-40";

/** 인라인 텍스트 링크 — focus 링만 12px */
const textBase =
  "inline-flex items-center gap-1 " +
  "text-[17px] font-normal tracking-[-0.01em] break-keep " +
  "transition-colors duration-200 ease-apple " +
  "hover:underline hover:underline-offset-4 " +
  "focus-visible:outline-none focus-visible:rounded-sm-el focus-visible:ring-2 " +
  "focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg " +
  "disabled:cursor-not-allowed disabled:opacity-40 " +
  "aria-disabled:pointer-events-none aria-disabled:opacity-40";

const styles: Record<Variant, string> = {
  primary: `${pillBase} bg-accent text-white hover:bg-accent-hover`,
  secondary: `${pillBase} border border-border bg-transparent text-text hover:bg-bg-alt`,
  text: `${textBase} text-accent hover:text-accent-hover`,
};

type CommonProps = {
  variant?: Variant;
  className?: string;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsAnchor = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/** 사이트 내부 이동인가 (내부는 next/link, tel:·mailto:·외부 주소는 <a>) */
const isInternal = (href: string) => href.startsWith("/") || href.startsWith("#");

export function Button(props: ButtonAsButton | ButtonAsAnchor) {
  if (props.href !== undefined) {
    const { variant = "primary", className, href, ...rest } = props;
    const classes = cn(styles[variant], className);

    if (isInternal(href)) {
      return <Link {...rest} href={href} className={classes} />;
    }
    return <a {...rest} href={href} className={classes} />;
  }

  const { variant = "primary", className, type = "button", ...rest } = props;
  return <button {...rest} type={type} className={cn(styles[variant], className)} />;
}
