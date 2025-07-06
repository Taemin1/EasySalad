// app/page.tsx
"use client"; // 동적 효과 및 상호작용을 위해 클라이언트 컴포넌트로 선언

import Image from "next/image";
import styled, { keyframes } from "styled-components";

// --- 임시 데이터 및 타입 (기존과 동일) ---
const salads = [
  {
    id: 1,
    name: "리코타 치즈 샐러드",
    description: "신선한 리코타 치즈와 상큼한 베리가 어우러진 샐러드",
    price: "12,000원",
    imageUrl: "/images/ricotta-salad.jpg",
  },
  {
    id: 2,
    name: "그릴드 치킨 샐러드",
    description: "담백한 그릴드 치킨과 아삭한 채소의 완벽한 조화",
    price: "11,500원",
    imageUrl: "/images/chicken-salad.jpg",
  },
  {
    id: 3,
    name: "아보카도 쉬림프 샐러드",
    description: "부드러운 아보카도와 탱글한 쉬림프의 만남",
    price: "13,500원",
    imageUrl: "/images/avocado-shrimp.jpg",
  },
  {
    id: 4,
    name: "시저 샐러드",
    description: "클래식한 맛, 로메인과 크루통, 시저 드레싱",
    price: "10,000원",
    imageUrl: "/images/caesar-salad.jpg",
  },
];

const seasonalSpecials = [
  {
    id: 1,
    name: "봄 시즌 한정: 딸기 루꼴라 샐러드",
    description:
      "제철 딸기와 향긋한 루꼴라, 발사믹 글레이즈로 마무리한 스페셜 샐러드",
    imageUrl: "/images/spring-special.jpg",
  },
  {
    id: 2,
    name: "여름 시즌 한정: 수박 페타치즈 샐러드",
    description:
      "시원한 수박과 짭짤한 페타치즈의 의외의 조합! 더위를 잊게 할 맛",
    imageUrl: "/images/summer-special.jpg",
  },
];

interface Salad {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
}
interface SpecialSalad {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

// --- 스타일 컴포넌트 (페이지 전용) ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const HeroSection = styled.section`
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
  color: white;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 2;
  }
`;

const HeroVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: 1;
  transform: translateX(-50%) translateY(-50%);
  object-fit: cover;
`;

const HeroContent = styled.div`
  z-index: 3;
  animation: ${fadeIn} 1.5s ease-out;
  max-width: 800px;
  padding: 0 1rem;
`;

const HeroTitle = styled.h2`
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 1rem;
  text-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 2rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const HeroCTAButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #45a049;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);
  }
`;

const Section = styled.section`
  padding: 6rem 3rem;

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 4rem;
  font-weight: 800;
  color: #333;
`;

const SaladGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
`;

const SaladCard = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
  }
`;

const CardImage = styled.div`
  width: 100%;
  padding-top: 66.66%; /* 3:2 Aspect Ratio */
  position: relative;

  img {
    transition: transform 0.4s ease;
  }

  ${SaladCard}:hover & img {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const SaladName = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const SaladDescription = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const SaladPrice = styled.span`
  font-size: 1.5rem;
  font-weight: 800;
  color: #4caf50;
`;

const AddToCartButton = styled.button`
  background-color: #ffc107;
  color: #333;
  padding: 0.7rem 1.2rem;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ffb300;
    transform: scale(1.05);
  }
`;

const SpecialSection = styled(Section)`
  background-color: #f0f5f0;
`;

const SpecialGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const SpecialCard = styled.div`
  background: linear-gradient(135deg, #66bb6a, #43a047);
  color: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(76, 175, 80, 0.3);
`;

const SpecialName = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const SpecialDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
`;

const SpecialImage = styled.div`
  border-radius: 20px;
  overflow: hidden;
  height: 400px;
  position: relative;
  width: 100%;
`;

export default function HomePage() {
  return (
    <>
      <HeroSection>
        <HeroVideo
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero-poster.jpg"
        ></HeroVideo>
        <HeroContent>
          <HeroTitle>매일 아침, 가장 신선한 건강</HeroTitle>
          <HeroSubtitle>
            자연 그대로의 맛과 영양을 담은 샐러드를 집 앞에서 만나보세요.
          </HeroSubtitle>
          <HeroCTAButton>지금 바로 건강을 주문하세요</HeroCTAButton>
        </HeroContent>
      </HeroSection>

      <Section id="menu">
        <SectionTitle>인기 샐러드</SectionTitle>
        <SaladGrid>
          {salads.map((salad) => (
            <SaladCard key={salad.id}>
              <CardImage>
                <Image
                  src={salad.imageUrl}
                  alt={salad.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </CardImage>
              <CardContent>
                <SaladName>{salad.name}</SaladName>
                <SaladDescription>{salad.description}</SaladDescription>
                <CardFooter>
                  <SaladPrice>{salad.price}</SaladPrice>
                  <AddToCartButton>+ 담기</AddToCartButton>
                </CardFooter>
              </CardContent>
            </SaladCard>
          ))}
        </SaladGrid>
      </Section>

      <SpecialSection id="special">
        <SectionTitle>시즌 스페셜</SectionTitle>
        <SpecialGrid>
          <SpecialCard>
            <SpecialName>{seasonalSpecials[0].name}</SpecialName>
            <SpecialDescription>
              {seasonalSpecials[0].description}
            </SpecialDescription>
          </SpecialCard>
          <SpecialImage>
            <Image
              src={seasonalSpecials[0].imageUrl}
              alt={seasonalSpecials[0].name}
              fill
              sizes="(max-width: 992px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </SpecialImage>
        </SpecialGrid>
        <SpecialGrid style={{ marginTop: "2rem" }}>
          <SpecialImage>
            <Image
              src={seasonalSpecials[1].imageUrl}
              alt={seasonalSpecials[1].name}
              fill
              sizes="(max-width: 992px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </SpecialImage>
          <SpecialCard>
            <SpecialName>{seasonalSpecials[1].name}</SpecialName>
            <SpecialDescription>
              {seasonalSpecials[1].description}
            </SpecialDescription>
          </SpecialCard>
        </SpecialGrid>
      </SpecialSection>
    </>
  );
}
