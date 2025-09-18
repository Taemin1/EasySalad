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

const HighlightText = styled.span`
  font-weight: bold;
  color: ${theme.colors.primary};
`;

const ExperienceList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
`;

const ExperienceItem = styled.li`
  padding: 8px 0;
  padding-left: 20px;
  position: relative;
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${theme.colors.text.secondary};

  &:before {
    content: "•";
    color: ${theme.colors.primary};
    font-weight: bold;
    position: absolute;
    left: 0;
  }
`;

export default function AboutContent() {
  return (
    <Container>
      <Content>
        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          ㈜HNL 소개
        </Title>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SectionTitle>안녕하세요. ㈜HNL 대표이사 임장호입니다.</SectionTitle>
          <Text>
            저희 HNL은 고객 여러분께{" "}
            <HighlightText>건강하고 간편하며 편리한 샐러드</HighlightText>를
            제공하기 위해 설립된 <HighlightText>샐러드 전문 기업</HighlightText>
            입니다. 2012년 론칭한{" "}
            <HighlightText>ezySalad(이지샐러드)</HighlightText>는 현재 시청점을
            운영 중이며, 단체 주문을 위한 조리 시설은 종각역 인근에 마련되어
            있습니다.
          </Text>
          <Text>
            그동안 고객의 다양한 니즈를 충족하고자 여러 실험적 시도를
            진행해왔습니다.
          </Text>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <SectionTitle>주요 경험 및 실적</SectionTitle>
          <ExperienceList>
            <ExperienceItem>
              <HighlightText>신세계백화점 경기점 및 인천점</HighlightText> 입점
              운영
            </ExperienceItem>
            <ExperienceItem>
              <HighlightText>샐러드 자판기</HighlightText> 시범 운영
            </ExperienceItem>
            <ExperienceItem>
              2018년 상반기, <HighlightText>SK지주회사</HighlightText>에 샐러드
              및 샌드위치 납품
            </ExperienceItem>
            <ExperienceItem>
              2018년 하반기, <HighlightText>SK이노베이션</HighlightText> 및{" "}
              <HighlightText>SK E&S</HighlightText> 사내 휴게실 관리 운영
            </ExperienceItem>
            <ExperienceItem>
              2019년 초, <HighlightText>삼일회계법인</HighlightText> 사내 휴게실
              내 샐러드 자판기 추가
            </ExperienceItem>
            <ExperienceItem>
              2020년 하반기, <HighlightText>안진회계법인</HighlightText>,{" "}
              <HighlightText>한영회계법인</HighlightText>,{" "}
              <HighlightText>티몬</HighlightText> 등 다수 기업에 납품
            </ExperienceItem>
            <ExperienceItem>
              2023~2024년 <HighlightText>용산 대통령실 행사</HighlightText> 및
              도시락 박스 납품
            </ExperienceItem>
            <ExperienceItem>
              2023년부터 현재까지 <HighlightText>젠틀몬스터</HighlightText>에
              조식 케이터링 서비스 운영
            </ExperienceItem>
          </ExperienceList>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <SectionTitle>새로운 도전: 이지밀(Ezymeal) 브랜드</SectionTitle>
          <Text>
            이와 같은 경험을 바탕으로, 앞으로는{" "}
            <HighlightText>
              &apos;이지밀(Ezymeal)&apos; 브랜드 론칭
            </HighlightText>
            을 통해 기업의 사내 복지를 위한 다양한 가격대와 풍성한 구성의 식사를
            제안하고자 합니다. 이는{" "}
            <HighlightText>
              기업의 아침 복지 고민을 해결하는 데 도움을 줄 것
            </HighlightText>
            입니다.
          </Text>
          <Text>
            앞으로는 <HighlightText>B2B 샐러드 유통</HighlightText>과{" "}
            <HighlightText>무인 판매</HighlightText>에 더욱 집중하고,{" "}
            <HighlightText>
              가정에서도 손쉽게 샐러드를 즐기실 수 있도록 온라인 판매망을 구축
            </HighlightText>
            할 예정입니다.
          </Text>
          <Text>
            HNL은 앞으로도{" "}
            <HighlightText>지속적인 혁신과 다양한 콘텐츠 개발</HighlightText>을
            통해
            <HighlightText>
              대한민국 최고의 샐러드 회사로 성장하기 위해 최선을 다하겠습니다.
            </HighlightText>
          </Text>
        </Section>
      </Content>
    </Container>
  );
}