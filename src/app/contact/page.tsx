"use client";

import { useState } from "react";
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #a0a0a0;
    opacity: 0.6;
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

  &::placeholder {
    color: #a0a0a0;
    opacity: 0.6;
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// shouldForwardProp을 사용하여 isLoading이 DOM으로 전달되지 않도록 함
const SubmitButton = styled(motion.button, {
  shouldForwardProp: (prop) => prop !== "isLoading",
})<{ isLoading?: boolean }>`
  width: 100%;
  padding: 15px;
  background: ${(props) =>
    props.isLoading
      ? theme.colors.text.secondary
      : `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`};
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: ${(props) => (props.isLoading ? "not-allowed" : "pointer")};
  transition: all ${theme.transitions.normal};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
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

// shouldForwardProp을 사용하여 type이 DOM으로 전달되지 않도록 함
const Alert = styled(motion.div, {
  shouldForwardProp: (prop) => prop !== "alertType",
})<{ alertType: "success" | "error" }>`
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: ${(props) =>
    props.alertType === "success" ? "#10b98120" : "#ef444420"};
  border: 1px solid
    ${(props) => (props.alertType === "success" ? "#10b981" : "#ef4444")};
  color: ${(props) => (props.alertType === "success" ? "#059669" : "#dc2626")};
  font-weight: 500;
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setAlert({
          type: "success",
          message:
            "문의가 성공적으로 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.",
        });
        // 폼 초기화
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        throw new Error(data.error || "문의 전송에 실패했습니다.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setAlert({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "문의 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      });
    } finally {
      setIsLoading(false);
      // 알림 메시지 자동 제거 (5초 후)
      setTimeout(() => setAlert(null), 5000);
    }
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
          {alert && (
            <Alert
              alertType={alert.type}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {alert.message}
            </Alert>
          )}

          <FormGroup>
            <Label htmlFor="name">이름 *</Label>
            <Input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isLoading}
              placeholder="홍길동"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">이메일 *</Label>
            <Input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
              placeholder="example@email.com"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="phone">연락처</Label>
            <Input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="010-1234-5678"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="message">문의 내용 *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={isLoading}
              placeholder="문의하실 내용을 자세히 작성해주세요."
            />
          </FormGroup>

          <SubmitButton
            type="submit"
            whileHover={!isLoading ? { scale: 1.02 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
            disabled={isLoading}
            isLoading={isLoading}
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                전송 중...
              </>
            ) : (
              "문의 보내기"
            )}
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
              <span>02-6031-8927</span>
            </InfoItem>
            <InfoItem>
              <InfoIcon>📧</InfoIcon>
              <span>info@easysalad.com</span>
            </InfoItem>
            <InfoItem>
              <InfoIcon>📍</InfoIcon>
              <span>서울 중구 남대문로9길 40 215호(복도 맨 끝)</span>
            </InfoItem>
            <InfoItem>
              <InfoIcon>⏰</InfoIcon>
              <span>월-금: 06:30 - 20:30</span>
            </InfoItem>
          </InfoCard>

          <MapPlaceholder></MapPlaceholder>
        </InfoSection>
      </ContentGrid>
    </Container>
  );
}
