"use client";

import styled from "@emotion/styled";
import Link from "next/link";
import { theme } from "@/styles/theme";

const FooterContainer = styled.footer`
  background-color: ${theme.colors.text.primary};
  color: ${theme.colors.text.light};
  padding: 60px 20px 20px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
`;

const FooterSection = styled.div``;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: ${theme.colors.accent};
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FooterLink = styled(Link)`
  color: ${theme.colors.text.light};
  opacity: 0.8;
  transition: opacity ${theme.transitions.fast};

  &:hover {
    opacity: 1;
  }
`;

const ContactInfo = styled.p`
  margin-bottom: 10px;
  opacity: 0.8;
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0.6;

  .mobile-br {
    display: none;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    .mobile-br {
      display: inline;
    }
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>이지샐러드(ezysalad)</FooterTitle>
          <ContactInfo>사업자 등록번호 | 872-06-00727</ContactInfo>
          <ContactInfo>대표자 | 임장호</ContactInfo>
        </FooterSection>

        <FooterSection>
          <FooterTitle>빠른 링크</FooterTitle>
          <FooterLinks>
            <FooterLink href="/menu">메뉴</FooterLink>
            <FooterLink href="/about">회사 소개</FooterLink>
            <FooterLink href="/contact">문의하기</FooterLink>
            <FooterLink href="/terms">교환 및 환불 규정</FooterLink>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>영업 시간</FooterTitle>
          <ContactInfo>월-금: 08:30 - 20:00</ContactInfo>
          <ContactInfo>토, 일: 상황에 따라 오픈</ContactInfo>
        </FooterSection>

        <FooterSection>
          <FooterTitle>문의</FooterTitle>
          <ContactInfo>📞 02-6031-8927</ContactInfo>
          <ContactInfo>📧 dog1733@daum.net</ContactInfo>
          <ContactInfo>
            📍 서울 중구 남대문로9길 40 215호(복도 맨 끝)
          </ContactInfo>
        </FooterSection>
      </FooterContent>

      <Copyright>
        © 2025 이지샐러드.
        <br className="mobile-br" /> All rights reserved.
      </Copyright>
    </FooterContainer>
  );
}
