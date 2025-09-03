"use client";

import styled from "@emotion/styled";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import { menuData } from "@/data/menuData";
import { theme } from "@/styles/theme";
import Image from "next/image";

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
  padding: 2rem 1.25rem;
  background-color: ${theme.colors.background};

  @media (min-width: ${theme.breakpoints.tablet}) {
    padding: 2rem 6rem;
  }
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
      image: (
        <Image src="/no-sugar.png" alt="No Sugar" width={80} height={80} />
      ),
      title: "No Sugar로 건강하게",
      description: (
        <>
          보다 건강하고 가치있는 샐러드를 제공하기
          <br />
          위해 토핑과 드레싱에 설탕을
          <br />
          사용하지 않았습니다.
        </>
      ),
    },
    {
      image: <Image src="/no-time.png" alt="No Time" width={80} height={80} />,
      title: "바로 만들어서 간편하게",
      description: (
        <>
          주문 즉시 매장에서 바로 만들어주는
          <br />
          시스템으로 신선한 샐러드를 빠르고 간편하게
          <br />
          즐길 수 있습니다.
        </>
      ),
    },
    {
      image: (
        <Image src="/no-money.png" alt="No Money" width={80} height={80} />
      ),
      title: "합리적인 가격으로 부담없이",
      description: (
        <>
          좋은 재료로 건강하고 맛있는 샐러드를
          <br />
          만들고 가장 합리적인 가격으로 내놓기 위해
          <br />
          노력합니다.
        </>
      ),
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
              <FeatureIcon>{feature.image}</FeatureIcon>
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
