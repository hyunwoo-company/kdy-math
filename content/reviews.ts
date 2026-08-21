/**
 * 수업 후기(/reviews) — 학생·학부모님이 보내주신 카카오톡 메시지 캡쳐.
 *
 * ⚠️ 개인정보 — 이 파일을 고칠 때 반드시 지켜주세요
 * 1. 캡쳐 이미지는 사람을 특정할 수 있는 것이 화면에 없는 것만 씁니다.
 *    실명·연락처·학교명, 합격증·성적표 원본, 식별 가능한 프로필 사진이 보이면
 *    게시하지 않습니다. 추가 절차는 scripts/resize-review-images.js 주석에 있습니다.
 * 2. 고려대 입학허가통지서 캡쳐는 **의도적으로 제외했습니다.** 통지서에 성명과
 *    수험번호가 찍혀 있고 메시지 본문에도 학생 실명이 그대로 있습니다.
 *    되살리지 마세요.
 * 3. 후기와 캡쳐는 학생·학부모님이 보낸 것입니다. 새로 추가하기 전에 동의 여부를
 *    먼저 확인해 주세요.
 *
 * 이 파일만 고치면 바뀌는 곳
 * - meta        → 수업 후기 탭의 브라우저 탭 제목·검색 설명
 * - intro       → 페이지 맨 위 인트로
 * - shots       → 캡쳐 목록 (public/images/reviews/ 의 파일과 짝이 맞아야 합니다)
 * - homeSection → 홈(/)에 보여줄 후기 모음 이미지와 머리말
 * - cta         → 페이지 맨 아래 상담 유도 블록
 */

import type { CtaBlock, Intro, PageMeta, Photo, SectionHeader } from "./site";

export const reviews = {
  meta: {
    title: "수업 후기",
    description:
      "수업을 들은 학생과 학부모님이 보내주신 메시지입니다. 성적 향상, 모의고사 등급, 대학 합격 소식을 실제 대화 캡쳐로 담았습니다.",
  } satisfies PageMeta,

  intro: {
    eyebrow: "수업 후기",
    /** 배열의 각 항목이 한 줄로 표시됩니다 */
    title: ["학생이 먼저", "알려온 소식들"],
    lead:
      "시험이 끝나면 학생들이 먼저 연락을 줍니다. 점수가 올랐다고, 등급이 바뀌었다고, 합격했다고. 받은 메시지를 그대로 옮겼습니다.",
  } satisfies Intro,

  shots: {
    header: {
      eyebrow: "실제 대화",
      title: "받은 메시지 캡쳐",
    } satisfies SectionHeader,

    /** 확대 보기 버튼·닫기 버튼의 스크린리더 라벨 */
    expandLabel: "캡쳐 크게 보기",
    closeLabel: "닫기",

    /**
     * 캡쳐 목록.
     * width/height 는 public/images/reviews/ 의 실제 픽셀 크기와 같아야 합니다.
     * scripts/resize-review-images.js 를 실행하면 붙여 넣을 값이 출력됩니다.
     *
     * ⚠️ 순서에 의미가 있습니다.
     * 화면은 두 칸 그리드이고, 가로로 아주 긴 캡쳐(가로:세로 2.5 이상)는 두 칸을
     * 차지합니다. 그래서 **높이가 비슷한 캡쳐를 둘씩 짝지어** 놓고 그 사이에 긴
     * 캡쳐를 끼웠습니다. 순서를 임의로 바꾸면 옆자리가 길게 비어 보입니다.
     * 세로로 긴 캡쳐는 뒤쪽에 모아 두었습니다.
     */
    items: [
      // 짝 — 비율 1.89 / 1.49
      {
        src: "/images/reviews/review-01.jpg",
        alt: "학생이 보낸 메시지 캡쳐 — 전교 49등을 했다는 내용",
        width: 1200,
        height: 636,
      },
      {
        src: "/images/reviews/review-02.jpg",
        alt: "학생이 보낸 메시지 캡쳐 — 질문할 문제 번호를 알려주고 모의고사 수학 1등급이 나왔다는 내용",
        width: 1200,
        height: 808,
      },
      // 두 칸 — 비율 4.55
      {
        src: "/images/reviews/review-03.jpg",
        alt: "학생이 보낸 메시지 캡쳐 — 1등급이 나왔고 전교 11등으로 안착했다는 내용",
        width: 1200,
        height: 264,
      },
      // 두 칸 — 비율 2.82
      {
        src: "/images/reviews/review-04.jpg",
        alt: "학생이 보낸 메시지 캡쳐 — 최종 85.9점이고 1등급 컷이 91점이라는 내용",
        width: 1200,
        height: 425,
      },
      // 짝 — 비율 2.33 / 2.34
      {
        src: "/images/reviews/review-05.jpg",
        alt: "학생이 보낸 메시지 캡쳐 — 이번에도 수학 100점을 받았다는 내용",
        width: 1200,
        height: 516,
      },
      {
        src: "/images/reviews/review-15.jpg",
        alt: "학생이 보낸 메시지 캡쳐 — 수강자 346명 가운데 32번째라는 성적 통계",
        width: 1200,
        height: 512,
      },
      // 두 칸 — 비율 5.29
      {
        src: "/images/reviews/review-07.jpg",
        alt: "학생이 보낸 메시지 캡쳐 — 가내신이 거의 만점이라는 내용",
        width: 1200,
        height: 227,
      },
      // 짝 — 비율 2.08 / 1.74
      {
        src: "/images/reviews/review-09.jpg",
        alt: "학부모님이 보낸 메시지 캡쳐 — 클리닉을 챙겨준 것에 감사하며 아이가 학교가 끝나고 바로 학원에 갔다는 내용",
        width: 1200,
        height: 578,
      },
      {
        src: "/images/reviews/review-21.jpg",
        alt: "졸업생이 보낸 스승의날 메시지 캡쳐 — 알려준 공부 방법으로 시험을 잘 봤다는 내용",
        width: 1200,
        height: 689,
      },
      // 두 칸 — 비율 3.49
      {
        src: "/images/reviews/review-10.jpg",
        alt: "학부모님이 보낸 메시지 캡쳐 — 항상 아이들을 위해 애써주어 감사하다는 내용",
        width: 1200,
        height: 344,
      },
      // 짝 — 비율 2.42 / 2.40
      {
        src: "/images/reviews/review-11.jpg",
        alt: "학생이 보낸 메시지 캡쳐 — 시험 점수가 예전보다 18점 올랐다는 내용과 시험지 사진",
        width: 1200,
        height: 496,
      },
      {
        src: "/images/reviews/review-08.jpg",
        alt: "학생이 보낸 메시지 캡쳐 — 목표보다 높은 대학에 추가 합격했다는 내용",
        width: 1200,
        height: 499,
      },
      // 두 칸 — 비율 3.39
      {
        src: "/images/reviews/review-12.jpg",
        alt: "학부모님이 보낸 메시지 캡쳐 — 수학을 버릴지 고민하던 아이에게 자신감과 희망을 주었다는 내용",
        width: 1200,
        height: 354,
      },
      // 두 칸 — 비율 3.36
      {
        src: "/images/reviews/review-14.jpg",
        alt: "학부모님이 보낸 메시지 캡쳐 — 아이가 수업이 최고라고 자랑하며 복습도 열심히 했다는 내용",
        width: 1200,
        height: 357,
      },
      // 짝 — 비율 1.06 / 0.70
      {
        src: "/images/reviews/review-19.jpg",
        alt: "학생이 보낸 메시지 캡쳐 — 89.7점으로 지금까지 가장 높은 점수를 받았다는 내용",
        width: 1200,
        height: 1131,
      },
      {
        src: "/images/reviews/review-22.jpg",
        alt: "학생이 보낸 메시지 캡쳐 — 시험지 사진과 함께 100점을 받았다는 내용",
        width: 930,
        height: 1334,
      },
      // 두 칸 — 비율 4.48
      {
        src: "/images/reviews/review-18.jpg",
        alt: "학생이 보낸 메시지 캡쳐 — 처음으로 객관식을 모두 풀었다는 내용",
        width: 1200,
        height: 268,
      },
      // 짝 — 비율 0.74 / 0.76
      {
        src: "/images/reviews/review-23.jpg",
        alt: "학생이 보낸 메시지 캡쳐 — 362명 가운데 35등을 해서 2등급이 될 것 같다는 내용",
        width: 922,
        height: 1248,
      },
      {
        src: "/images/reviews/review-13.jpg",
        alt: "학생이 보낸 메시지 캡쳐 — 받은 자료 덕분에 시험을 잘 봤고 수학 16등을 했다는 내용",
        width: 938,
        height: 1237,
      },
      // 두 칸 — 비율 3.06
      {
        src: "/images/reviews/review-20.jpg",
        alt: "학부모님이 보낸 메시지 캡쳐 — 아이에게 따뜻한 관심을 주어 감사하다는 내용",
        width: 1200,
        height: 392,
      },
      // 짝 — 비율 0.84 / 0.89
      {
        src: "/images/reviews/review-17.jpg",
        alt: "학생이 보낸 메시지 캡쳐 — 36등까지 2등급인데 35등을 했다는 내용",
        width: 1077,
        height: 1287,
      },
      {
        src: "/images/reviews/review-16.jpg",
        alt: "학생이 보낸 메시지 캡쳐 — 수학 점수가 72.9점으로 올라 최종 2등급이 될 것 같다는 내용",
        width: 969,
        height: 1084,
      },
      // 마지막 — 비율 0.59. 가장 세로로 길어 짝이 없다
      {
        src: "/images/reviews/review-06.jpg",
        alt: "학생이 보낸 메시지 캡쳐 — 원점수 96점을 받고 이후 대학에 합격했다는 내용",
        width: 953,
        height: 1609,
      },
    ] satisfies Photo[],
  },

  /**
   * 홈(/)의 후기 섹션.
   * 캡쳐를 한 장으로 모아 놓은 이미지를 보여주고 상세 페이지로 보냅니다.
   * 이미지 안에는 글자를 넣지 않습니다 — 제목은 아래 header 로 화면에 얹으므로
   * 검색엔진과 스크린리더가 읽을 수 있어야 합니다.
   */
  homeSection: {
    header: {
      eyebrow: "수업 후기",
      title: "결과와 후기로 증명하는 수업",
    } satisfies SectionHeader,

    collage: {
      src: "/images/reviews/review-collage.jpg",
      alt: "학생과 학부모님이 보내주신 카카오톡 메시지를 모아 놓은 이미지. 성적 향상과 대학 합격 소식이 담겨 있습니다.",
      width: 891,
      height: 1041,
    } satisfies Photo,

    moreLink: { label: "후기 전체 보기", href: "/reviews" },
  },

  cta: {
    title: "다음 소식의 주인공이 되었으면 합니다",
    body: "현재 성적과 막히는 단원을 듣고 지금 필요한 것부터 정리해 드립니다.",
    primaryCta: { label: "상담 문의하기", href: "/contact" },
  } satisfies CtaBlock,
};
