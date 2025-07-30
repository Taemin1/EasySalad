"use client";

import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { MenuItem } from "@/types/menu";
import { theme } from "@/styles/theme";
import Image from "next/image";

const Card = styled(motion.div)`
  background-color: ${theme.colors.surface};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${theme.shadows.sm};
  transition: all ${theme.transitions.normal};
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.md};
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  background: linear-gradient(
    135deg,
    ${theme.colors.primary}20 0%,
    ${theme.colors.secondary}20 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  transition: transform ${theme.transitions.normal};

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const PlaceholderIcon = styled.div`
  font-size: 4rem;
  opacity: 0.7;
`;

const Badge = styled.span<{ type: "new" | "popular" }>`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  background-color: ${(props) =>
    props.type === "new" ? theme.colors.accent : theme.colors.primary};
  color: white;
  z-index: 2;
`;

const Content = styled.div`
  padding: 20px;
`;

const Name = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 8px;
  color: ${theme.colors.text.primary};
`;

const Description = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: 0.95rem;
  line-height: 1.6;
`;

const Price = styled.p`
  margin-top: 15px;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.primary};
`;

interface MenuCardProps {
  item: MenuItem;
  index?: number;
}

const getEmoji = (category: string) => {
  const emojiMap: { [key: string]: string } = {
    sandwiches: "🥪",
    salads: "🥗",
    lunchbox: "🍱",
    beverages: "🥤",
    desserts: "🍰",
    catering: "📦",
  };
  return emojiMap[category] || "🍽️";
};

export default function MenuCard({ item, index = 0 }: MenuCardProps) {
  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <ImageContainer>
        {item.image ? (
          <StyledImage
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 6} // 처음 6개 이미지는 우선 로딩
          />
        ) : (
          <PlaceholderIcon>{getEmoji(item.category)}</PlaceholderIcon>
        )}
        {item.isNew && <Badge type="new">NEW</Badge>}
        {item.isPopular && <Badge type="popular">인기</Badge>}
      </ImageContainer>

      <Content>
        <Name>{item.name}</Name>
        {item.description && <Description>{item.description}</Description>}
        {item.price && <Price>{item.price.toLocaleString()}원</Price>}
      </Content>
    </Card>
  );
}
