import type { Metadata } from "next";
import { CallToAction } from "@/components/sections/CallToAction";
import { PageIntro } from "@/components/sections/PageIntro";
import { ReviewQuotes } from "@/components/sections/ReviewQuotes";
import { ReviewShots } from "@/components/sections/ReviewShots";
import { reviews } from "@/content";

export const metadata: Metadata = {
  title: reviews.meta.title,
  description: reviews.meta.description,
};

export default function ReviewsPage() {
  return (
    <>
      {/* 배경 교차: 인트로(흰) → 인용(회색) → 캡쳐(흰) → CTA(회색) */}
      <PageIntro intro={reviews.intro} />
      <ReviewQuotes
        id="quotes"
        alt
        header={reviews.quotesHeader}
        quotes={reviews.quotes}
      />
      <ReviewShots id="shots" />
      <CallToAction cta={reviews.cta} alt />
    </>
  );
}
