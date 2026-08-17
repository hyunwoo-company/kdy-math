/**
 * 사이트 전역 정보 — 브랜드, SEO 기본값, 상단 탭(네비게이션), 푸터, 접근성 라벨.
 *
 * 이 파일만 고치면 바뀌는 곳
 * - site.brand        → 좌측 상단 로고, 푸터, 브라우저 탭 제목 꼬리말
 * - site.brandTagline → 푸터 브랜드 아래 한 줄
 * - seo               → 홈(/)의 검색 결과 제목·설명
 * - nav               → 상단 탭의 순서와 이름 (모바일 메뉴도 같은 배열을 씁니다)
 * - footer            → 푸터의 소제목 문구
 * - a11y              → 화면에는 안 보이지만 스크린리더가 읽는 라벨
 */

/** 링크 하나 (버튼·텍스트 링크 공용) */
export type Cta = {
  /** 버튼에 보이는 글자 */
  label: string;
  /** 이동할 주소. 사이트 내부는 "/students" 처럼, 같은 페이지 안 이동은 "#methods" 처럼 씁니다 */
  href: string;
};

/** 상단 탭 한 칸 */
export type NavItem = {
  /** 라우트 주소. app 폴더의 폴더명과 일치해야 합니다 */
  href: string;
  /** 탭에 보이는 이름 */
  label: string;
};

/** 각 페이지의 검색 결과/브라우저 탭 정보 */
export type PageMeta = {
  /** 브라우저 탭에 보이는 제목 (홈을 제외하면 뒤에 브랜드명이 자동으로 붙습니다) */
  title: string;
  /** 검색 결과에 보이는 설명. 80~120자 권장 */
  description: string;
};

/** 사진 한 장. width/height 는 public/images 안 원본 크기와 같아야 합니다 */
export type Photo = {
  src: string;
  /** 사진을 볼 수 없는 사람에게 읽히는 설명 */
  alt: string;
  width: number;
  height: number;
};

/* ------------------------------------------------------------------
   여러 페이지가 함께 쓰는 조각 타입
   (아래 타입들은 home.ts / students.ts / parents.ts / contact.ts 에서 씁니다)
------------------------------------------------------------------- */

/** 페이지 맨 위 인트로 */
export type Intro = {
  /** 제목 위 작은 라벨 */
  eyebrow: string;
  /** 큰 제목. 배열의 각 항목이 한 줄로 표시됩니다 */
  title: string[];
  /** 제목 아래 설명 문단 */
  lead: string;
};

/** 섹션 머리말 */
export type SectionHeader = {
  /** 제목 위 작은 라벨 */
  eyebrow: string;
  title: string;
  /** 제목 아래 설명. 비워 두면 표시되지 않습니다 */
  lead?: string;
};

/** 카드 하나 */
export type CardItem = {
  /** 카드 맨 위 작은 라벨(번호·구분 등). 비워 두면 표시되지 않습니다 */
  label?: string;
  title: string;
  /** 본문. 배열의 각 항목이 한 문단입니다 */
  body: string[];
};

/** 라벨과 값 한 쌍 */
export type InfoItem = {
  label: string;
  value: string;
};

/** 페이지 맨 아래 상담 유도 블록 */
export type CtaBlock = {
  title: string;
  body: string;
  primaryCta: Cta;
};

export const site = {
  /** 브랜드명 — DYnamic 의 D·Y 는 강사 이름(DongYoung)의 이니셜입니다. 대소문자를 그대로 유지하세요 */
  brand: "DYnamic MATH",
  /** 푸터에서 브랜드명 아래 한 줄로 표시됩니다 */
  brandTagline: "실력을 키우고 자신감을 완성하는 수학",
};

/** 홈(/)의 검색 결과 제목·설명. 다른 탭은 각 content 파일의 meta 를 고칩니다 */
export const seo: PageMeta = {
  title: "DYnamic MATH · 김동영 수학",
  description:
    "실력을 키우고 자신감을 완성하는 수학. 흥미와 작은 성취에서 출발해 자신감과 성적 향상까지 이어지도록 지도하는 김동영 강사의 수학 수업 안내입니다.",
};

/** 홈이 아닌 탭의 브라우저 탭 제목 형식. %s 자리에 각 페이지 제목이 들어갑니다 */
export const titleTemplate = "%s · DYnamic MATH";

/** 상단 탭 목록 — 순서를 바꾸면 화면 순서도 바뀝니다 */
export const nav: NavItem[] = [
  { href: "/", label: "홈" },
  { href: "/students", label: "학생용 안내" },
  { href: "/parents", label: "학부모용 안내" },
  { href: "/videos", label: "수업 영상" },
  { href: "/contact", label: "상담 문의" },
];

export const footer = {
  /** 푸터 링크 목록 위 소제목 */
  navLabel: "둘러보기",
  /** 푸터 연락처 목록 위 소제목 */
  contactLabel: "상담 문의",
  /** 저작권 줄에 들어가는 이름 */
  copyrightName: "DYnamic MATH",
};

/** 스크린리더용 라벨 — 화면에는 보이지 않습니다 */
export const a11y = {
  navLabel: "주 메뉴",
  footerNavLabel: "푸터 메뉴",
  menuOpen: "메뉴 열기",
  menuClose: "메뉴 닫기",
};
