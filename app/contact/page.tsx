import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";
import { PageIntro } from "@/components/sections/PageIntro";
import { contact } from "@/content";

export const metadata: Metadata = {
  title: contact.meta.title,
  description: contact.meta.description,
};

export default function ContactPage() {
  return (
    <>
      <PageIntro intro={contact.intro} />
      <ContactSection />
    </>
  );
}
