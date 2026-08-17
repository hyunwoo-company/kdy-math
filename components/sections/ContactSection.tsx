import { Mail, MessageCircle, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { contact } from "@/content";
import type { ContactChannel } from "@/content";
import { cn } from "@/lib/utils";

/** 연락 수단별 아이콘 (텍스트가 아니므로 content 가 아니라 여기서 고른다) */
const channelIcons: Record<ContactChannel["id"], LucideIcon> = {
  phone: Phone,
  email: Mail,
  kakao: MessageCircle,
};

const channelLink =
  "transition-colors duration-200 ease-apple hover:text-accent-hover " +
  "focus-visible:outline-none focus-visible:rounded-sm-el focus-visible:ring-2 " +
  "focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

/** 상담 문의 — 연락 방법 카드 + 상담 안내 표 (폼은 만들지 않는다) */
export function ContactSection() {
  return (
    <>
      <Section id="channels" labelledBy="channels-title" alt>
        <Reveal>
          <h2
            id="channels-title"
            className="text-h2 text-balance break-keep md:text-h2-lg"
          >
            {contact.channelsTitle}
          </h2>
          {contact.notice ? (
            <p className="mt-4 max-w-[65ch] text-caption text-text-secondary break-keep">
              {contact.notice}
            </p>
          ) : null}
        </Reveal>

        <Reveal delay={0.08} className="mt-16">
          <ul className="grid gap-6 md:grid-cols-3 md:gap-8">
            {contact.channels.map((channel) => {
              const Icon = channelIcons[channel.id];

              return (
                <li key={channel.id}>
                  <Card surface="base" className="h-full">
                    <Icon
                      className="size-6 text-text-secondary"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <p className="mt-6 text-caption text-text-secondary break-keep">
                      {channel.label}
                    </p>
                    <p className="mt-2 text-body-l break-words md:text-body-l-lg">
                      {channel.href ? (
                        <a
                          href={channel.href}
                          className={cn("text-accent", channelLink)}
                        >
                          {channel.value}
                        </a>
                      ) : (
                        // 아직 주소가 없는 채널은 링크가 아니라 안내 문구로 표시한다
                        <span className="text-text-secondary">
                          {channel.value}
                        </span>
                      )}
                    </p>
                    <p className="mt-4 text-body text-text-secondary break-keep">
                      {channel.note}
                    </p>
                  </Card>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Section>

      <Section id="contact-info" labelledBy="contact-info-title">
        <Reveal>
          <h2
            id="contact-info-title"
            className="text-h2 text-balance break-keep md:text-h2-lg"
          >
            {contact.infoTitle}
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-16">
          <dl className="max-w-[65ch] border-t border-border">
            {contact.info.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-1 border-b border-border py-6 md:flex-row md:gap-8"
              >
                <dt className="text-body text-text-secondary break-keep md:w-[16ch] md:shrink-0">
                  {item.label}
                </dt>
                <dd className="text-body break-keep">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>
    </>
  );
}
