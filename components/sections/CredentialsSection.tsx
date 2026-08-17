import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import type { Credential, Cta, Photo } from "@/content";
import { cn } from "@/lib/utils";

type CredentialsSectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  /** 제목 아래 소개 문단. 없으면 렌더하지 않는다 */
  paragraphs?: string[];
  educationLabel: string;
  education: Credential[];
  careerLabel: string;
  career: Credential[];
  /** 목록 아래 한 줄. 없으면 렌더하지 않는다 */
  note?: string;
  /** 함께 보여줄 세로 사진. 있으면 2열로 배치한다 */
  photo?: Photo;
  /** 목록 아래 텍스트 링크 */
  moreLink?: Cta;
  alt?: boolean;
};

function CredentialList({
  label,
  items,
}: {
  label: string;
  items: Credential[];
}) {
  return (
    <div>
      <p className="text-caption text-text-secondary break-keep">{label}</p>
      <ul className="mt-4 border-t border-border">
        {items.map((item) => (
          <li key={item.title} className="border-b border-border py-4">
            <span className="text-body break-keep">
              {item.status ? (
                <span className="text-text-secondary">{item.status} </span>
              ) : null}
              {item.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 강사 소개 — 사진(선택) + 소개 문단 + 학력·경력 목록 */
export function CredentialsSection({
  id,
  eyebrow,
  title,
  paragraphs,
  educationLabel,
  education,
  careerLabel,
  career,
  note,
  photo,
  moreLink,
  alt = false,
}: CredentialsSectionProps) {
  const titleId = `${id}-title`;

  return (
    <Section id={id} labelledBy={titleId} alt={alt}>
      <div
        className={cn(
          "grid gap-12 md:gap-16",
          photo && "md:grid-cols-[minmax(0,360px)_minmax(0,1fr)] md:items-start",
        )}
      >
        {photo ? (
          <Reveal>
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-container bg-bg-alt">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 360px, calc(100vw - 48px)"
                className="object-cover"
              />
            </div>
          </Reveal>
        ) : null}

        <Reveal delay={photo ? 0.08 : 0}>
          <p className="text-caption text-text-secondary break-keep">
            {eyebrow}
          </p>
          <h2
            id={titleId}
            className="mt-3 text-h2 text-balance break-keep md:text-h2-lg"
          >
            {title}
          </h2>

          {paragraphs?.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-4 max-w-[65ch] text-body text-text-secondary text-pretty break-keep"
            >
              {paragraph}
            </p>
          ))}

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <CredentialList label={educationLabel} items={education} />
            <CredentialList label={careerLabel} items={career} />
          </div>

          {note ? (
            <p className="mt-8 max-w-[65ch] text-body text-text-secondary break-keep">
              {note}
            </p>
          ) : null}

          {moreLink ? (
            <p className="mt-8">
              <Button href={moreLink.href} variant="text">
                {moreLink.label}
                <ChevronRight className="size-4 shrink-0" strokeWidth={2} aria-hidden />
              </Button>
            </p>
          ) : null}
        </Reveal>
      </div>
    </Section>
  );
}
