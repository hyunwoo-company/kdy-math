"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  /** stagger용 지연(초). 0.08 배수로 쓴다. */
  delay?: number;
  className?: string;
  /**
   * 첫 화면(above the fold) 요소용.
   * true면 IntersectionObserver 없이 마운트 직후 바로 재생한다.
   * 히어로처럼 스크롤 없이 보여야 하는 영역에는 반드시 true.
   */
  immediate?: boolean;
};

/**
 * 진입 애니메이션 래퍼.
 *
 * 애니메이션 자체는 전부 CSS(`.reveal` / `.is-visible`, globals.css)가 담당한다.
 * 이 컴포넌트는 클래스 토글만 하며 **인라인 style로 opacity/transform을 쓰지 않는다.**
 * (SSR HTML에 초기 숨김 스타일이 남으면 JS 실패 시 콘텐츠가 사라진다.)
 */
export function Reveal({
  children,
  delay = 0,
  className,
  immediate = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // 하이드레이션 성공 표식. layout.tsx의 워치독이 이 표식을 보고
  // data-js 유지 여부를 결정한다(없으면 제거 → CSS 폴백으로 콘텐츠 노출).
  useEffect(() => {
    document.documentElement.setAttribute("data-hydrated", "");
  }, []);

  useEffect(() => {
    const el = ref.current;
    const supportsObserver = typeof IntersectionObserver !== "undefined";

    // 첫 화면 요소이거나 IntersectionObserver를 못 쓰는 환경이면 즉시 재생한다.
    // (미지원 브라우저에서 콘텐츠를 숨긴 채 방치하지 않는다)
    if (immediate || !supportsObserver || !el) {
      // 같은 프레임에 켜면 transition이 생략된다 → 다음 프레임에서 켠다.
      // 백그라운드 탭은 rAF가 멈추므로 타이머로 한 번 더 보장한다.
      const frame = requestAnimationFrame(() => setVisible(true));
      const timer = window.setTimeout(() => setVisible(true), 100);
      return () => {
        cancelAnimationFrame(frame);
        clearTimeout(timer);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate]);

  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={
        delay
          ? ({ "--reveal-delay": `${delay}s` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
}
