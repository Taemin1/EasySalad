"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { theme } from "@/styles/theme";
import { supabase } from "@/../lib/supabase";
import { User } from "@supabase/supabase-js";

const Container = styled.div`
  min-height: 100vh;
  padding: 40px 20px;
  margin-top: 5rem;
  background-color: ${theme.colors.background};
`;

const Header = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
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

const LogoutButton = styled.button`
  padding: 10px 20px;
  background-color: #ff6b6b;
  color: white;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover {
    background-color: #ff5252;
    transform: translateY(-2px);
  }
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const MenuSection = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: ${theme.shadows.md};
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: ${theme.colors.text.primary};
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PlaceholderText = styled.p`
  color: ${theme.colors.text.secondary};
  text-align: center;
  padding: 40px;
  font-size: 1.1rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px;
  background: ${theme.colors.surface};
  border-radius: 8px;
`;

const UserAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${theme.colors.primary} 0%,
    ${theme.colors.secondary} 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
`;

const UserDetails = styled.div`
  h3 {
    color: ${theme.colors.text.primary};
    margin-bottom: 5px;
  }
  p {
    color: ${theme.colors.text.secondary};
    font-size: 0.9rem;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;

  &::after {
    content: "";
    width: 40px;
    height: 40px;
    border: 4px solid ${theme.colors.background};
    border-radius: 50%;
    border-top-color: ${theme.colors.primary};
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        router.push("/thisisforadmin/login");
        return;
      }

      // 관리자 권한 확인
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
      if (user.email !== adminEmail) {
        await supabase.auth.signOut();
        router.push("/thisisforadmin/login");
        return;
      }

      setUser(user);
    } catch (error) {
      console.error("Auth error:", error);
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/thisisforadmin/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    );
  }

  if (!user) {
    return null;
  }

  const userInitial = user.email?.charAt(0).toUpperCase() || "A";

  return (
    <Container>
      <Header>
        <Title>관리자 대시보드</Title>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </Header>

      <Content>
        <MenuSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <UserInfo>
            <UserAvatar>{userInitial}</UserAvatar>
            <UserDetails>
              <h3>관리자</h3>
              <p>{user.email}</p>
            </UserDetails>
          </UserInfo>
        </MenuSection>

        <MenuSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <SectionTitle>🍽️ 메뉴 관리</SectionTitle>
          <PlaceholderText>
            메뉴 관리 기능이 곧 추가될 예정입니다.
            <br />
            여기서 메뉴 추가, 수정, 삭제 및 가격 변경이 가능합니다.
          </PlaceholderText>
        </MenuSection>

        <MenuSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SectionTitle>📋 주문 관리</SectionTitle>
          <PlaceholderText>
            주문 관리 기능이 곧 추가될 예정입니다.
            <br />
            여기서 주문 현황 확인 및 상태 변경이 가능합니다.
          </PlaceholderText>
        </MenuSection>

        <MenuSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <SectionTitle>📊 통계</SectionTitle>
          <PlaceholderText>
            매출 통계 및 분석 기능이 곧 추가될 예정입니다.
            <br />
            여기서 일별/월별 매출 현황을 확인할 수 있습니다.
          </PlaceholderText>
        </MenuSection>
      </Content>
    </Container>
  );
}
