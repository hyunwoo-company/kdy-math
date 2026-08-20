/**
 * 수업 후기(/reviews) — 학생·학부모님이 보내주신 카카오톡 메시지.
 *
 * ⚠️ 개인정보 — 이 파일을 고칠 때 반드시 지켜주세요
 * 1. 실명을 쓰지 않습니다. 화자는 "학생", "학부모님", "졸업생" 으로만 적습니다.
 * 2. 학교명·연락처·수험번호가 드러나는 내용은 넣지 않습니다.
 *    (대학 합격 소식은 학교명을 써도 학생을 특정할 수 없으므로 그대로 둡니다)
 * 3. 캡쳐 이미지는 사람을 특정할 수 있는 것이 화면에 없는 것만 씁니다.
 *    추가 절차는 scripts/resize-review-images.js 파일 맨 위 주석에 있습니다.
 * 4. 후기 문구와 캡쳐는 학생·학부모님이 보낸 것입니다. 홍보 목적으로 공개할 때는
 *    본인 또는 보호자의 동의를 받는 것이 원칙입니다. 새 후기를 추가하기 전에
 *    동의 여부를 먼저 확인해 주세요.
 *
 * 인용문은 받은 원문을 그대로 씁니다. 오타나 줄임말도 고치지 않습니다 —
 * 다듬으면 진짜 받은 말이라는 느낌이 사라지고 캡쳐와도 어긋납니다.
 * 다만 실명이 들어 있던 자리는 "아이" 처럼 일반 명사로 바꿉니다.
 *
 * 이 파일만 고치면 바뀌는 곳
 * - meta        → 수업 후기 탭의 브라우저 탭 제목·검색 설명
 * - intro       → 페이지 맨 위 인트로
 * - quotesHeader → 인용 카드 섹션의 머리말
 * - quotes      → 후기 카드 (여기에 추가·삭제하면 페이지에 바로 반영됩니다)
 * - shots       → 실제 대화 캡쳐 (public/images/reviews/ 의 파일과 짝이 맞아야 합니다)
 * - homeSection → 홈(/)에 요약으로 보여줄 후기 3개와 그 머리말
 * - cta         → 페이지 맨 아래 상담 유도 블록
 */

import type { CtaBlock, Intro, PageMeta, Photo, SectionHeader } from "./site";

/** 후기 카드 한 장 */
export type ReviewQuote = {
  /** 카드 맨 위 작은 라벨 — 결과나 성격을 한눈에 보여주는 짧은 문구 */
  label: string;
  /** 받은 메시지 원문 */
  quote: string;
  /** 누가 보냈는지. 실명은 쓰지 않습니다 */
  from: string;
};

export const reviews = {
  meta: {
    title: "수업 후기",
    description:
      "수업을 들은 학생과 학부모님이 보내주신 말을 모았습니다. 성적 향상, 모의고사 등급, 대학 합격 소식과 실제 대화 캡쳐를 함께 담았습니다.",
  } satisfies PageMeta,

  intro: {
    eyebrow: "수업 후기",
    /** 배열의 각 항목이 한 줄로 표시됩니다 */
    title: ["학생이 먼저", "알려온 소식들"],
    lead:
      "시험이 끝나면 학생들이 먼저 연락을 줍니다. 점수가 올랐다고, 등급이 바뀌었다고, 합격했다고. 받은 메시지를 원문 그대로 옮겼습니다.",
  } satisfies Intro,

  quotesHeader: {
    eyebrow: "받은 메시지",
    title: "학생과 학부모님이 보내주신 말",
  } satisfies SectionHeader,

  quotes: [
    {
      label: "18점 상승",
      quote:
        "선생님! 늦게 카톡 보내서 죄송해용ㅎ 수학 시험을 봤는데 예전보다 점수가 18점 올랐어요 너무 감사해여 ㅎㅎ",
      from: "학생",
    },
    {
      label: "전교 49등",
      quote: "전교 49등 햇슴요.",
      from: "학생",
    },
    {
      label: "모의고사 수학 1등급",
      quote: "아 그리고 모의고사 수학 1등급이에요!!",
      from: "학생",
    },
    {
      label: "1등급 · 전교 11등",
      quote: "이번에 1등급 나왔습니다 11등으로 안착했어요ㅎㅎㅎ",
      from: "학생",
    },
    {
      label: "최종 85.9점",
      quote: "쌤 최종 85.9점이고 1컷 91, 2컷 82, 3컷 74입니다!",
      from: "학생",
    },
    {
      label: "커리어 하이 89.7점",
      quote: "저 89.7점이에요 커리어 하이입니다",
      from: "학생",
    },
    {
      label: "수학 100점",
      quote: "쌤 저 이번에도 수학 100이에요",
      from: "학생",
    },
    {
      label: "가내신 거의 만점",
      quote: "저 가내신 거의 만점이고 열심히 잘 하고있어요 다 쌤 덕입니다 :)",
      from: "학생",
    },
    {
      label: "처음으로 완주",
      quote: "와쌤 저 처음으로 객관식 다 풀엇어요",
      from: "학생",
    },
    {
      label: "서울대 합격",
      quote: "원점수로 하면 96이에요. 쌤 붙었습니다",
      from: "학생",
    },
    {
      label: "단국대 합격",
      quote: "단국대가 우주상향이었는데 감사합니다. 너무 기분이 좋아요",
      from: "학생",
    },
    {
      /** 원문에 있던 학생 이름은 "아이" 로 바꿨습니다 */
      label: "고려대 합격",
      quote:
        "선생님께 도움 받고 아이가 고대에 합격했습니다. 기쁜 소식 알려드려요^^",
      from: "학부모님",
    },
    {
      label: "자신감",
      quote:
        "수학을 버리느냐 마느냐 기로에서 선생님께서 아이에게 큰 자신감과 희망을 주셨어요",
      from: "학부모님",
    },
    {
      label: "스스로 가는 학원",
      quote:
        "매번 챙겨서 클리닉해주셔서 감사합니다. 오늘도 학교끝나고 바로 학원갔더라구요.",
      from: "학부모님",
    },
    {
      label: "복습 습관",
      quote:
        "아이가 쌤 수업 최고라고 늘 자랑하고, 치키쿠폰 받으려고 복습도 아주 야무지게 했네요 정말 감사합니다^^",
      from: "학부모님",
    },
    {
      label: "졸업 후에도",
      quote:
        "선생님께서 저에게 수학 공부하는 방법을 잘 알려주셨기에 잘 보게 된 것 같아서 정말 감사드립니다.",
      from: "졸업생",
    },
  ] satisfies ReviewQuote[],

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
     */
    items: [
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
      {
        src: "/images/reviews/review-03.jpg",
        alt: "학생이 보낸 메시지 캡쳐 — 1등급이 나왔고 전교 11등으로 안착했다는 내용",
        width: 1200,
        height: 264,
      },
      {
        src: "/images/reviews/review-04.jpg",
        alt: "학생이 보낸 메시지 캡쳐 — 최종 85.9점이고 1등급 컷이 91점이라는 내용",
        width: 1200,
        height: 425,
      },
      {
        src: "/images/reviews/review-05.jpg",
        alt: "학생이 보낸 메시지 캡쳐 — 이번에도 수학 100점을 받았다는 내용",
        width: 1200,
        height: 516,
      },
      {
        src: "/images/reviews/review-08.jpg",
        alt: "학생이 보낸 메시지 캡쳐 — 목표보다 높은 대학에 추가 합격했다는 내용",
        width: 1200,
        height: 499,
      },
      {
        src: "/images/reviews/review-09.jpg",
        alt: "학부모님이 보낸 메시지 캡쳐 — 클리닉을 챙겨준 것에 감사하며 아이가 학교가 끝나고 바로 학원에 갔다는 내용",
        width: 1200,
        height: 578,
      },
      {
        src: "/images/reviews/review-07.jpg",
        alt: "학생이 보낸 메시지 캡쳐 — 가내신이 거의 만점이라는 내용",
        width: 1200,
        height: 227,
      },
      {
        src: "/images/reviews/review-10.jpg",
        alt: "학부모님이 보낸 메시지 캡쳐 — 항상 아이들을 위해 애써주어 감사하다는 내용",
        width: 1200,
        height: 344,
      },
      /*
       * ⚠️ 세로로 긴 캡쳐는 목록 맨 끝에 둡니다.
       * 화면은 두 칸 그리드라서 세로로 긴 캡쳐가 중간에 있으면 그 옆이 길게 비어 버립니다
       * (뒤에 오는 가로로 긴 캡쳐는 두 칸을 차지해 그 빈자리에 들어가지 못합니다).
       * 맨 끝에 두면 빈자리가 페이지 끝 한 곳에만 생겨 눈에 거슬리지 않습니다.
       */
      {
        src: "/images/reviews/review-06.jpg",
        alt: "학생이 보낸 메시지 캡쳐 — 원점수 96점을 받고 이후 대학에 합격했다는 내용",
        width: 953,
        height: 1609,
      },
    ] satisfies Photo[],
  },

  /**
   * 홈(/)에 요약으로 보여줄 후기.
   * quoteIndexes 는 위 quotes 배열의 순번입니다(0부터 시작).
   * 순서를 바꾸거나 항목을 지우면 이 번호도 함께 확인해 주세요.
   */
  homeSection: {
    header: {
      eyebrow: "수업 후기",
      title: "학생이 먼저 알려온 소식",
    } satisfies SectionHeader,
    quoteIndexes: [0, 2, 12],
    moreLink: { label: "후기 더 보기", href: "/reviews" },
  },

  cta: {
    title: "다음 소식의 주인공이 되었으면 합니다",
    body: "현재 성적과 막히는 단원을 듣고 지금 필요한 것부터 정리해 드립니다.",
    primaryCta: { label: "상담 문의하기", href: "/contact" },
  } satisfies CtaBlock,
};
