"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { reviews } from "@/content";
import { cn } from "@/lib/utils";

const { header, items, expandLabel, closeLabel } = reviews.shots;

type ReviewShotsProps = {
  /** 섹션 id — 앵커 링크와 제목 id 에 함께 쓰인다 */
  id: string;
  /** true 면 `#f5f5f7` 배경 섹션 */
  alt?: boolean;
};

/**
 * 받은 메시지 캡쳐 그리드 + 확대 보기.
 *
 * 캡쳐 원본 비율이 4320x816(5.3:1) 부터 953x1609(0.6:1) 까지 극단적으로 다르다.
 * 처음에는 `aspect-[4/3] object-cover` 로 비율을 통일했는데, 가로로 긴 캡쳐가
 * 좌우로 잘려 "전교 49등" 이 "9등" 으로 보이는 문제가 있었다.
 * 그래서 **자르지 않고 원본 비율로 두고**, 대신 가로로 아주 긴 캡쳐만
 * 두 열을 차지하게 해서 글자가 읽히는 폭을 확보한다.
 */
export function ReviewShots({ id, alt = false }: ReviewShotsProps) {
  const titleId = `${id}-title`;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shot = openIndex === null ? null : items[openIndex];

  const thumbClass = cn(
    "block w-full cursor-pointer rounded-card",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
    alt ? "focus-visible:ring-offset-bg-alt" : "focus-visible:ring-offset-bg",
  );
  const closeClass = cn(
    "flex size-11 cursor-pointer items-center justify-center rounded-sm-el text-text",
    "transition-colors duration-200 ease-apple hover:bg-bg-alt",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
  );

  function openShot(index: number) {
    setOpenIndex(index);
    dialogRef.current?.showModal();
  }

  function closeShot() {
    // 닫힘 뒤처리는 onClose 한 곳에서만 한다 (ESC 로 닫아도 같은 경로를 탄다)
    dialogRef.current?.close();
  }

  return (
    <Section id={id} labelledBy={titleId} alt={alt}>
      <Reveal>
        <SectionHeading id={titleId} {...header} />
      </Reveal>

      <Reveal delay={0.08} className="mt-16">
        {/* grid-flow-dense 를 쓰면 안 된다 — 맨 끝에 둔 세로로 긴 캡쳐를
            앞쪽 빈칸으로 끌어올려서 목록 중간이 길게 비어 버린다.
            content/reviews.ts 의 items 순서를 그대로 지키는 것이 의도된 동작이다. */}
        <ul className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-8">
          {items.map((item, index) => {
            /**
             * 가로:세로 가 2.5 를 넘는 캡쳐 = 말풍선 한두 줄만 잘라낸 초광각 이미지.
             * 한 열(약 456px)에 넣으면 글자가 읽히지 않을 만큼 납작해지므로
             * 두 열(약 944px)을 차지하게 한다. 새 캡쳐를 추가해도 자동 적용된다.
             */
            const wide = item.width / item.height >= 2.5;

            return (
              <li key={item.src} className={wide ? "md:col-span-2" : undefined}>
                <button
                  type="button"
                  onClick={() => openShot(index)}
                  aria-label={`${expandLabel}: ${item.alt}`}
                  className={thumbClass}
                >
                  <div className="overflow-hidden rounded-card">
                    {/* 버튼의 aria-label 이 설명을 읽으므로 이미지는 장식으로 둔다 */}
                    <Image
                      src={item.src}
                      alt=""
                      width={item.width}
                      height={item.height}
                      sizes={
                        wide
                          ? "(min-width: 768px) 944px, 100vw"
                          : "(min-width: 768px) 456px, 100vw"
                      }
                      className="h-auto w-full"
                    />
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </Reveal>

      <dialog
        ref={dialogRef}
        aria-label={expandLabel}
        onClose={() => setOpenIndex(null)}
        onClick={(event) => {
          // dialog 자신이 클릭 대상일 때만 = backdrop 클릭
          if (event.target === dialogRef.current) {
            closeShot();
          }
        }}
        className="m-auto max-h-[90vh] w-[90vw] max-w-[720px] overflow-auto rounded-container bg-bg p-4 [&::backdrop]:bg-black/60"
      >
        <div className="flex justify-end">
          <button
            type="button"
            onClick={closeShot}
            aria-label={closeLabel}
            className={closeClass}
          >
            <X className="size-5" strokeWidth={1.5} aria-hidden />
          </button>
        </div>

        {shot ? (
          /**
           * 모바일(폭 약 340px)에서는 가로로 긴 캡쳐가 눌려 글자를 읽을 수 없다.
           * 최소 폭 600px 을 보장하고 dialog 를 가로로도 스크롤되게 해서
           * 밀어 보며 읽을 수 있게 한다. 데스크톱은 720px 안에 다 들어오므로
           * `md:min-w-0` 으로 최소 폭을 풀어 가로 스크롤이 생기지 않게 한다.
           */
          <Image
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            sizes="(min-width: 768px) 720px, 600px"
            className="h-auto w-full min-w-[600px] rounded-container md:min-w-0"
          />
        ) : null}
      </dialog>
    </Section>
  );
}
