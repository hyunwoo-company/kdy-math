import type { Metadata } from "next";
import { AudienceLinks } from "@/components/sections/AudienceLinks";
import { CallToAction } from "@/components/sections/CallToAction";
import { CardsSection } from "@/components/sections/CardsSection";
import { CredentialsSection } from "@/components/sections/CredentialsSection";
import { Hero } from "@/components/sections/Hero";
import { ReviewPreview } from "@/components/sections/ReviewPreview";
import { Statement } from "@/components/sections/Statement";
import { career, education, home, methods, photos } from "@/content";

export const metadata: Metadata = {
  // 홈은 브랜드명을 뒤에 덧붙이지 않고 제목을 그대로 쓴다
  title: { absolute: home.meta.title },
  description: home.meta.description,
};

/** 지도 방식 카드 — 홈에서는 한 줄 요약만 보여준다 */
const methodCards = methods.map((method) => ({
  label: method.order,
  title: method.title,
  body: [method.summary],
}));

export default function HomePage() {
  return (
    // 배경 교차: 히어로(흰) → 선언(회색) → 지도 방식(흰) → 강사 소개(회색)
    // → 후기(흰) → 안내 선택(회색) → CTA(흰). 푸터는 흰 배경이지만 상단 보더로 구분된다.
    <>
      <Hero />
      <Statement />
      <CardsSection id="methods" header={home.methods} items={methodCards} />
      <CredentialsSection
        id="instructor"
        alt
        eyebrow={home.instructorSummary.eyebrow}
        title={home.instructorSummary.title}
        paragraphs={home.instructorSummary.paragraphs}
        educationLabel={home.instructorSummary.educationLabel}
        education={education}
        careerLabel={home.instructorSummary.careerLabel}
        career={career}
        photo={photos.about}
        moreLink={home.instructorSummary.moreLink}
      />
      <ReviewPreview id="reviews" />
      <AudienceLinks alt />
      <CallToAction cta={home.cta} />
    </>
  );
}
