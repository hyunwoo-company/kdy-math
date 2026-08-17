import type { Metadata } from "next";
// Pretendard 는 next/font/local 이 아니라 pretendard.css 의 @font-face 92개로 로드한다.
// unicode-range 로 분할돼 있어 브라우저가 실제 쓰인 글자 범위만 내려받는다.
// (단일 가변 폰트 파일은 2MB 를 무조건 전송해서 첫 로딩이 느렸다.)
import "./pretendard.css";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/sections/Footer";
import { seo, titleTemplate } from "@/content";

export const metadata: Metadata = {
  title: {
    default: seo.title,
    template: titleTemplate,
  },
  description: seo.description,
};

/**
 * 진입 애니메이션 스위치.
 * globals.css의 `.reveal` 초기 숨김 규칙은 `html[data-js]` 안에만 존재한다.
 * - JS가 살아 있으면 `data-js`를 붙여 숨김 규칙을 켠다.
 *   (<body> 최상단에서 동기 실행되므로 콘텐츠가 그려지기 전에 적용된다 → 깜빡임 없음)
 * - JS가 꺼져 있거나 스크립트가 차단되면 이 코드가 실행되지 않아 콘텐츠가 그냥 보인다.
 * - 스크립트는 돌았지만 번들 로드/하이드레이션이 실패한 경우를 위해 5초 워치독을 둔다.
 *   (`data-hydrated`는 Reveal의 useEffect가 붙인다)
 */
const jsFlagScript =
  "var d=document.documentElement;d.setAttribute('data-js','');" +
  "setTimeout(function(){if(!d.hasAttribute('data-hydrated'))d.removeAttribute('data-js')},5000)";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning: 위 인라인 스크립트가 <html>에 data-js를 붙이므로
    // 서버 HTML과 클라이언트 속성이 반드시 불일치한다. 이를 억제하지 않으면
    // React가 하이드레이션 미스매치를 보고하고 진입 애니메이션이 깨진다.
    <html lang="ko" suppressHydrationWarning>
      <body className="bg-bg text-text font-sans antialiased">
        <script dangerouslySetInnerHTML={{ __html: jsFlagScript }} />
        <Nav />
        <main className="pt-12">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
