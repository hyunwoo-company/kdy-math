import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";
import { PageIntro } from "@/components/sections/PageIntro";
import { SiteQrSection } from "@/components/sections/SiteQrSection";
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
      {/* QR 은 보조 수단이므로 전화·이메일 연락 방법보다 반드시 아래에 둔다 */}
      <SiteQrSection />
    </>
  );
}
