// components/Header.tsx
"use client"; // 상호작용이 있으므로 클라이언트 컴포넌트

import React from "react";
import styled from "styled-components";
import Link from "next/link";

// --- 스타일 컴포넌트 ---
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 3rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }
`;

const Logo = styled.h1`
  font-size: 1.8rem;
  font-weight: 800;
  color: #4caf50;
  cursor: pointer;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;

  a {
    text-decoration: none;
    color: #555;
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover {
      color: #4caf50;
    }
  }
`;

const CTAButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #45a049;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Link href="/">
        <Logo>FreshSalad</Logo>
      </Link>
      <Nav>
        <Link href="/#menu">메뉴</Link>
        <Link href="/#special">스페셜</Link>
        <Link href="/delivery">배송안내</Link>
        <CTAButton>주문하기</CTAButton>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
