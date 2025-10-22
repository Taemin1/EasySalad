import { Metadata } from "next";
import CateringContent from "./CateringContent";

export const metadata: Metadata = {
  title: "케이터링 | 이지샐러드 - 회사 스낵 서비스 개발 예정",
  description:
    "이지샐러드의 회사 스낵 서비스가 곧 출시됩니다. 기업 케이터링, 사무실 간식 서비스, 이지밀 브랜드로 새로운 서비스를 준비중입니다",
  keywords:
    "회사 케이터링, 사무실 간식, 기업 스낵 서비스, 이지밀, 회사 도시락, 사내 복지",
  openGraph: {
    title: "케이터링 | 이지샐러드 - 회사 스낵 서비스",
    description: "회사 스낵 서비스 개발 예정 - 기업 케이터링 전문 서비스",
    type: "website",
    locale: "ko_KR",
    siteName: "이지샐러드",
  },
};

export default function CateringPage() {
  return <CateringContent />;
}
