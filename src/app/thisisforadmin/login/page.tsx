"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { theme } from "@/styles/theme";
import { createClient } from "@/../lib/supabase/client";
import isPropValid from "@emotion/is-prop-valid";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${theme.colors.primary}20 0%,
    ${theme.colors.secondary}20 100%
  );
  padding: 20px;
`;

const LoginCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: ${theme.shadows.lg};
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 30px;
  color: ${theme.colors.text.primary};
  background: linear-gradient(
    135deg,
    ${theme.colors.primary} 0%,
    ${theme.colors.secondary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  color: ${theme.colors.text.primary};
`;

const Input = styled.input<{ $hasError?: boolean }>`
  padding: 12px 16px;
  border: 2px solid
    ${(props) => (props.$hasError ? "#ff6b6b" : theme.colors.background)};
  border-radius: 8px;
  font-size: 1rem;
  transition: all ${theme.transitions.fast};
  background-color: ${theme.colors.surface};

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.$hasError ? "#ff6b6b" : theme.colors.primary};
  }

  &::placeholder {
    color: ${theme.colors.text.secondary};
  }
`;

const ErrorMessage = styled.span`
  color: #ff6b6b;
  font-size: 0.85rem;
`;

const LoginButton = styled(motion.button, {
  shouldForwardProp: (prop) =>
    isPropValid(prop) && prop !== "$isLoading" && prop !== "isLoading",
})<{ $isLoading?: boolean }>`
  width: 100%;
  padding: 15px;
  background: ${({ $isLoading }) =>
    $isLoading
      ? theme.colors.text.secondary
      : `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`};
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: ${({ $isLoading }) => ($isLoading ? "not-allowed" : "pointer")};
  transition: all ${theme.transitions.normal};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    transform: ${({ $isLoading }) =>
      $isLoading ? "none" : "translateY(-2px)"};
    box-shadow: ${({ $isLoading }) => ($isLoading ? "none" : theme.shadows.md)};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
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

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // 입력 검증
    const newErrors: typeof errors = {};
    if (!email.trim()) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "올바른 이메일 주소를 입력해주세요.";
    }

    if (!password.trim()) {
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
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        setErrors({ general: "이메일 또는 비밀번호가 올바르지 않습니다." });
        return;
      }

      if (data.user) {
        // 관리자 계정 확인 (환경변수에서 관리자 이메일 확인)
        const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

        if (data.user.email !== adminEmail) {
          await supabase.auth.signOut();
          setErrors({ general: "관리자 권한이 없습니다." });
          return;
        }

        // 관리자 대시보드로 이동
        router.push("/thisisforadmin/dashboard");
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>관리자 로그인</Title>
        <Form onSubmit={handleLogin}>
          <FormGroup>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors((prev) => ({ ...prev, email: undefined }));
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
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) {
                  setErrors((prev) => ({ ...prev, password: undefined }));
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

          <LoginButton
            type="submit"
            $isLoading={isLoading}
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
          >
            {isLoading && <LoadingSpinner />}
            {isLoading ? "로그인 중..." : "로그인"}
          </LoginButton>
        </Form>
      </LoginCard>
    </Container>
  );
}
