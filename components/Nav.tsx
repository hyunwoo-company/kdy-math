"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { a11y, nav, site } from "@/content";
import { cn } from "@/lib/utils";

const linkFocus =
  "focus-visible:outline-none focus-visible:rounded-sm-el focus-visible:ring-2 " +
  "focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

/** 현재 보고 있는 탭인지 판정 */
function isCurrent(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  /**
   * 모바일 메뉴가 열린 경로를 담는다.
   * 라우트가 바뀌면 openPath !== pathname 이 되어 메뉴가 자동으로 닫힌다.
   * (이펙트에서 setState 하지 않으므로 렌더 중 파생값만으로 처리된다)
   */
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;

  // 스크롤이 시작되면 글래스 배경을 켠다 (최상단에서는 투명)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 오버레이가 열린 동안 배경 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ESC로 닫기
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenPath(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const glass = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50",
        "backdrop-blur-[20px] backdrop-saturate-[180%]",
        "border-b-[0.5px] transition-colors duration-200 ease-apple",
        glass
          ? "border-border bg-[rgba(255,255,255,0.72)] dark:bg-[rgba(0,0,0,0.72)]"
          : "border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label={a11y.navLabel}
        className="mx-auto flex h-12 max-w-content items-center justify-between px-6 md:px-10"
      >
        <Link
          href="/"
          onClick={() => setOpenPath(null)}
          className={cn(
            "text-[17px] font-semibold tracking-[-0.01em] text-text break-keep",
            "transition-colors duration-200 ease-apple hover:text-text-secondary",
            linkFocus,
          )}
        >
          {site.brand}
        </Link>

        {/* 데스크톱 링크 — 현재 탭은 진한 텍스트, 나머지는 보조 텍스트 색 */}
        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((item) => {
            const current = isCurrent(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "text-[14px] font-normal break-keep",
                    "transition-colors duration-200 ease-apple hover:text-text",
                    current ? "text-text" : "text-text-secondary",
                    linkFocus,
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* 모바일 햄버거 — 44px 터치 타깃 */}
        <button
          type="button"
          onClick={() => setOpenPath(open ? null : pathname)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? a11y.menuClose : a11y.menuOpen}
          className={cn(
            "-mr-2 flex size-11 items-center justify-center rounded-sm-el text-text md:hidden",
            "transition-colors duration-200 ease-apple",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
            "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
          )}
        >
          {open ? (
            <X className="size-5" strokeWidth={1.5} aria-hidden />
          ) : (
            <Menu className="size-5" strokeWidth={1.5} aria-hidden />
          )}
        </button>
      </nav>

      {/* 모바일 풀스크린 오버레이 */}
      <div
        id="mobile-menu"
        hidden={!open}
        className={cn(
          "fixed inset-x-0 top-12 bottom-0 z-40 md:hidden",
          "bg-[rgba(255,255,255,0.72)] dark:bg-[rgba(0,0,0,0.72)]",
          "backdrop-blur-[20px] backdrop-saturate-[180%]",
        )}
      >
        <ul className="flex flex-col px-6 pt-4">
          {nav.map((item) => {
            const current = isCurrent(pathname, item.href);
            return (
              <li key={item.href} className="border-b-[0.5px] border-border">
                <Link
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  onClick={() => setOpenPath(null)}
                  className={cn(
                    "flex h-14 items-center text-[21px] font-normal tracking-[-0.01em] break-keep",
                    "transition-colors duration-200 ease-apple hover:text-text",
                    current ? "text-text" : "text-text-secondary",
                    linkFocus,
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
