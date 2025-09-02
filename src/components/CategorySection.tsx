"use client";

import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { MenuCategory } from "@/types/menu";
import MenuCard from "./MenuCard";
import { theme } from "@/styles/theme";

const Section = styled.section`
  margin-bottom: 80px;
`;

const CategoryTitle = styled(motion.h3)`
  font-size: 2rem;
  margin-bottom: 30px;
  color: ${theme.colors.text.primary};
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(
      135deg,
      ${theme.colors.primary} 0%,
      ${theme.colors.secondary} 100%
    );
    border-radius: 2px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
`;

interface CategorySectionProps {
  category: MenuCategory;
  delay?: number;
}

export default function CategorySection({
  category,
  delay = 0,
}: CategorySectionProps) {
  // 카테고리별로 처음 4개 아이템만 표시
  const displayItems = category.items.slice(0, 4);

  return (
    <Section>
      <CategoryTitle
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay }}
      >
        {category.name}
      </CategoryTitle>

      <Grid>
        {displayItems.map((item, index) => (
          <MenuCard key={item.id} item={item} index={index} />
        ))}
      </Grid>
    </Section>
  );
}
