import { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "이지샐러드 - 신선한 샐러드 배달 서비스 | 건강한 도시락",
  description:
    "매일 신선한 재료로 만드는 건강한 샐러드와 샌드위치. 서울/인천/성남 단체주문 배달. No Sugar, 합리적 가격의 프리미엄 샐러드 전문점",
  keywords:
    "샐러드 배달, 회사 단체 주문, 샌드위치 단체 주문, 신선한 샐러드, 서울 샐러드 단체주문 배달, 이지샐러드",
  openGraph: {
    title: "이지샐러드 - 신선한 샐러드 배달 서비스",
    description:
      "매일 신선한 재료로 만드는 건강한 샐러드와 샌드위치. 서울/인천/성남 단체주문 배달 서비스",
    type: "website",
    locale: "ko_KR",
    siteName: "이지샐러드",
  },
};

export default function Home() {
  return <HomeContent />;
}
