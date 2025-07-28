"use client";

import styled from "@emotion/styled";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import { menuData } from "@/data/menuData";
import { theme } from "@/styles/theme";

const Container = styled.div`
  min-height: 100vh;
`;

const FeaturesSection = styled.section`
  padding: 80px 20px;
  background-color: ${theme.colors.surface};
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
`;

const FeatureCard = styled(motion.div)`
  text-align: center;
  padding: 40px 20px;
  border-radius: 16px;
  background: linear-gradient(
    135deg,
    ${theme.colors.background} 0%,
    ${theme.colors.surface} 100%
  );
  box-shadow: ${theme.shadows.md};
  transition: transform ${theme.transitions.normal},
    box-shadow ${theme.transitions.normal};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  background: linear-gradient(
    135deg,
    ${theme.colors.primary} 0%,
    ${theme.colors.secondary} 100%
  );
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: ${theme.colors.text.primary};
`;

const FeatureDescription = styled.p`
  color: ${theme.colors.text.secondary};
  line-height: 1.8;
`;

const MenuPreview = styled.section`
  padding: 2rem 6rem;
  background-color: ${theme.colors.background};
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 60px;
  color: ${theme.colors.text.primary};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

export default function Home() {
  const features = [
    {
      icon: "🥗",
      title: "신선한 재료",
      description: "매일 아침 신선한 재료를 준비하여 최상의 맛을 제공합니다.",
    },
    {
      icon: "🌿",
      title: "건강한 선택",
      description: "영양가 높은 재료로 구성된 다양한 건강 메뉴를 만나보세요.",
    },
    {
      icon: "🚚",
      title: "케이터링 서비스",
      description:
        "회사 조식부터 파티 케이터링까지 맞춤형 서비스를 제공합니다.",
    },
  ];

  const featuredCategories = menuData.slice(0, 3);

  return (
    <Container>
      <Hero />

      <FeaturesSection>
        <FeaturesContainer>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesContainer>
      </FeaturesSection>

      <MenuPreview>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          인기 메뉴
        </SectionTitle>

        {featuredCategories.map((category, index) => (
          <CategorySection
            key={category.id}
            category={category}
            delay={index * 0.2}
          />
        ))}
      </MenuPreview>
    </Container>
  );
}
