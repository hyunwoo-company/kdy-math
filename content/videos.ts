/**
 * 수업 영상(/videos) 페이지.
 *
 * 🔴 지금은 촬영 전이라 영상 목록이 비어 있고, 아래 emptyState 안내 화면이 보입니다.
 *
 * ── 영상을 추가하는 방법 ─────────────────────────────────────────────
 * 1. 유튜브에서 영상 주소를 복사합니다.
 *      예) https://www.youtube.com/watch?v=AbCdEfGhIjK
 *          → youtubeId 는 "AbCdEfGhIjK" (v= 뒤의 글자들)
 *      예) https://youtu.be/AbCdEfGhIjK
 *          → youtubeId 는 "AbCdEfGhIjK" (마지막 / 뒤의 글자들)
 * 2. 아래 videos 배열의 대괄호 [ ] 안에 이 형태로 한 줄씩 추가합니다.
 *      { title: "영상 제목", youtubeId: "AbCdEfGhIjK", description: "한두 줄 설명" },
 * 3. 저장하면 /videos 페이지에 카드가 자동으로 늘어납니다. 다른 파일은 고치지 않아도 됩니다.
 * 4. 다시 비우면(videos: []) emptyState 안내 화면으로 돌아갑니다.
 * ────────────────────────────────────────────────────────────────
 */

import type { Cta, Intro, PageMeta } from "./site";

/** 영상 한 편 */
export type Video = {
  /** 카드 제목 */
  title: string;
  /** 유튜브 주소에서 가져온 영상 ID (전체 주소가 아니라 ID만) */
  youtubeId: string;
  /** 카드 설명 한두 줄 */
  description: string;
};

/** 영상 목록 — 위에 적힌 방법대로 항목을 추가하면 그리드가 자동으로 늘어납니다 */
export const videos: Video[] = [];

export const videosPage = {
  meta: {
    title: "수업 영상",
    description:
      "설명 방식과 수업 흐름을 직접 확인하실 수 있는 수업 영상입니다. 현재 촬영을 준비하고 있습니다.",
  } satisfies PageMeta,

  intro: {
    eyebrow: "수업 영상",
    title: ["수업의 한 장면을", "그대로 보여드립니다"],
    lead:
      "설명하는 방식과 말의 속도까지 직접 확인하실 수 있도록, 실제 수업 형태의 영상을 준비하고 있습니다.",
  } satisfies Intro,

  /** 영상이 한 편 이상 있을 때 목록 위에 표시되는 제목 */
  listTitle: "영상 목록",

  /** 영상이 한 편 이상 있을 때 제목 아래 표시되는 안내. 빈 문자열로 두면 사라집니다 */
  listNote: "재생 버튼을 누르면 이 화면에서 바로 재생됩니다.",

  /** 영상이 없을 때(videos: []) 보이는 안내 화면 */
  emptyState: {
    title: "촬영을 준비하고 있습니다",
    /** 배열의 각 항목이 한 문단입니다 */
    body: [
      "개념 설명과 문제 풀이 과정을 담은 영상을 촬영 중입니다. 공개되면 이 페이지에 바로 올라갑니다.",
      "그때까지는 상담을 통해 수업 방식과 진행 순서를 더 자세히 안내드립니다.",
    ],
    cta: { label: "상담으로 먼저 문의하기", href: "/contact" } satisfies Cta,
  },
};
