/**
 * 상담 문의(/contact) 페이지 + 푸터에 쓰이는 연락처.
 *
 * ============================================================
 * 🔴🔴🔴 TODO: 실제 연락처로 교체 필요 🔴🔴🔴
 *
 * 아래 전화번호 · 이메일 · 카카오톡 채널 · 상담 시간 · 위치는
 * 전부 가짜 값(더미)입니다. 실제 정보를 받는 즉시 이 파일만 고치면
 * 상담 문의 페이지와 푸터가 함께 바뀝니다.
 *
 *   1) channels 의 phone  → value / href 를 실제 번호로
 *      (href 는 "tel:" + 하이픈 없는 번호. 예: tel:01012345678)
 *   2) channels 의 email  → value / href 를 실제 주소로
 *      (href 는 "mailto:" + 이메일 주소)
 *   3) channels 의 kakao  → 채널 주소가 확정되면 href 에 넣습니다.
 *      href 가 null 이면 링크 대신 "준비 중" 표시가 나옵니다.
 *   4) info 의 상담 시간 · 위치를 실제 값으로
 *   5) 마지막으로 notice 를 빈 문자열("")로 바꾸면
 *      "예시 값입니다" 안내 문구가 화면에서 사라집니다.
 * ============================================================
 *
 * 참고: 폼(입력창)은 만들지 않습니다. 서버 없이 동작하는 정적 사이트이므로
 *       전화 · 이메일 · 카카오톡 채널 링크로만 연결합니다.
 *       카카오톡 채널 QR 은 채널 주소가 확정된 뒤 별도로 처리합니다.
 *       (사이트 주소 QR 은 아래 qr 에 이미 있습니다)
 */

import type { InfoItem, Intro, PageMeta, Photo } from "./site";

/** 연락 수단 한 가지 */
export type ContactChannel = {
  /** 아이콘을 고르는 데 쓰이는 구분값 */
  id: "phone" | "email" | "kakao";
  /** 카드 제목 */
  label: string;
  /** 화면에 크게 보이는 값 (번호·주소 등) */
  value: string;
  /** 눌렀을 때 이동할 주소. null 이면 링크 대신 "준비 중" 표시가 나옵니다 */
  href: string | null;
  /** 값 아래 보조 설명 */
  note: string;
};

export const contact = {
  meta: {
    title: "상담 문의",
    description:
      "전화 · 이메일 · 카카오톡 채널로 상담을 문의하실 수 있습니다. 학생의 현재 상태와 목표를 듣고 필요한 것부터 안내드립니다.",
  } satisfies PageMeta,

  intro: {
    eyebrow: "상담 문의",
    title: ["상담은 언제든", "편하게 연락 주세요"],
    lead:
      "학생의 학년과 현재 성적, 막히는 단원을 함께 알려주시면 첫 상담에서 더 구체적으로 안내드릴 수 있습니다.",
  } satisfies Intro,

  /** 연락처 목록 위 소제목 */
  channelsTitle: "연락 방법",

  channels: [
    {
      id: "phone",
      label: "전화",
      // TODO: 실제 연락처로 교체 필요
      value: "010-0000-0000",
      // TODO: 실제 연락처로 교체 필요
      href: "tel:01000000000",
      note: "수업 중에는 받기 어렵습니다. 문자를 남겨 주시면 회신드립니다.",
    },
    {
      id: "email",
      label: "이메일",
      // TODO: 실제 연락처로 교체 필요
      value: "example@example.com",
      // TODO: 실제 연락처로 교체 필요
      href: "mailto:example@example.com",
      note: "학생 학년과 최근 성적을 함께 적어 주시면 더 정확히 답변드립니다.",
    },
    {
      id: "kakao",
      label: "카카오톡 채널",
      // TODO: 실제 채널 주소로 교체 필요
      value: "채널 개설 준비 중",
      // 주소가 확정되면 "https://pf.kakao.com/..." 형태로 넣습니다
      href: null,
      note: "채널이 열리면 이곳에서 바로 연결됩니다.",
    },
  ] satisfies ContactChannel[],

  /** 안내 목록 위 소제목 */
  infoTitle: "상담 안내",

  info: [
    // TODO: 실제 상담 시간으로 교체 필요
    { label: "상담 시간", value: "평일 00:00 – 00:00 · 주말 00:00 – 00:00" },
    // TODO: 실제 위치로 교체 필요
    { label: "위치", value: "서울시 ○○구 ○○동 (자세한 위치는 상담 시 안내)" },
    { label: "상담 방식", value: "전화 상담 또는 방문 상담" },
    { label: "소요 시간", value: "30분 내외" },
  ] satisfies InfoItem[],

  /**
   * 사이트 주소로 연결되는 QR 코드 (상담 문의 페이지 맨 아래).
   *
   * 데스크톱으로 보시던 분이 휴대폰으로 이어 보거나, 다른 학부모에게
   * 주소를 알려줄 때 쓰는 보조 수단입니다. 그래서 연락 방법 아래에 둡니다.
   *
   * ⚠️ 이미지 파일(public/qr/)은 scripts/generate-qr.js 로 만들어 둔 것입니다.
   *    사이트 주소가 바뀌면 그 스크립트의 SITE_URL 을 고쳐 다시 만들고,
   *    아래 url 문구도 함께 고쳐야 합니다. (둘이 어긋나면 안 됩니다)
   *    파일을 내려받는 링크는 두지 않습니다 — 방문자에게는 필요하지 않습니다.
   */
  qr: {
    title: "휴대폰으로 이어서 보기",
    description:
      "휴대폰 카메라로 아래 QR 코드를 비추면 이 사이트가 바로 열립니다. 다른 분께 주소를 알려주실 때도 이 화면을 보여주시면 됩니다.",
    /** QR 코드 아래에 함께 보이는 주소. 스캔이 어려울 때 직접 입력할 수 있게 둡니다 */
    url: "kdy-math.vercel.app",
    /**
     * 화면 표시는 벡터(SVG)를 씁니다 — 확대해도 깨지지 않습니다.
     * width/height 는 site-qr.svg 의 viewBox(33×33 모듈)와 같은 값이며,
     * 실제 표시 크기가 아니라 가로세로 비율(1:1)을 알려주는 용도입니다.
     */
    image: {
      src: "/qr/site-qr.svg",
      alt: "사이트 주소 kdy-math.vercel.app 로 연결되는 QR 코드",
      width: 33,
      height: 33,
    } satisfies Photo,
  },

  /**
   * 페이지 상단에 표시되는 임시 안내.
   * 실제 연락처로 교체한 뒤 빈 문자열("")로 바꾸면 사라집니다.
   */
  notice:
    "아래 연락처와 상담 시간은 예시 값입니다. 실제 정보가 확정되면 교체됩니다.",
};
