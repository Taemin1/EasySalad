// components/Footer.tsx
"use client"; // 클라이언트 컴포넌트

import React from "react";
import styled from "styled-components";
import Link from "next/link";

// --- 스타일 컴포넌트 ---
const FooterContainer = styled.footer`
  background-color: #333;
  color: #ccc;
  padding: 4rem 3rem 2rem;
  text-align: center;
  margin-top: auto;
`;

const FooterNav = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  gap: 1.5rem;

  a {
    color: #ccc;
    text-decoration: none;
    transition: color 0.3s;
    &:hover {
      color: white;
    }
  }
`;

const Copyright = styled.p`
  font-size: 0.9rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterNav>
        <Link href="/about">회사소개</Link>
        <Link href="/terms">이용약관</Link>
        <Link href="/privacy">개인정보처리방침</Link>
        <Link href="/contact">고객센터</Link>
      </FooterNav>
      <Copyright>© 2025 FreshSalad. All Rights Reserved.</Copyright>
    </FooterContainer>
  );
};

export default Footer;
