"use client";

import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { theme } from "@/styles/theme";

const Container = styled.div`
  min-height: 100vh;
  padding: 120px 20px 80px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 60px;
  background: linear-gradient(
    135deg,
    ${theme.colors.primary} 0%,
    ${theme.colors.secondary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ContactForm = styled(motion.form)`
  background-color: ${theme.colors.surface};
  padding: 40px;
  border-radius: 16px;
  box-shadow: ${theme.shadows.md};
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${theme.colors.background};
  border-radius: 8px;
  font-size: 1rem;
  transition: all ${theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${theme.colors.background};
  border-radius: 8px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all ${theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 15px;
  background: linear-gradient(
    135deg,
    ${theme.colors.primary} 0%,
    ${theme.colors.secondary} 100%
  );
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all ${theme.transitions.normal};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
`;

const InfoSection = styled(motion.div)``;

const InfoCard = styled.div`
  background-color: ${theme.colors.surface};
  padding: 30px;
  border-radius: 16px;
  box-shadow: ${theme.shadows.sm};
  margin-bottom: 30px;
`;

const InfoTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: ${theme.colors.text.primary};
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  color: ${theme.colors.text.secondary};
`;

const InfoIcon = styled.span`
  font-size: 1.5rem;
  margin-right: 15px;
`;

const MapPlaceholder = styled.div`
  width: 100%;
  height: 300px;
  background: linear-gradient(
    135deg,
    ${theme.colors.primary}20 0%,
    ${theme.colors.secondary}20 100%
  );
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: ${theme.colors.text.secondary};
`;

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 폼 제출 로직
    alert("문의가 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.");
  };

  return (
    <Container>
      <Title
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        문의하기
      </Title>

      <ContentGrid>
        <ContactForm
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
        >
          <FormGroup>
            <Label htmlFor="name">이름</Label>
            <Input type="text" id="name" required />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">이메일</Label>
            <Input type="email" id="email" required />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="phone">연락처</Label>
            <Input type="tel" id="phone" />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="message">문의 내용</Label>
            <Textarea id="message" required />
          </FormGroup>

          <SubmitButton
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            문의 보내기
          </SubmitButton>
        </ContactForm>

        <InfoSection
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <InfoCard>
            <InfoTitle>연락처 정보</InfoTitle>
            <InfoItem>
              <InfoIcon>📞</InfoIcon>
              <span>02-1234-5678</span>
            </InfoItem>
            <InfoItem>
              <InfoIcon>📧</InfoIcon>
              <span>info@easysalad.com</span>
            </InfoItem>
            <InfoItem>
              <InfoIcon>📍</InfoIcon>
              <span>서울시 강남구 테헤란로 123</span>
            </InfoItem>
            <InfoItem>
              <InfoIcon>⏰</InfoIcon>
              <span>월-금: 08:00 - 20:00</span>
            </InfoItem>
          </InfoCard>

          <MapPlaceholder>🗺️ 지도 영역</MapPlaceholder>
        </InfoSection>
      </ContentGrid>
    </Container>
  );
}
