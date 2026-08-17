/**
 * 콘텐츠 진입점.
 *
 * 화면에 보이는 모든 문구는 content 폴더 안에만 있습니다.
 * 컴포넌트와 페이지는 반드시 이 파일을 통해서만 가져옵니다. ( import { home } from "@/content" )
 *
 * 어디를 고쳐야 하는지
 * - site.ts       브랜드명, 검색 결과 제목, 상단 탭 이름, 푸터
 * - instructor.ts 강사 이름·슬로건·사진·학력·경력·지도 철학·지도 방식 3가지
 * - home.ts       홈(/)
 * - students.ts   학생용 안내(/students)
 * - parents.ts    학부모용 안내(/parents)
 * - videos.ts     수업 영상(/videos) — 영상 추가 방법이 파일 맨 위에 적혀 있습니다
 * - contact.ts    상담 문의(/contact) — 🔴 실제 연락처로 교체가 필요합니다
 */

export * from "./site";
export * from "./instructor";
export * from "./home";
export * from "./students";
export * from "./parents";
export * from "./videos";
export * from "./contact";
