import { Metadata } from "next";
import GlobalStyleProvider from "@/components/GlobalStyleProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "EasySalad - 신선하고 건강한 샐러드 & 샌드위치",
  description:
    "매일 신선한 재료로 만드는 건강한 샐러드와 샌드위치. 다양한 메뉴와 케이터링 서비스를 제공합니다.",
  keywords: "샐러드, 샌드위치, 건강식, 다이어트, 케이터링, 도시락, 신선한 재료",
  openGraph: {
    title: "EasySalad - 신선하고 건강한 샐러드 & 샌드위치",
    description: "매일 신선한 재료로 만드는 건강한 샐러드와 샌드위치",
    type: "website",
    locale: "ko_KR",
    siteName: "EasySalad",
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
        <GlobalStyleProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </GlobalStyleProvider>
      </body>
    </html>
  );
}
