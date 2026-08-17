/**
 * 학부모용 안내(/parents) 페이지의 모든 문구.
 * 읽는 사람이 **학부모**인 페이지입니다.
 *
 * 구성 순서: 인트로(사진) → 지도 철학 → 1:1 상담·성적 향상 → 학력·경력 → 성장 로드맵 → 상담 CTA
 *
 * 이 파일만 고치면 바뀌는 곳
 * - meta        → 브라우저 탭 제목·검색 설명
 * - intro       → 페이지 맨 위 제목과 설명 (사진은 instructor.ts 의 photos.teaching)
 * - focus       → 지도 방식 섹션의 머리말과 보여줄 카드 선택
 * - credentials → 학력·경력 섹션의 문구 (목록 자체는 instructor.ts 의 education / career)
 * - roadmap     → 성적대별 성장 로드맵 카드
 * - cta         → 맨 아래 상담 유도 블록
 *
 * 지도 철학 문단은 instructor.ts 의 philosophy 에 있습니다.
 */

import type { MethodId } from "./instructor";
import type {
  CardItem,
  CtaBlock,
  Intro,
  PageMeta,
  SectionHeader,
} from "./site";

export const parents = {
  meta: {
    title: "학부모용 안내",
    description:
      "정기 1:1 상담을 통한 학습 심리 관리와 학생별 성장 로드맵. 김동영 강사의 학력·경력과 지도 방식을 안내합니다.",
  } satisfies PageMeta,

  intro: {
    eyebrow: "학부모용 안내",
    title: ["실력과 자신감을", "함께 관리합니다"],
    lead:
      "성적은 결과입니다. 그 결과를 만드는 것은 학생이 어떤 마음으로 책상에 앉아 있는지입니다. 수업과 상담을 함께 운영하는 이유입니다.",
  } satisfies Intro,

  focus: {
    header: {
      eyebrow: "지도 방식",
      title: "상담으로 관리하고, 결과로 증명합니다",
      lead:
        "학습 심리를 먼저 다루고, 그 위에 성적 향상을 위한 계획을 올립니다.",
    } satisfies SectionHeader,
    /**
     * 이 섹션에 보여줄 지도 방식.
     * instructor.ts 의 methods 에서 id 가 일치하는 카드를 순서대로 가져옵니다.
     * 사용 가능한 id: "counseling" · "interest" · "results"
     */
    methodIds: ["counseling", "results"] satisfies MethodId[],
  },

  credentials: {
    eyebrow: "강사 소개",
    title: "김동영",
    /** 학력 목록 위 소제목 */
    educationLabel: "학력",
    /** 경력 목록 위 소제목 */
    careerLabel: "경력",
    /** 목록 아래 한 줄 */
    note: "고등부 수학을 중심으로 지도해 왔습니다.",
  },

  roadmap: {
    header: {
      eyebrow: "성장 로드맵",
      title: "지금 위치에서 다음 한 칸으로",
      lead:
        "같은 교재로 같은 진도를 나가지 않습니다. 현재 성적대에 따라 먼저 채워야 할 것이 다릅니다.",
    } satisfies SectionHeader,
    items: [
      {
        label: "하위권",
        title: "개념 확립",
        body: [
          "비어 있는 개념을 찾아 이전 학년까지 되돌아가 다시 세웁니다. 진도보다 이해를 먼저 맞춥니다.",
        ],
      },
      {
        label: "중위권",
        title: "실수와 유형 정리",
        body: [
          "아는데 틀리는 문제를 원인별로 분류합니다. 풀이의 첫 수를 스스로 정하는 훈련을 반복합니다.",
        ],
      },
      {
        label: "상위권",
        title: "고난도 문제 극복",
        body: [
          "출제 의도를 읽고 접근 방법을 설계하는 연습에 집중합니다. 시간 배분까지 함께 점검합니다.",
        ],
      },
    ] satisfies CardItem[],
  },

  cta: {
    title: "상담으로 시작합니다",
    body: "학생의 현재 상태와 목표를 듣고 지금 필요한 것부터 정리해 드립니다. 연락 주시면 상담 일정을 안내드립니다.",
    primaryCta: { label: "상담 문의하기", href: "/contact" },
  } satisfies CtaBlock,
};
