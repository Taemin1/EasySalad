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

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${theme.transitions.fast};

  &:hover {
    background-color: ${theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0.6;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>EasySalad</FooterTitle>
          <ContactInfo>건강한 한 끼의 시작</ContactInfo>
          <ContactInfo>신선한 재료로 만드는 프리미엄 샐러드</ContactInfo>
          <SocialLinks>
            <SocialLink href="#" aria-label="Instagram">
              📷
            </SocialLink>
            <SocialLink href="#" aria-label="Facebook">
              📘
            </SocialLink>
            <SocialLink href="#" aria-label="Blog">
              📝
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>빠른 링크</FooterTitle>
          <FooterLinks>
            <FooterLink href="/menu">메뉴</FooterLink>
            <FooterLink href="/about">회사 소개</FooterLink>
            <FooterLink href="/contact">문의하기</FooterLink>
            <FooterLink href="/catering">케이터링</FooterLink>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>영업 시간</FooterTitle>
          <ContactInfo>월-금: 08:00 - 20:00</ContactInfo>
          <ContactInfo>토: 09:00 - 18:00</ContactInfo>
          <ContactInfo>일: 휴무</ContactInfo>
        </FooterSection>

        <FooterSection>
          <FooterTitle>문의</FooterTitle>
          <ContactInfo>📞 02-1234-5678</ContactInfo>
          <ContactInfo>📧 info@easysalad.com</ContactInfo>
          <ContactInfo>📍 서울시 강남구 테헤란로 123</ContactInfo>
        </FooterSection>
      </FooterContent>

      <Copyright>© 2024 EasySalad. All rights reserved.</Copyright>
    </FooterContainer>
  );
}
