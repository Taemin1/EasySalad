"use client";

import { useState } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { theme } from "@/styles/theme";
import { createClient } from "@/../lib/supabase/client";
import isPropValid from "@emotion/is-prop-valid";

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const SignupCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 2rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.colors.text.primary};
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: ${theme.colors.text.primary};
  font-size: 0.95rem;
`;

const Select = styled.select<{ $hasError?: boolean }>`
  padding: 0.875rem;
  border: 2px solid ${({ $hasError }) => ($hasError ? "#ff6b6b" : "#e0e0e0")};
  border-radius: 10px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ $hasError }) => ($hasError ? "#ff6b6b" : "#667eea")};
    box-shadow: 0 0 0 3px
      ${({ $hasError }) =>
        $hasError ? "rgba(255, 107, 107, 0.1)" : "rgba(102, 126, 234, 0.1)"};
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const Input = styled.input<{ $hasError?: boolean }>`
  padding: 0.875rem;
  border: 2px solid ${({ $hasError }) => ($hasError ? "#ff6b6b" : "#e0e0e0")};
  border-radius: 10px;
  font-size: 1rem;
  transition: all ${theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ $hasError }) => ($hasError ? "#ff6b6b" : "#667eea")};
    box-shadow: 0 0 0 3px
      ${({ $hasError }) =>
        $hasError ? "rgba(255, 107, 107, 0.1)" : "rgba(102, 126, 234, 0.1)"};
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const EmailInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const EmailInput = styled(Input)`
  flex: 1;
`;

const EmailDomain = styled.span`
  color: ${theme.colors.text.secondary};
  font-size: 1rem;
  font-weight: 500;
  white-space: nowrap;
`;

const ErrorMessage = styled.span`
  color: #ff6b6b;
  font-size: 0.85rem;
`;

const SubmitButton = styled(motion.button, {
  shouldForwardProp: (prop) =>
    isPropValid(prop) && prop !== "$isLoading" && prop !== "isLoading",
})<{ $isLoading?: boolean }>`
  padding: 1rem;
  background: ${({ $isLoading }) =>
    $isLoading
      ? theme.colors.text.secondary
      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"};
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: ${({ $isLoading }) => ($isLoading ? "not-allowed" : "pointer")};
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff40;
  border-radius: 50%;
  border-top-color: #ffffff;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const SuccessMessage = styled(motion.div)`
  text-align: center;
  padding: 2rem;
`;

const SuccessIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const SuccessTitle = styled.h2`
  font-size: 1.8rem;
  color: #667eea;
  margin-bottom: 1rem;
`;

const SuccessText = styled.p`
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const BackButton = styled(motion.button)`
  padding: 0.875rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
`;

const UNIVERSITIES = {
  kwangwoon: { name: "광운대학교", domain: "@kw.ac.kr" },
  duksung: { name: "덕성여자대학교", domain: "@ds.ac.kr" },
};

const SignupPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [formData, setFormData] = useState({
    university: "",
    name: "",
    emailLocal: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const getEmailDomain = () => {
    if (formData.university === "kwangwoon")
      return UNIVERSITIES.kwangwoon.domain;
    if (formData.university === "duksung") return UNIVERSITIES.duksung.domain;
    return "";
  };

  const getFullEmail = () => {
    return formData.emailLocal + getEmailDomain();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.university) {
      newErrors.university = "학교를 선택해주세요.";
    }

    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요.";
    }

    if (!formData.emailLocal.trim()) {
      newErrors.emailLocal = "이메일 아이디를 입력해주세요.";
    } else if (!/^[a-zA-Z0-9._-]+$/.test(formData.emailLocal)) {
      newErrors.emailLocal = "올바른 이메일 형식이 아닙니다.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "연락처를 입력해주세요.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (formData.password.length < 6) {
      newErrors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "비밀번호 확인을 입력해주세요.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const fullEmail = getFullEmail();
      const supabase = createClient();

      // Supabase Auth로 회원가입
      const { data, error } = await supabase.auth.signUp({
        email: fullEmail,
        password: formData.password.trim(),
        options: {
          data: {
            name: formData.name.trim(),
            phone: formData.phone.trim(),
            university:
              formData.university === "kwangwoon"
                ? UNIVERSITIES.kwangwoon.name
                : UNIVERSITIES.duksung.name,
          },
        },
      });

      console.log("=== 회원가입 응답 ===");
      console.log("Data:", data);
      console.log("Error:", error);
      console.log("User:", data.user);

      if (error) {
        console.error("회원가입 에러:", error.message);
        setErrors({ general: error.message });
        return;
      }

      if (data.user) {
        setSignupSuccess(true);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrors({ general: "회원가입 중 오류가 발생했습니다." });
    } finally {
      setIsLoading(false);
    }
  };

  if (signupSuccess) {
    return (
      <Container>
        <SignupCard
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SuccessMessage
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SuccessIcon>✅</SuccessIcon>
            <SuccessTitle>회원가입 완료!</SuccessTitle>
            <SuccessText>
              {formData.name}님, 환영합니다!
              <br />
              이메일을 확인하여 계정을 인증해주세요.
            </SuccessText>
            <BackButton
              onClick={() => router.push("/university/login")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              로그인하기
            </BackButton>
          </SuccessMessage>
        </SignupCard>
      </Container>
    );
  }

  return (
    <Container>
      <SignupCard
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>회원가입</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="university">학교</Label>
            <Select
              id="university"
              value={formData.university}
              onChange={(e) => {
                setFormData({ ...formData, university: e.target.value });
                if (errors.university) {
                  const { university, ...rest } = errors;
                  setErrors(rest);
                }
              }}
              $hasError={!!errors.university}
              disabled={isLoading}
            >
              <option value="">학교를 선택해주세요</option>
              <option value="kwangwoon">{UNIVERSITIES.kwangwoon.name}</option>
              <option value="duksung">{UNIVERSITIES.duksung.name}</option>
            </Select>
            {errors.university && (
              <ErrorMessage>{errors.university}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              type="text"
              placeholder="홍길동"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) {
                  const { name, ...rest } = errors;
                  setErrors(rest);
                }
              }}
              $hasError={!!errors.name}
              disabled={isLoading}
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="emailLocal">이메일</Label>
            <EmailInputGroup>
              <EmailInput
                id="emailLocal"
                type="text"
                placeholder="아이디"
                value={formData.emailLocal}
                onChange={(e) => {
                  setFormData({ ...formData, emailLocal: e.target.value });
                  if (errors.emailLocal) {
                    const { emailLocal, ...rest } = errors;
                    setErrors(rest);
                  }
                }}
                $hasError={!!errors.emailLocal}
                disabled={isLoading || !formData.university}
              />
              <EmailDomain>{getEmailDomain()}</EmailDomain>
            </EmailInputGroup>
            {errors.emailLocal && (
              <ErrorMessage>{errors.emailLocal}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="phone">연락처</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="010-1234-5678"
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
                if (errors.phone) {
                  const { phone, ...rest } = errors;
                  setErrors(rest);
                }
              }}
              $hasError={!!errors.phone}
              disabled={isLoading}
            />
            {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="최소 6자 이상"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                if (errors.password) {
                  const { password, ...rest } = errors;
                  setErrors(rest);
                }
              }}
              $hasError={!!errors.password}
              disabled={isLoading}
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData({ ...formData, confirmPassword: e.target.value });
                if (errors.confirmPassword) {
                  const { confirmPassword, ...rest } = errors;
                  setErrors(rest);
                }
              }}
              $hasError={!!errors.confirmPassword}
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
            )}
          </FormGroup>

          {errors.general && (
            <ErrorMessage style={{ textAlign: "center" }}>
              {errors.general}
            </ErrorMessage>
          )}

          <SubmitButton
            type="submit"
            $isLoading={isLoading}
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
          >
            {isLoading && <LoadingSpinner />}
            {isLoading ? "회원가입 중..." : "회원가입"}
          </SubmitButton>
        </Form>
      </SignupCard>
    </Container>
  );
};

export default SignupPage;
