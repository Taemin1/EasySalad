"use client";

import EmotionRegistry from "@/components/EmotionRegistry";
import GlobalStyleProvider from "@/components/GlobalStyleProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EmotionRegistry>
      <GlobalStyleProvider>
        <Header />
        <main>{children}</main>
        <Footer />
      </GlobalStyleProvider>
    </EmotionRegistry>
  );
}
