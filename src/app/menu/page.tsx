import { Metadata } from "next";
import MenuContent from "./MenuContent";

export const metadata: Metadata = {
  title: "메뉴 | ezySalad - 다양한 샐러드와 샌드위치 메뉴",
  description: "ezySalad의 신선한 샐러드, 샌드위치, 건강한 도시락 메뉴를 확인하세요. 카테고리별 메뉴와 가격 정보 제공. 다이어트 식단 추천",
  keywords: "샐러드 메뉴, 샌드위치 메뉴, 건강식 메뉴, 다이어트 도시락, 신선한 재료, 샐러드 종류, 건강한 식사",
  openGraph: {
    title: "메뉴 | ezySalad - 다양한 샐러드와 샌드위치",
    description: "신선한 재료로 만든 다양한 샐러드와 샌드위치 메뉴를 확인하세요",
    type: "website",
    locale: "ko_KR",
    siteName: "ezySalad",
  },
};

export default function MenuPage() {
  return <MenuContent />;
}
