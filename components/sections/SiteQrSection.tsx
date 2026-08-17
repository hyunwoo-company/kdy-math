import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { contact } from "@/content";

/**
 * 사이트 주소 QR — 상담 문의 페이지 맨 아래.
 *
 * 주된 행동은 전화·이메일 연락이므로 QR 은 "연락 방법"·"상담 안내" 뒤에 둔다.
 * 문구·경로·alt 는 전부 content/contact.ts 의 `qr` 에서 가져온다.
 *
 * next/image + `.svg` 에 대해:
 *   기본 로더는 `images.dangerouslyAllowSVG` 없이 SVG 를 최적화 API 로 보내지 않고
 *   원본을 그대로 내보낸다(= unoptimized 강제).
 *   근거: node_modules/next/dist/shared/lib/get-img-props.js
 *         `if (isDefaultLoader && !config.dangerouslyAllowSVG && src...endsWith('.svg')) unoptimized = true`
 *   그래서 `unoptimized` 를 명시해 의도를 코드에 드러낸다(설정을 바꿔도 동작이 안 바뀌게).
 *   같은 이유로 srcset 이 생성되지 않아 `sizes` 는 최종 HTML 에서 빠지지만,
 *   표시 폭(모바일 160px / 데스크톱 176px)을 선언해 두는 값으로 함께 남긴다.
 */
export function SiteQrSection() {
  const { qr } = contact;

  return (
    <Section id="site-qr" labelledBy="site-qr-title" alt>
      <Reveal>
        <h2
          id="site-qr-title"
          className="text-h2 text-balance break-keep md:text-h2-lg"
        >
          {qr.title}
        </h2>
        <p className="mt-4 max-w-[65ch] text-body text-text-secondary break-keep">
          {qr.description}
        </p>
      </Reveal>

      <Reveal delay={0.08} className="mt-16">
        {/* QR 은 "밝은 바탕 + 어두운 패턴" 이라야 인식된다.
            bg-bg 는 다크모드에서 #000000 이 되어 QR 이 묻히므로,
            모드와 무관하게 #ffffff 로 고정된 surface-light 토큰을 쓴다. */}
        <div className="w-fit rounded-container bg-surface-light p-8">
          <Image
            src={qr.image.src}
            alt={qr.image.alt}
            width={qr.image.width}
            height={qr.image.height}
            unoptimized
            sizes="(min-width: 768px) 176px, 160px"
            className="size-40 md:size-44"
          />
        </div>
        {/* 스캔이 어려운 분이 직접 입력할 수 있도록 주소를 함께 적는다.
            (흰 카드 밖이므로 다크모드에서도 보조 텍스트 대비가 유지된다) */}
        <p className="mt-4 text-caption text-text-secondary">{qr.url}</p>
      </Reveal>
    </Section>
  );
}
