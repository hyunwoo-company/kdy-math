import type { Metadata } from "next";
import { CallToAction } from "@/components/sections/CallToAction";
import { PageIntro } from "@/components/sections/PageIntro";
import { ReviewShots } from "@/components/sections/ReviewShots";
import { reviews } from "@/content";

export const metadata: Metadata = {
  title: reviews.meta.title,
  description: reviews.meta.description,
};

export default function ReviewsPage() {
  return (
    <>
      {/* 배경 교차: 인트로(흰) → 캡쳐(회색) → CTA(흰) */}
      <PageIntro intro={reviews.intro} />
      <ReviewShots id="shots" alt />
      <CallToAction cta={reviews.cta} />
    </>
  );
}
