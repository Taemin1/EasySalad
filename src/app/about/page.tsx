import { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "회사소개 | ㈜HNL - ezySalad 운영사",
  description: "2012년부터 건강한 샐러드를 제공하는 ㈜HNL 소개. SK, 신세계백화점, 대통령실 납품 실적을 보유한 샐러드 전문 기업. 이지밀 브랜드 개발",
  keywords: "㈜HNL, ezySalad, 이지샐러드, 샐러드 전문기업, 기업 케이터링, SK 납품, 신세계백화점, 대통령실 납품, 이지밀",
  openGraph: {
    title: "회사소개 | ㈜HNL - ezySalad 운영사",
    description: "2012년부터 건강한 샐러드를 제공하는 샐러드 전문 기업",
    type: "website",
    locale: "ko_KR",
    siteName: "ezySalad",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
