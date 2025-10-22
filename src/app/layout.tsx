import { Metadata } from "next";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "이지샐러드 - 신선하고 건강한 샐러드 & 샌드위치 단체 배달",
  description:
    "매일 신선한 재료로 만드는 건강한 샐러드와 샌드위치. 다양한 메뉴와 단체 배달 서비스를 제공합니다.",
  keywords:
    "샐러드, 샌드위치, 건강식, 다이어트, 단체주문, 단체배달, 신선한 재료",
  openGraph: {
    title: "이지샐러드 - 신선하고 건강한 샐러드 & 샌드위치 단체 배달",
    description: "매일 신선한 재료로 만드는 건강한 샐러드와 샌드위치 단체 배달",
    type: "website",
    locale: "ko_KR",
    siteName: "이지샐러드",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
