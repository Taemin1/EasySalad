"use client";

import { useState, useEffect } from "react";

export default function TestPage() {
  const [data, setData] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 클라이언트에서만 실행되는 로직
    setData("클라이언트에서 로딩된 데이터");
    setMounted(true);
  }, []);

  return (
    <div style={{ padding: "50px" }}>
      <h1>SSR 테스트 페이지</h1>

      <div style={{ border: "1px solid red", padding: "10px", margin: "10px" }}>
        <h3>정적 콘텐츠 (서버에서 렌더링)</h3>
        <p>이 텍스트는 서버에서 미리 렌더링됩니다</p>
      </div>

      <div style={{ border: "1px solid blue", padding: "10px", margin: "10px" }}>
        <h3>useEffect로 로딩되는 콘텐츠</h3>
        <p>데이터: {data || "로딩 중..."}</p>
        <p>마운트 상태: {mounted ? "마운트됨" : "마운트 안됨"}</p>
      </div>

      <div style={{ border: "1px solid green", padding: "10px", margin: "10px" }}>
        <h3>조건부 렌더링</h3>
        {mounted ? (
          <p>✅ 클라이언트에서만 보이는 내용</p>
        ) : (
          <p>⏳ 서버/클라이언트 초기 상태</p>
        )}
      </div>
    </div>
  );
}