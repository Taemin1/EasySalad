"use client";

import { useState } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
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

const LoginCard = styled(motion.div)`
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

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: #e0e0e0;
  }
`;

const DividerText = styled.span`
  color: ${theme.colors.text.secondary};
  font-size: 0.9rem;
`;

const SignupLink = styled(Link)`
  width: 100%;
  padding: 1rem;
  background: transparent;
  border: 2px solid #667eea;
  border-radius: 10px;
  color: #667eea;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  text-align: center;
  text-decoration: none;
  display: block;

  &:hover {
    background: #667eea;
    color: white;
  }
`;

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "올바른 이메일 주소를 입력해주세요.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "비밀번호를 입력해주세요.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email.trim(),
        password: formData.password.trim(),
      });

      if (error) {
        setErrors({ general: "이메일 또는 비밀번호가 올바르지 않습니다." });
        return;
      }

      if (data.user) {
        alert("로그인에 성공했습니다.");
        router.push("/university/duksung");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ general: "로그인 중 오류가 발생했습니다." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <LoginCard
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>로그인</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@university.ac.kr"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) {
                  const { email, ...rest } = errors;
                  setErrors(rest);
                }
              }}
              $hasError={!!errors.email}
              disabled={isLoading}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
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
            {isLoading ? "로그인 중..." : "로그인"}
          </SubmitButton>
        </Form>

        <Divider>
          <DividerText>또는</DividerText>
        </Divider>

        <SignupLink href="/university/signup">
          계정이 없으신가요? 회원가입
        </SignupLink>
      </LoginCard>
    </Container>
  );
};

export default LoginPage;
