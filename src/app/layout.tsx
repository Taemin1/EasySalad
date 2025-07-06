import type { Metadata } from "next";
import Header from "../components/Header"; // 경로 주의
import Footer from "../components/Footer"; // 경로 주의

export const metadata: Metadata = {
  title: "FreshSalad | 매일 만나는 신선함",
  description:
    "매일 아침 가장 신선한 재료로 만드는 건강한 샐러드를 만나보세요.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        <style>
          {`
            body {
              margin: 0;
              background-color: #FCFDF8;
              color: #333;
              font-family: 'Pretendard', sans-serif;
            }
          `}
        </style>
      </head>
      <body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Header />
          <main style={{ flex: "1" }}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
