"use client";

import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { theme } from "@/styles/theme";
import { useState, useEffect } from "react";

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 160px 20px 40px 20px;
  background: linear-gradient(
    135deg,
    ${theme.colors.primary}20 0%,
    ${theme.colors.secondary}20 100%
  );

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 100px 20px 40px 20px;
  }
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 30px;
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
  max-width: 1000px;

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
  text-decoration: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const SlideShowWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    ${theme.colors.primary}20 0%,
    ${theme.colors.secondary}20 100%
  );

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 250px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 200px;
  }
`;

const SlideTrack = styled(motion.div)`
  display: flex;
  height: 100%;
`;

const Slide = styled.div`
  flex: 0 0 auto;
  width: 33.333%;
  height: 100%;
  padding: 0 10px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 50%;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
    padding: 0 5px;
  }
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const SlideButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.95);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  z-index: 2;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }

  &.prev {
    left: 20px;
  }

  &.next {
    right: 20px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 40px;
    height: 40px;

    &.prev {
      left: 10px;
    }

    &.next {
      right: 10px;
    }
  }
`;

const SlideIndicators = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 3;
`;

const Indicator = styled.button<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background-color: ${(props) =>
    props.active ? theme.colors.primary : "rgba(0, 0, 0, 0.3)"};
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover {
    background-color: ${theme.colors.primary};
  }
`;

export default function Hero() {
  const slideImages = [
    "/salad/carrot-salad.png",
    "/salad/chicken-salad.png",
    "/salad/garage-salad.png",
    "/salad/sea-salad.png",
    "/salad/ricotta-salad.png",
    "/salad/tuna-salad.png",
    "/salad/mozza-salad.png",
    "/salad/mixed-salad.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);

  // 반응형 슬라이드 개수 설정
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setSlidesPerView(1);
      } else if (window.innerWidth <= 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 자동 슬라이드
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(timer);
  }, [currentIndex, slidesPerView]);

  const maxIndex = Math.max(0, slideImages.length - slidesPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const next = prev + 1;
      return next > maxIndex ? 0 : next;
    });
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  // 인디케이터 개수 계산
  const indicatorCount = Math.ceil(slideImages.length / slidesPerView);

  return (
    <HeroSection>
      <HeroContent>
        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Ezy Salad - 건강한 하루의 시작
        </Title>

        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          건강한 식단을 위한 최선의 선택, 이지샐러드가 여러분의 식탁을 풍성하게
          채워드립니다.
          <br />
          <br />
          신선한 재료와 다양한 맛으로 한국인의 입맛에 맞춘 샐러드, 샌드위치,
          도시락을 만나보세요.
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

      <SlideShowWrapper>
        <SlideTrack
          animate={{ x: `-${currentIndex * (100 / slidesPerView)}%` }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          {slideImages.map((image, index) => (
            <Slide key={index}>
              <SlideImage
                src={image}
                alt={`샐러드 이미지 ${index + 1}`}
                loading="lazy"
              />
            </Slide>
          ))}
        </SlideTrack>

        <SlideButton
          className="prev"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </SlideButton>

        <SlideButton
          className="next"
          onClick={handleNext}
          disabled={currentIndex === maxIndex}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </SlideButton>

        <SlideIndicators>
          {Array.from({ length: indicatorCount }).map((_, index) => (
            <Indicator
              key={index}
              active={Math.floor(currentIndex / slidesPerView) === index}
              onClick={() => goToSlide(index * slidesPerView)}
            />
          ))}
        </SlideIndicators>
      </SlideShowWrapper>
    </HeroSection>
  );
}
