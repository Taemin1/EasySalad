"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "@/styles/theme";
import { menuData } from "@/data/menuData";
import { MenuItem } from "@/types/menu";
import Image from "next/image";

interface CartItem extends MenuItem {
  quantity: number;
}

const Container = styled.div`
  min-height: 100vh;
  padding: 120px 20px 80px;
  max-width: 1400px;
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

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;
  align-items: start;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const MenuSection = styled.div``;

const CategoryTabs = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 40px;
  overflow-x: auto;
  padding-bottom: 10px;
  border-bottom: 2px solid ${theme.colors.background};
`;

const CategoryTab = styled.button<{ $isActive: boolean }>`
  padding: 10px 20px;
  border-radius: 25px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  background: ${(props) =>
    props.$isActive
      ? `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`
      : theme.colors.surface};
  color: ${(props) => (props.$isActive ? "white" : theme.colors.text.primary)};
  box-shadow: ${(props) => (props.$isActive ? theme.shadows.sm : "none")};
  border: none;
  outline: none;

  &:hover {
    transform: translateY(-2px);
  }
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
`;

const MenuCard = styled.div`
  background-color: ${theme.colors.surface};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${theme.shadows.sm};
  transition: all ${theme.transitions.normal};
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.md};
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 180px;
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

const PlaceholderIcon = styled.div`
  font-size: 3.5rem;
  opacity: 0.7;
`;

const MenuContent = styled.div`
  padding: 20px;
`;

const MenuName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: ${theme.colors.text.primary};
`;

const MenuDescription = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 15px;
`;

const AddButton = styled(motion.button)`
  width: 100%;
  padding: 10px;
  background: linear-gradient(
    135deg,
    ${theme.colors.primary} 0%,
    ${theme.colors.secondary} 100%
  );
  color: white;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover {
    transform: scale(1.02);
  }
`;

const CartSection = styled(motion.div)`
  position: sticky;
  top: 100px;
  background-color: ${theme.colors.surface};
  border-radius: 16px;
  padding: 30px;
  box-shadow: ${theme.shadows.md};
`;

const CartTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 25px;
  color: ${theme.colors.text.primary};
`;

const CartItems = styled.div`
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
`;

const CartItem = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: ${theme.colors.background};
  border-radius: 12px;
  margin-bottom: 10px;
`;

const CartItemInfo = styled.div`
  flex: 1;
`;

const CartItemName = styled.p`
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: 5px;
`;

const CartItemPrice = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: 0.9rem;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all ${theme.transitions.fast};

  &:hover {
    transform: scale(1.1);
  }
`;

const Quantity = styled.span`
  font-weight: 600;
  min-width: 20px;
  text-align: center;
`;

const CartEmpty = styled.p`
  text-align: center;
  color: ${theme.colors.text.secondary};
  padding: 40px 0;
`;

const CartSummary = styled.div`
  border-top: 2px solid ${theme.colors.background};
  padding-top: 20px;
  margin-top: 20px;
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: ${theme.colors.text.primary};
`;

const CheckoutButton = styled(motion.button)`
  width: 100%;
  padding: 15px;
  background: linear-gradient(
    135deg,
    ${theme.colors.primary} 0%,
    ${theme.colors.secondary} 100%
  );
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all ${theme.transitions.normal};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

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

export default function OrderPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("sandwiches");
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === itemId) {
            const newQuantity = item.quantity + delta;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + (item.price || 0) * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    // 장바구니 데이터를 localStorage에 저장
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // 결제 페이지로 이동
    router.push('/checkout');
  };

  const currentCategory = menuData.find((cat) => cat.id === selectedCategory);
  const currentItems = currentCategory?.items || [];

  return (
    <Container>
      <Title
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        주문하기
      </Title>

      <ContentWrapper>
        <MenuSection>
          <CategoryTabs>
            {menuData.map((category) => (
              <CategoryTab
                key={category.id}
                $isActive={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </CategoryTab>
            ))}
          </CategoryTabs>

          <MenuGrid>
            {currentItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <MenuCard>
                  <ImageContainer>
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <PlaceholderIcon>
                        {getEmoji(item.category)}
                      </PlaceholderIcon>
                    )}
                  </ImageContainer>
                  <MenuContent>
                    <MenuName>{item.name}</MenuName>
                    {item.description && (
                      <MenuDescription>{item.description}</MenuDescription>
                    )}
                    <AddButton
                      onClick={() => addToCart(item)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      담기 • {(item.price || 0).toLocaleString()}원
                    </AddButton>
                  </MenuContent>
                </MenuCard>
              </motion.div>
            ))}
          </MenuGrid>
        </MenuSection>

        <CartSection
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <CartTitle>🛒 장바구니</CartTitle>

          <CartItems>
            {cart.length === 0 ? (
              <CartEmpty>장바구니가 비어있습니다</CartEmpty>
            ) : (
              <AnimatePresence>
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    layout
                  >
                    <CartItemInfo>
                      <CartItemName>{item.name}</CartItemName>
                      <CartItemPrice>
                        {(item.price || 0).toLocaleString()}원
                      </CartItemPrice>
                    </CartItemInfo>
                    <QuantityControl>
                      <QuantityButton
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        -
                      </QuantityButton>
                      <Quantity>{item.quantity}</Quantity>
                      <QuantityButton
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        +
                      </QuantityButton>
                    </QuantityControl>
                  </CartItem>
                ))}
              </AnimatePresence>
            )}
          </CartItems>

          {cart.length > 0 && (
            <CartSummary>
              <TotalPrice>
                <span>총 금액</span>
                <span>{calculateTotal().toLocaleString()}원</span>
              </TotalPrice>
              <CheckoutButton
                onClick={handleCheckout}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                결제하기
              </CheckoutButton>
            </CartSummary>
          )}
        </CartSection>
      </ContentWrapper>
    </Container>
  );
}
