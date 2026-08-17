/**
 * 홈(/) 페이지의 모든 문구.
 *
 * 구성 순서: 히어로 → 핵심 카피 → 지도 방식 3가지 → 강사 소개 요약 → 안내 선택 → 상담 CTA
 *
 * 이 파일만 고치면 바뀌는 곳
 * - meta        → 홈의 브라우저 탭 제목·검색 설명
 * - hero        → 첫 화면의 라벨/설명/버튼 (큰 문장은 instructor.ts 의 slogan)
 * - statement   → 핵심 카피 섹션의 라벨 (문장 자체는 instructor.ts 의 coreCopy)
 * - methods     → 지도 방식 섹션의 머리말 (카드 3개는 instructor.ts 의 methods)
 * - instructorSummary → 강사 소개 요약 섹션
 * - audience    → 학생용/학부모용 안내로 보내는 카드 2개
 * - cta         → 맨 아래 상담 유도 블록
 */

import type { Cta, CtaBlock, PageMeta, SectionHeader } from "./site";

/** 안내 선택 카드 한 장 */
type AudienceCard = {
  title: string;
  body: string;
  /** 카드 아래 링크 문구 */
  linkLabel: string;
  /** 이동할 탭 주소 */
  href: string;
};

export const home = {
  meta: {
    title: "DYnamic MATH · 김동영 수학",
    description:
      "실력을 키우고 자신감을 완성하는 수학. 흥미와 작은 성취에서 출발해 자신감과 성적 향상까지 이어지도록 지도하는 김동영 강사의 수학 수업 안내입니다.",
  } satisfies PageMeta,

  hero: {
    /** 큰 문장 위 작은 라벨 */
    eyebrow: "대치동 고등 수학 · 김동영",
    /** 큰 문장 아래 설명 */
    lead:
      "수학이 막막한 학생도 '해볼 만하다'고 느끼는 순간부터 달라집니다. 흥미와 작은 성취에서 출발해 자신감과 성적까지 이어지도록 지도합니다.",
    primaryCta: { label: "상담 문의하기", href: "/contact" } satisfies Cta,
    secondaryCta: { label: "지도 방식 보기", href: "#methods" } satisfies Cta,
  },

  statement: {
    /** 핵심 카피 위 작은 라벨 */
    eyebrow: "지도의 방향",
  },

  methods: {
    eyebrow: "지도 방식",
    title: "세 가지를 하나로 이어서 지도합니다",
    lead:
      "심리적 지원, 흥미 유발, 성적 향상은 따로 움직이지 않습니다. 마음이 준비되면 스스로 공부하고, 스스로 공부한 학생이 결과를 만듭니다.",
  } satisfies SectionHeader,

  instructorSummary: {
    eyebrow: "강사 소개",
    title: "김동영",
    /** 소개 문단. 배열의 각 항목이 한 문단입니다 */
    paragraphs: [
      "연세대학교 공과대학을 졸업하고, 같은 대학 대학원에서 수학교육 석사과정을 밟고 있습니다.",
      "대치동에서 고등부 수학을 지도하며, 학생마다 다른 출발점에서 시작해 스스로 공부하는 힘을 만드는 데 집중합니다.",
    ],
    /** 학력 목록 위 소제목 */
    educationLabel: "학력",
    /** 경력 목록 위 소제목 */
    careerLabel: "경력",
    /** 학부모용 안내로 보내는 링크 */
    moreLink: { label: "강사 소개 자세히 보기", href: "/parents" } satisfies Cta,
  },

  audience: {
    header: {
      eyebrow: "안내",
      title: "읽는 사람에 따라 안내가 다릅니다",
    } satisfies SectionHeader,
    cards: [
      {
        title: "학생용 안내",
        body: "지금 수학이 막막하게 느껴진다면, 어디서부터 다시 시작할 수 있는지 이야기합니다.",
        linkLabel: "학생용 안내 보기",
        href: "/students",
      },
      {
        title: "학부모용 안내",
        body: "1:1 상담으로 학습 심리를 관리하는 방식과 성적 향상까지의 로드맵을 정리했습니다.",
        linkLabel: "학부모용 안내 보기",
        href: "/parents",
      },
    ] satisfies AudienceCard[],
  },

  cta: {
    title: "먼저 이야기부터 나눠 보세요",
    body: "현재 성적, 막히는 단원, 공부 습관을 듣고 지금 필요한 것부터 정리해 드립니다.",
    primaryCta: { label: "상담 문의하기", href: "/contact" },
  } satisfies CtaBlock,
};
