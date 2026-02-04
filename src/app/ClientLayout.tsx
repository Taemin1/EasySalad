"use client";

import { usePathname } from "next/navigation";
import GlobalStyleProvider from "@/components/GlobalStyleProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname.startsWith("/university")) {
    return <GlobalStyleProvider>{children}</GlobalStyleProvider>;
  }

  return (
    <GlobalStyleProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </GlobalStyleProvider>
  );
}
