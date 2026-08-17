import type { Metadata } from "next";
import { CallToAction } from "@/components/sections/CallToAction";
import { CardsSection } from "@/components/sections/CardsSection";
import { CheckListSection } from "@/components/sections/CheckListSection";
import { PageIntro } from "@/components/sections/PageIntro";
import { students } from "@/content";

export const metadata: Metadata = {
  title: students.meta.title,
  description: students.meta.description,
};

export default function StudentsPage() {
  return (
    <>
      <PageIntro intro={students.intro} />
      <CheckListSection
        id="struggle"
        alt
        header={students.struggle.header}
        items={students.struggle.items}
        note={students.struggle.note}
      />
      <CardsSection
        id="cycle"
        header={students.cycle.header}
        items={students.cycle.steps}
        columns={2}
        ordered
      />
      <CardsSection
        id="how"
        alt
        header={students.how.header}
        items={students.how.items}
      />
      <CallToAction cta={students.cta} />
    </>
  );
}
