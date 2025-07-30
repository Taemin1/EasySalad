"use client";

import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { theme } from "@/styles/theme";

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    ${theme.colors.primary}20 0%,
    ${theme.colors.secondary}20 100%
  );
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 2;
  padding: 20px;
  max-width: 800px;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 20px;
  background: linear-gradient(
    135deg,
    ${theme.colors.primary} 0%,
    ${theme.colors.secondary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 3rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: 40px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.2rem;
  }
`;

const CTAButton = styled(motion.a)`
  display: inline-block;
  padding: 15px 40px;
  background: linear-gradient(
    135deg,
    ${theme.colors.primary} 0%,
    ${theme.colors.secondary} 100%
  );
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 50px;
  box-shadow: ${theme.shadows.md};
  transition: all ${theme.transitions.normal};
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  font-size: 4rem;
  opacity: 0.2;
  user-select: none;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 3rem;
  }
`;

export default function Hero() {
  const floatingItems = [
    { emoji: "🥗", x: "10%", y: "20%" },
    { emoji: "🥪", x: "80%", y: "15%" },
    { emoji: "🥑", x: "15%", y: "70%" },
    { emoji: "🍅", x: "75%", y: "60%" },
    { emoji: "🥬", x: "90%", y: "40%" },
    { emoji: "🥕", x: "5%", y: "45%" },
  ];

  return (
    <HeroSection>
      {floatingItems.map((item, index) => (
        <FloatingElement
          key={index}
          style={{ left: item.x, top: item.y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item.emoji}
        </FloatingElement>
      ))}

      <HeroContent>
        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          신선함이 가득한 Ezy Salad
        </Title>

        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          매일 신선한 재료로 만드는 건강한 샐러드와 샌드위치
        </Subtitle>

        <CTAButton
          href="/menu"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          메뉴 보기
        </CTAButton>
      </HeroContent>
    </HeroSection>
  );
}
