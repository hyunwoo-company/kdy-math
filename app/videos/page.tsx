import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/PageIntro";
import { VideoSection } from "@/components/sections/VideoSection";
import { videosPage } from "@/content";

export const metadata: Metadata = {
  title: videosPage.meta.title,
  description: videosPage.meta.description,
};

export default function VideosPage() {
  return (
    <>
      <PageIntro intro={videosPage.intro} />
      <VideoSection />
    </>
  );
}
