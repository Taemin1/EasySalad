"use client";

import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import { getMenuByCategories } from "@/lib/menu";
import { MenuCategory } from "@/types/menu";
import MenuCard from "@/components/MenuCard";
import { theme } from "@/styles/theme";

const Container = styled.div`
  min-height: 100vh;
  padding: 120px 20px 80px;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled(motion.h1)`
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

const CategoryTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-bottom: 50px;
`;

// shouldForwardProp을 사용하여 active prop이 DOM에 전달되지 않도록 함
const CategoryTab = styled(motion.button, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>`
  padding: 12px 30px;
  border-radius: 30px;
  font-weight: 600;
  background-color: ${(props) =>
    props.active ? theme.colors.primary : theme.colors.surface};
  color: ${(props) => (props.active ? "white" : theme.colors.text.primary)};
  box-shadow: ${(props) =>
    props.active ? theme.shadows.md : theme.shadows.sm};
  transition: all ${theme.transitions.fast};
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
`;

const MenuGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
`;

const NoItemsMessage = styled.p`
  text-align: center;
  color: ${theme.colors.text.secondary};
  font-size: 1.2rem;
  margin-top: 50px;
  grid-column: 1 / -1;
`;

export default function MenuContent() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const categories = await getMenuByCategories();
        setMenuCategories(categories);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  const filteredItems =
    selectedCategory === "all"
      ? menuCategories.flatMap((category) => category.items)
      : menuCategories.find((cat) => cat.id === selectedCategory)?.items || [];

  return (
    <Container>
      <PageTitle
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        전체 메뉴
      </PageTitle>

      {!loading && (
        <CategoryTabs>
          <CategoryTab
            active={selectedCategory === "all"}
            onClick={() => setSelectedCategory("all")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            전체
          </CategoryTab>

          {menuCategories.map((category) => (
            <CategoryTab
              key={category.id}
              active={selectedCategory === category.id}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </CategoryTab>
          ))}
        </CategoryTabs>
      )}

      <AnimatePresence mode="wait">
        <MenuGrid
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {loading ? (
            <NoItemsMessage>메뉴를 불러오는 중...</NoItemsMessage>
          ) : filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <MenuCard key={item.id} item={item} index={index} />
            ))
          ) : (
            <NoItemsMessage>해당 카테고리에 메뉴가 없습니다.</NoItemsMessage>
          )}
        </MenuGrid>
      </AnimatePresence>
    </Container>
  );
}