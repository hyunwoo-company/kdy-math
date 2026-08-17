import type { Metadata } from "next";
import { CallToAction } from "@/components/sections/CallToAction";
import { CardsSection } from "@/components/sections/CardsSection";
import { CredentialsSection } from "@/components/sections/CredentialsSection";
import { PageIntro } from "@/components/sections/PageIntro";
import { ProseSection } from "@/components/sections/ProseSection";
import {
  career,
  education,
  methods,
  parents,
  philosophy,
  photos,
} from "@/content";

export const metadata: Metadata = {
  title: parents.meta.title,
  description: parents.meta.description,
};

/**
 * parents.focus.methodIds 에 적힌 순서대로 지도 방식 카드를 가져온다.
 * 3가지 중 2가지만 보여주므로 번호(order)는 붙이지 않는다(01, 03 처럼 건너뛰어 보인다).
 */
const focusCards = parents.focus.methodIds.flatMap((id) => {
  const method = methods.find((item) => item.id === id);
  return method ? [{ title: method.title, body: method.body }] : [];
});

export default function ParentsPage() {
  return (
    <>
      <PageIntro intro={parents.intro} photo={photos.teaching} />
      <ProseSection
        id="philosophy"
        alt
        eyebrow={philosophy.eyebrow}
        title={philosophy.title}
        paragraphs={philosophy.paragraphs}
      />
      <CardsSection
        id="focus"
        header={parents.focus.header}
        items={focusCards}
        columns={2}
      />
      <CredentialsSection
        id="instructor"
        alt
        eyebrow={parents.credentials.eyebrow}
        title={parents.credentials.title}
        educationLabel={parents.credentials.educationLabel}
        education={education}
        careerLabel={parents.credentials.careerLabel}
        career={career}
        note={parents.credentials.note}
      />
      <CardsSection
        id="roadmap"
        header={parents.roadmap.header}
        items={parents.roadmap.items}
      />
      <CallToAction cta={parents.cta} alt />
    </>
  );
}
