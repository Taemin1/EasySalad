"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "@/styles/theme";
import { getMenuByCategories } from "@/lib/menu";
import { MenuItem, MenuCategory } from "@/types/menu";
import Image from "next/image";

interface CartItem extends MenuItem {
  quantity: number;
  selectedSize?: 'Full' | 'Half';
  selectedPrice?: number;
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

const PriceSection = styled.div`
  margin-bottom: 15px;
`;

const SinglePrice = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.colors.primary};
  text-align: center;
  margin-bottom: 10px;
`;

const SizeOptions = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

const SizeButton = styled.button<{ $isSelected: boolean }>`
  flex: 1;
  padding: 8px 16px;
  border: 2px solid ${props => props.$isSelected ? theme.colors.primary : theme.colors.surface};
  background: ${props => props.$isSelected ? theme.colors.primary : theme.colors.surface};
  color: ${props => props.$isSelected ? 'white' : theme.colors.text.primary};
  border-radius: 8px;
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  font-weight: 600;
  font-size: 0.9rem;
  
  &:hover {
    border-color: ${theme.colors.primary};
    background: ${props => props.$isSelected ? theme.colors.primary : `${theme.colors.primary}20`};
  }
`;

const SizePrice = styled.div`
  text-align: center;
  font-size: 0.85rem;
  color: ${theme.colors.text.secondary};
  margin-top: 2px;
`;

const AddButton = styled(motion.button)`
  width: 100%;
  padding: 12px;
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
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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

const CartItemDetails = styled.div`
  font-size: 0.85rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: 3px;
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

const QuantityInput = styled.input`
  width: 50px;
  height: 30px;
  text-align: center;
  font-weight: 600;
  border: 1px solid ${theme.colors.background};
  border-radius: 4px;
  font-size: 0.9rem;
  background-color: ${theme.colors.surface};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
  
  /* 숫자 입력 스피너 제거 */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  &[type=number] {
    -moz-appearance: textfield;
  }
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
  const [selectedSizes, setSelectedSizes] = useState<{[itemId: string]: 'Full' | 'Half'}>({});
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const categories = await getMenuByCategories();
        setMenuCategories(categories);
        // 첫 번째 카테고리를 기본으로 설정
        if (categories.length > 0) {
          setSelectedCategory(categories[0].id);
        }
      } catch (error) {
        console.error("Error fetching menu data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  const addToCart = (item: MenuItem, size?: 'Full' | 'Half') => {
    const hasSizes = item.size && Array.isArray(item.size) && item.size.includes('Full') && item.size.includes('Half');
    const selectedSize = size || (hasSizes ? 'Full' : undefined);
    const selectedPrice = selectedSize === 'Half' && item.halfPrice ? item.halfPrice : item.price;
    
    
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => 
        hasSizes ? 
        (cartItem.id === item.id && cartItem.selectedSize === selectedSize) :
        cartItem.id === item.id
      );
      
      if (existingItem) {
        return prevCart.map((cartItem) =>
          (hasSizes ? 
            (cartItem.id === item.id && cartItem.selectedSize === selectedSize) :
            cartItem.id === item.id)
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      
      return [...prevCart, { 
        ...item, 
        quantity: 1,
        selectedSize,
        selectedPrice
      }];
    });
  };

  const updateQuantity = (cartItem: CartItem, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          const isMatch = cartItem.selectedSize ? 
            (item.id === cartItem.id && item.selectedSize === cartItem.selectedSize) :
            item.id === cartItem.id;
            
          if (isMatch) {
            const newQuantity = item.quantity + delta;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const setQuantity = (cartItem: CartItem, quantity: number) => {
    if (quantity < 1) return;
    
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          const isMatch = cartItem.selectedSize ? 
            (item.id === cartItem.id && item.selectedSize === cartItem.selectedSize) :
            item.id === cartItem.id;
            
          if (isMatch) {
            return { ...item, quantity };
          }
          return item;
        });
    });
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + (item.selectedPrice || item.price || 0) * item.quantity,
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

  const currentCategory = menuCategories.find((cat) => cat.id === selectedCategory);
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
          {!loading && (
            <CategoryTabs>
              {menuCategories.map((category) => (
                <CategoryTab
                  key={category.id}
                  $isActive={selectedCategory === category.id}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </CategoryTab>
              ))}
            </CategoryTabs>
          )}

          <MenuGrid>
            {loading ? (
              <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "60px 0" }}>
                메뉴를 불러오는 중...
              </div>
            ) : (
              currentItems.map((item, index) => (
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
                    
                    {/* 사이즈 선택이 가능한 메뉴 */}
                    {item.size && Array.isArray(item.size) && item.size.includes('Full') && item.size.includes('Half') && item.halfPrice ? (
                      <>
                        <SizeOptions>
                          <SizeButton 
                            $isSelected={selectedSizes[item.id] === 'Half' || (!selectedSizes[item.id])}
                            onClick={() => setSelectedSizes(prev => ({ ...prev, [item.id]: 'Half' }))}
                          >
                            Half
                            <SizePrice>{item.halfPrice.toLocaleString()}원</SizePrice>
                          </SizeButton>
                          <SizeButton 
                            $isSelected={selectedSizes[item.id] === 'Full'}
                            onClick={() => setSelectedSizes(prev => ({ ...prev, [item.id]: 'Full' }))}
                          >
                            Full
                            <SizePrice>{item.price.toLocaleString()}원</SizePrice>
                          </SizeButton>
                        </SizeOptions>
                        <AddButton
                          onClick={() => {
                            const selectedSize = selectedSizes[item.id] || 'Half';
                            addToCart(item, selectedSize);
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          담기 • {(selectedSizes[item.id] === 'Full' ? item.price : item.halfPrice).toLocaleString()}원
                        </AddButton>
                      </>
                    ) : (
                      /* 일반 메뉴 */
                      <>
                        <PriceSection>
                          <SinglePrice>{(item.price || 0).toLocaleString()}원</SinglePrice>
                        </PriceSection>
                        <AddButton
                          onClick={() => addToCart(item)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          담기
                        </AddButton>
                      </>
                    )}
                  </MenuContent>
                </MenuCard>
              </motion.div>
              ))
            )}
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
                      {item.selectedSize && (
                        <CartItemDetails>사이즈: {item.selectedSize}</CartItemDetails>
                      )}
                      <CartItemPrice>
                        {(item.selectedPrice || item.price || 0).toLocaleString()}원
                      </CartItemPrice>
                    </CartItemInfo>
                    <QuantityControl>
                      <QuantityButton
                        onClick={() => updateQuantity(item, -1)}
                      >
                        -
                      </QuantityButton>
                      <QuantityInput
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value) && value > 0) {
                            setQuantity(item, value);
                          }
                        }}
                        onBlur={(e) => {
                          const value = parseInt(e.target.value);
                          if (isNaN(value) || value < 1) {
                            setQuantity(item, 1);
                          }
                        }}
                        min="1"
                      />
                      <QuantityButton
                        onClick={() => updateQuantity(item, 1)}
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
