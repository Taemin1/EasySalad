"use client";

import GlobalStyleProvider from "@/components/GlobalStyleProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalStyleProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </GlobalStyleProvider>
  );
}
