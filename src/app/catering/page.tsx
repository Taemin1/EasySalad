import { notFound } from "next/navigation";

// 회사 스낵 서비스 개발 중단으로 페이지 비공개 처리
// 재개 시 notFound() 대신 <CateringContent />를 렌더링하고 Header 메뉴, sitemap에 다시 추가
export default function CateringPage() {
  notFound();
}
