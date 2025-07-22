"use client";

import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { theme } from "@/styles/theme";

const Container = styled.div`
  min-height: 100vh;
  padding: 120px 20px 80px;
`;

const Content = styled.div`
  max-width: 800px;
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

const Section = styled(motion.section)`
  margin-bottom: 60px;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: ${theme.colors.text.primary};
`;

const Text = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${theme.colors.text.secondary};
  margin-bottom: 20px;
`;

const ValueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const ValueCard = styled(motion.div)`
  padding: 30px;
  background-color: ${theme.colors.surface};
  border-radius: 16px;
  box-shadow: ${theme.shadows.sm};
  text-align: center;
`;

const ValueIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 15px;
`;

const ValueTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: ${theme.colors.text.primary};
`;

const ValueDescription = styled.p`
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
`;

export default function AboutPage() {
  const values = [
    {
      icon: "🌱",
      title: "신선함",
      description: "매일 새벽 공수되는 신선한 재료만을 사용합니다.",
    },
    {
      icon: "❤️",
      title: "건강",
      description: "영양 균형을 고려한 건강한 메뉴를 제공합니다.",
    },
    {
      icon: "🤝",
      title: "신뢰",
      description: "투명한 재료 공개와 위생적인 조리 환경을 약속합니다.",
    },
  ];

  return (
    <Container>
      <Content>
        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          EasySalad 소개
        </Title>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SectionTitle>우리의 이야기</SectionTitle>
          <Text>
            EasySalad는 2020년, 건강한 한 끼를 쉽고 맛있게 즐길 수 있도록 하자는
            목표로 시작되었습니다. 바쁜 현대인들에게 신선하고 영양가 높은
            샐러드와 샌드위치를 제공하여, 건강한 식습관을 만들어가는 데 도움을
            드리고자 합니다.
          </Text>
          <Text>
            우리는 단순히 음식을 판매하는 것이 아니라, 고객님들의 건강한
            라이프스타일을 함께 만들어가는 파트너가 되고자 합니다. 매일 신선한
            재료를 준비하고, 영양사와 함께 개발한 균형 잡힌 메뉴로 여러분의
            건강을 책임지겠습니다.
          </Text>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <SectionTitle>우리의 가치</SectionTitle>
          <ValueGrid>
            {values.map((value, index) => (
              <ValueCard
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <ValueIcon>{value.icon}</ValueIcon>
                <ValueTitle>{value.title}</ValueTitle>
                <ValueDescription>{value.description}</ValueDescription>
              </ValueCard>
            ))}
          </ValueGrid>
        </Section>
      </Content>
    </Container>
  );
}
