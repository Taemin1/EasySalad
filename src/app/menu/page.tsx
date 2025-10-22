import { Metadata } from "next";
import MenuContent from "./MenuContent";

export const metadata: Metadata = {
  title: "메뉴 | 이지샐러드 - 다양한 샐러드와 샌드위치 메뉴",
  description:
    "이지샐러드의 신선한 샐러드, 샌드위치, 디저트 메뉴를 확인하세요. 카테고리별 메뉴와 가격 정보 제공. 사이트 내 주문 가능, 단체 주문",
  keywords:
    "샐러드 메뉴, 샌드위치 메뉴, 신선한 재료, 샐러드 종류, 사이트 내 주문 가능, 단체 주문",
  openGraph: {
    title: "메뉴 | 이지샐러드 - 다양한 샐러드와 샌드위치",
    description:
      "신선한 재료로 만든 다양한 샐러드와 샌드위치 메뉴를 확인하세요",
    type: "website",
    locale: "ko_KR",
    siteName: "이지샐러드",
  },
};

export default function MenuPage() {
  return <MenuContent />;
}
