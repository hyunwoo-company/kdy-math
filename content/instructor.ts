/**
 * 강사 김동영 — 프로필, 사진, 학력, 경력, 지도 철학, 지도 방식 3가지.
 *
 * 이 파일만 고치면 바뀌는 곳
 * - instructor.slogan   → 홈 히어로의 큰 문장
 * - instructor.coreCopy → 홈 중간의 핵심 카피 한 문장
 * - photos              → 홈·학부모용 안내에 쓰이는 사진과 설명
 * - education / career  → 홈 강사 소개, 학부모용 안내의 학력·경력 목록
 * - philosophy          → 학부모용 안내의 지도 철학 문단
 * - methods             → 홈의 지도 방식 카드 3개, 학부모용 안내의 상세 카드
 */

import type { Photo } from "./site";

/** 학력·경력 한 줄 */
export type Credential = {
  /** "현)" / "전)" 같은 짧은 표기. 적은 그대로 이름 앞에 표시됩니다. 비워 두면 사라집니다 */
  status?: string;
  /** 기관·과정 이름 */
  title: string;
};

/** 지도 방식 카드를 골라 쓸 때 사용하는 구분값 */
export type MethodId = "counseling" | "interest" | "results";

/** 지도 방식 한 가지 */
export type Method = {
  id: MethodId;
  /** 카드 위에 붙는 번호 */
  order: string;
  title: string;
  /** 홈 카드에 쓰는 한 줄 요약 */
  summary: string;
  /** 상세 문단. 배열의 각 항목이 한 문단입니다 */
  body: string[];
};

export const instructor = {
  name: "김동영",
  /** 히어로 제목 위 작은 라벨 */
  role: "수학 강사 김동영",
  /** 메인 슬로건 — 배열의 각 항목이 한 줄로 표시됩니다 */
  slogan: ["실력을 키우고", "자신감을 완성하는 수학"],
  /** 핵심 카피 — 홈 중간의 큰 문장 하나 */
  coreCopy:
    "단순한 지식 전달을 넘어, 공부에 흥미를 붙이고 결과를 만들어내는 수학 지도",
};

/**
 * 사진 3장. 파일을 교체할 때는 public/images 안 파일을 바꾸고
 * width/height 를 새 파일의 실제 크기로 맞춰 주세요.
 */
export const photos: Record<"hero" | "about" | "teaching", Photo> = {
  /** 홈 히어로 (가로 사진) */
  hero: {
    src: "/images/kdy-hero.jpg",
    alt: "웃으며 손가락을 들어 보이는 김동영 강사",
    width: 1600,
    height: 1067,
  },
  /** 홈 강사 소개 (세로 사진) */
  about: {
    src: "/images/kdy-about.jpg",
    alt: "팔짱을 끼고 편안하게 웃는 김동영 강사",
    width: 1067,
    height: 1600,
  },
  /** 학부모용 안내 (세로 사진) */
  teaching: {
    src: "/images/kdy-teaching.jpg",
    alt: "정장을 입고 보드마커를 든 김동영 강사",
    width: 1067,
    height: 1600,
  },
};

/** 학력 — 최근 것이 위 */
export const education: Credential[] = [
  { title: "연세대학교 대학원 수학교육 석사과정" },
  { title: "연세대학교 공과대학 졸업" },
];

/** 경력 — 현재가 위, 과거가 아래 */
export const career: Credential[] = [
  { status: "현)", title: "대치 시그랩스 수학" },
  { status: "전)", title: "김현정수학 고등부 팀장" },
  { status: "전)", title: "수학은 어렵지 않아 학원" },
  { status: "전)", title: "새움수학원" },
];

/** 지도 철학 — 학부모용 안내에 문단으로 표시됩니다 */
export const philosophy = {
  eyebrow: "지도 철학",
  title: "문제풀이 기술보다 먼저 보는 것",
  paragraphs: [
    "많은 학생들을 지도하며 깨달은 것은, 수학 문제풀이 기술보다 더 중요한 것이 학생의 학습 심리 상태라는 점입니다. 아무리 좋은 강의도 학생이 받아들일 준비가 되어 있지 않다면 효과를 내기 어렵습니다.",
    "그래서 저는 성적이 낮은 학생이라도 먼저 수학에 흥미를 느끼게 하는 데서 시작합니다. 작은 성취를 하나씩 쌓아 자기만의 성공 스토리를 만들면 자신감이 생기고, 그 자신감이 다시 공부에 대한 흥미를 키워 점점 더 잘하고 싶어집니다. 이 학업의 선순환을 학생이 스스로 만들어 갈 수 있도록 지도합니다.",
  ],
};

/** 지도 방식 3가지 — 순서를 바꾸면 화면 순서도 바뀝니다 */
export const methods: Method[] = [
  {
    id: "counseling",
    order: "01",
    title: "1:1 맞춤 상담을 통한 심리적 지원",
    summary:
      "학업 스트레스와 슬럼프의 원인을 1:1 상담으로 짚고, 수험 생활의 멘탈을 함께 관리합니다.",
    body: [
      "정기적인 1:1 상담을 통해 학업 스트레스, 불안감, 슬럼프의 원인을 정밀하게 파악합니다.",
      "단순한 강사를 넘어 든든한 페이스메이커로서 수험 생활의 멘탈을 체계적으로 관리합니다.",
    ],
  },
  {
    id: "interest",
    order: "02",
    title: "공부 흥미 유발 및 자발적 학습 태도 형성",
    summary:
      "'해볼 만한 수학'으로 느껴지는 단계별 지도로, 스스로 공부하는 습관을 만듭니다.",
    body: [
      "'어려운 수학'이 아닌 '해볼 만한 수학'으로 느껴지도록 개인별 눈높이에 맞춘 단계별 지도를 제공합니다.",
      "문제를 스스로 풀어내는 성취감을 경험하게 하여, 주도적으로 공부하는 습관을 형성합니다.",
    ],
  },
  {
    id: "results",
    order: "03",
    title: "확실한 결과로 증명하는 성적 향상",
    summary:
      "하위권의 개념 확립부터 상위권의 고난도 문제까지, 학생별 성장 로드맵을 제시합니다.",
    body: [
      "심리적 안정감과 자발적 학습이 결합하여 실제 다수 학생의 성적 향상 사례를 만들어냈습니다.",
      "하위권의 개념 확립부터 상위권의 고난도 문제 극복까지, 학생별 성장 로드맵을 제시합니다.",
    ],
  },
];
