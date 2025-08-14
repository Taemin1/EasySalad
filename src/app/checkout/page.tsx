"use client";

import { useState, useEffect, ChangeEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { theme } from "@/styles/theme";
import PortOne, { Currency } from "@portone/browser-sdk/v2";
import isPropValid from "@emotion/is-prop-valid";

// 기존 인터페이스
interface CartItem {
  id: string;
  name: string;
  price?: number;
  quantity: number;
  image?: string;
  category: string;
}

interface DeliveryInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  detailAddress: string;
  zipCode: string;
  deliveryDate: string;
  deliveryTime: string;
}

interface PaymentResponse {
  paymentId?: string;
  code?: string;
  message?: string;
}

// 스타일드 컴포넌트들
const Container = styled.div`
  min-height: 100vh;
  padding: 120px 20px 80px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 50px;
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

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const LeftSection = styled.div``;

const RightSection = styled.div`
  position: sticky;
  top: 100px;
  height: fit-content;
`;

const Section = styled(motion.div)`
  background-color: ${theme.colors.surface};
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: ${theme.shadows.md};
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 25px;
  color: ${theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: ${theme.colors.text.primary};
`;

// Input (transient prop 사용)
const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid
    ${(props) => (props.$hasError ? "#ff6b6b" : theme.colors.background)};
  border-radius: 8px;
  font-size: 1rem;
  transition: all ${theme.transitions.fast};
  background-color: ${theme.colors.background};

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.$hasError ? "#ff6b6b" : theme.colors.primary};
  }

  &::placeholder {
    color: ${theme.colors.text.secondary};
  }
`;

const ErrorMessage = styled.span`
  color: #ff6b6b;
  font-size: 0.85rem;
  margin-top: 5px;
  display: block;
`;

const AddressRow = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 15px;
  margin-bottom: 15px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const AddressButton = styled.button`
  padding: 12px 16px;
  background-color: ${theme.colors.primary};
  color: white;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover {
    background-color: ${theme.colors.secondary};
  }
`;

const DateTimeSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const DateInput = styled(Input)`
  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }
`;

// Select (transient prop 사용)
const TimeSelect = styled.select<{ $hasError?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid
    ${(props) => (props.$hasError ? "#ff6b6b" : theme.colors.background)};
  border-radius: 8px;
  font-size: 1rem;
  background-color: ${theme.colors.background};
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.$hasError ? "#ff6b6b" : theme.colors.primary};
  }
`;

const OrderSummary = styled.div`
  background-color: ${theme.colors.surface};
  border-radius: 16px;
  padding: 30px;
  box-shadow: ${theme.shadows.md};
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid ${theme.colors.background};

  &:last-child {
    border-bottom: none;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.p`
  font-weight: 600;
  margin-bottom: 5px;
  color: ${theme.colors.text.primary};
`;

const ItemQuantity = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
`;

const ItemPrice = styled.p`
  font-weight: 600;
  color: ${theme.colors.text.primary};
`;

const TotalSection = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid ${theme.colors.background};
`;

const InfoSetion = styled.div`
  font-size: 0.8rem;
  color: #ff6b6b;
  margin-top: 20px;
`;

// TotalRow (transient prop 사용)
const TotalRow = styled.div<{ $isFinal?: boolean }>`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: ${(props) => (props.$isFinal ? "1.3rem" : "1rem")};
  font-weight: ${(props) => (props.$isFinal ? "700" : "600")};
  color: ${(props) =>
    props.$isFinal ? theme.colors.text.primary : theme.colors.text.secondary};
`;

const CheckoutButton = styled(motion.button, {
  shouldForwardProp: (prop) =>
    isPropValid(prop) && prop !== "$isLoading" && prop !== "isLoading",
})<{ $isLoading?: boolean }>`
  width: 100%;
  padding: 18px;
  background: ${({ $isLoading }) =>
    $isLoading
      ? theme.colors.text.secondary
      : `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`};
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 12px;
  cursor: ${({ $isLoading }) => ($isLoading ? "not-allowed" : "pointer")};
  margin-top: 30px;
  transition: all ${theme.transitions.normal};
  position: relative;

  &:hover {
    transform: ${({ $isLoading }) =>
      $isLoading ? "none" : "translateY(-2px)"};
    box-shadow: ${({ $isLoading }) => ($isLoading ? "none" : theme.shadows.lg)};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff40;
  border-radius: 50%;
  border-top-color: #ffffff;
  animation: spin 1s ease-in-out infinite;
  margin-right: 10px;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${theme.colors.text.secondary};

  h2 {
    font-size: 3rem;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 10px;
  }
`;

const BackToMenuButton = styled(motion.button)`
  margin-top: 20px;
  padding: 12px 24px;
  background-color: ${theme.colors.primary};
  color: white;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover {
    background-color: ${theme.colors.secondary};
  }
`;

// 다음 우편번호 서비스 타입 선언
declare global {
  interface Window {
    daum: {
      Postcode: new (options: {
        oncomplete: (data: {
          userSelectedType: string;
          roadAddress: string;
          jibunAddress: string;
          zonecode: string;
        }) => void;
      }) => {
        open: () => void;
      };
    };
  }
}

// 랜덤 ID
function randomId() {
  return Array.from(crypto.getRandomValues(new Uint32Array(2)))
    .map((word) => word.toString(16).padStart(8, "0"))
    .join("");
}

function CheckoutPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    name: "",
    phone: "",
    email: "",
    address: "",
    detailAddress: "",
    zipCode: "",
    deliveryDate: "",
    deliveryTime: "",
  });

  // cart 로드
  useEffect(() => {
    const cartParam = searchParams.get("cart");
    if (cartParam) {
      try {
        const cartData = JSON.parse(decodeURIComponent(cartParam));
        setCart(cartData);
      } catch (error) {
        console.error("Cart data parsing error:", error);
      }
    } else {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (error) {
          console.error("Saved cart parsing error:", error);
        }
      }
    }
  }, [searchParams]);

  // 다음 우편번호 스크립트
  useEffect(() => {
    if (!document.getElementById("daum-postcode-script")) {
      const script = document.createElement("script");
      script.id = "daum-postcode-script";
      script.src =
        "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      document.head.appendChild(script);
    }
  }, []);

  const getMinDate = () => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 2);
    return minDate.toISOString().split("T")[0];
  };

  const timeOptions = [
    { value: "", label: "시간을 선택해주세요" },
    { value: "09:00-11:00", label: "오전 9시 - 11시" },
    { value: "11:00-13:00", label: "오전 11시 - 오후 1시" },
    { value: "13:00-15:00", label: "오후 1시 - 3시" },
    { value: "15:00-17:00", label: "오후 3시 - 5시" },
    { value: "17:00-19:00", label: "오후 5시 - 7시" },
  ];

  const handleInputChange = (field: keyof DeliveryInfo, value: string) => {
    setDeliveryInfo((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const calculateSubtotal = () => {
    return cart.reduce(
      (total, item) => total + (item.price || 0) * item.quantity,
      0
    );
  };

  const deliveryFee = 0;
  const calculateTotal = () => calculateSubtotal() + deliveryFee;

  const handleAddressSearch = () => {
    if (!window.daum) {
      alert("주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    new window.daum.Postcode({
      oncomplete: function (data: {
        userSelectedType: string;
        roadAddress: string;
        jibunAddress: string;
        zonecode: string;
      }) {
        let addr = "";
        if (data.userSelectedType === "R") {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }

        handleInputChange("zipCode", data.zonecode);
        handleInputChange("address", addr);
      },
    }).open();
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!deliveryInfo.name.trim()) {
      newErrors.name = "받는 분 성함을 입력해주세요.";
    }

    if (!deliveryInfo.phone.trim()) {
      newErrors.phone = "연락처를 입력해주세요.";
    } else if (!/^[0-9-]{10,13}$/.test(deliveryInfo.phone.replace(/\D/g, ""))) {
      newErrors.phone = "올바른 연락처를 입력해주세요.";
    }

    if (
      deliveryInfo.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(deliveryInfo.email)
    ) {
      newErrors.email = "올바른 이메일 주소를 입력해주세요.";
    }

    if (!deliveryInfo.address.trim()) {
      newErrors.address = "배송 주소를 입력해주세요.";
    }

    if (!deliveryInfo.deliveryDate) {
      newErrors.deliveryDate = "배송 날짜를 선택해주세요.";
    } else {
      const deliveryDate = new Date(deliveryInfo.deliveryDate);
      const minDate = new Date();
      minDate.setDate(minDate.getDate() + 2);
      minDate.setHours(0, 0, 0, 0);

      if (deliveryDate < minDate) {
        newErrors.deliveryDate =
          "배송일은 주문일 기준 2일 후부터 선택 가능합니다.";
      }
    }

    if (!deliveryInfo.deliveryTime) {
      newErrors.deliveryTime = "배송 시간을 선택해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOrder = async () => {
    if (!validateForm()) return;
    if (cart.length === 0) {
      alert("주문할 상품이 없습니다.");
      return;
    }

    setIsLoading(true);

    try {
      // 1) 주문 생성
      const orderData = {
        items: cart,
        deliveryInfo,
        totalAmount: calculateTotal(),
        deliveryFee: deliveryFee,
      };

      const orderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const orderResult = await orderResponse.json();

      if (!orderResult.success) {
        alert(orderResult.error || "주문 생성 중 오류가 발생했습니다.");
        setIsLoading(false);
        return;
      }

      const { order } = orderResult;

      // 2) 결제
      const paymentId = randomId();

      const payment = await PortOne.requestPayment({
        storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID!,
        channelKey: "channel-key-3f31cc3d-1af0-4a97-a0a2-4998f95b1be0",
        paymentId,
        orderName: `ezySalad 주문 (${order.orderNumber})`,
        totalAmount: order.totalAmount,
        currency: Currency.KRW,
        payMethod: "CARD",
        customer: {
          fullName: order.customerName,
          phoneNumber: order.customerPhone,
          ...(order.customerEmail &&
            order.customerEmail.trim() !== "" && {
              email: order.customerEmail,
            }),
        },
        customData: { orderId: order.id },
      });

      const paymentResponse = payment as PaymentResponse;
      if (!payment || paymentResponse.code) {
        alert(paymentResponse?.message || "결제에 실패했습니다.");
        setIsLoading(false);
        return;
      }

      // 3) 결제 검증
      const verifyResponse = await fetch("/api/payments/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId: paymentResponse.paymentId!,
          orderId: order.id,
          amount: order.totalAmount,
        }),
      });

      if (verifyResponse.ok) {
        const verifyResult = await verifyResponse.json();

        if (verifyResult.status === "PAID") {
          localStorage.removeItem("cart");
          setCart([]);
          router.push(
            `/order-complete?orderNumber=${order.orderNumber}&paymentId=${paymentResponse.paymentId}`
          );
        } else {
          throw new Error("결제 검증에 실패했습니다.");
        }
      } else {
        const errorText = await verifyResponse.text();
        throw new Error(errorText || "결제 검증에 실패했습니다.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert(
        error instanceof Error
          ? error.message
          : "결제 중 오류가 발생했습니다. 다시 시도해주세요."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToMenu = () => {
    router.push("/order");
  };

  if (cart.length === 0) {
    return (
      <Container>
        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          결제하기
        </Title>
        <EmptyCart>
          <h2>🛒</h2>
          <p>장바구니가 비어있습니다.</p>
          <p>주문할 상품을 먼저 담아주세요.</p>
          <BackToMenuButton
            onClick={handleBackToMenu}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            메뉴 보러가기
          </BackToMenuButton>
        </EmptyCart>
      </Container>
    );
  }

  return (
    <Container>
      <Title
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        결제하기
      </Title>

      <ContentWrapper>
        <LeftSection>
          {/* 배송 정보 */}
          <Section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <SectionTitle>🚚 배송 정보</SectionTitle>

            <FormGroup>
              <Label htmlFor="name">받는 분 성함 *</Label>
              <Input
                id="name"
                type="text"
                placeholder="성함을 입력해주세요"
                value={deliveryInfo.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("name", e.target.value)
                }
                $hasError={!!errors.name}
              />
              {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phone">연락처 *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="010-1234-5678"
                value={deliveryInfo.phone}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("phone", e.target.value)
                }
                $hasError={!!errors.phone}
              />
              {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">이메일 (선택)</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={deliveryInfo.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("email", e.target.value)
                }
                $hasError={!!errors.email}
              />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              <span
                style={{
                  fontSize: "0.85rem",
                  color: theme.colors.text.secondary,
                  marginTop: "5px",
                  display: "block",
                }}
              >
                주문 확인 이메일을 받으시려면 입력해주세요.
              </span>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="address">배송 주소 *</Label>
              <AddressRow>
                <AddressButton type="button" onClick={handleAddressSearch}>
                  주소 찾기
                </AddressButton>
                <Input
                  id="zipCode"
                  type="text"
                  placeholder="우편번호"
                  value={deliveryInfo.zipCode}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("zipCode", e.target.value)
                  }
                  readOnly
                />
              </AddressRow>
              <Input
                id="address"
                type="text"
                placeholder="기본 주소"
                value={deliveryInfo.address}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("address", e.target.value)
                }
                style={{ marginBottom: "15px" }}
                $hasError={!!errors.address}
                readOnly
              />
              <Input
                id="detailAddress"
                type="text"
                placeholder="상세 주소 (동/호수 등)"
                value={deliveryInfo.detailAddress}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("detailAddress", e.target.value)
                }
              />
              {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
            </FormGroup>
          </Section>

          {/* 배송 날짜/시간 */}
          <Section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SectionTitle>📅 배송 일시</SectionTitle>

            <DateTimeSection>
              <FormGroup>
                <Label htmlFor="deliveryDate">배송 날짜 *</Label>
                <DateInput
                  id="deliveryDate"
                  type="date"
                  min={getMinDate()}
                  value={deliveryInfo.deliveryDate}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("deliveryDate", e.target.value)
                  }
                  $hasError={!!errors.deliveryDate}
                />
                {errors.deliveryDate && (
                  <ErrorMessage>{errors.deliveryDate}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="deliveryTime">배송 시간 *</Label>
                <TimeSelect
                  id="deliveryTime"
                  value={deliveryInfo.deliveryTime}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    handleInputChange("deliveryTime", e.target.value)
                  }
                  $hasError={!!errors.deliveryTime}
                >
                  {timeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TimeSelect>
                {errors.deliveryTime && (
                  <ErrorMessage>{errors.deliveryTime}</ErrorMessage>
                )}
              </FormGroup>
            </DateTimeSection>
          </Section>
        </LeftSection>

        <RightSection>
          {/* 주문 요약 */}
          <OrderSummary>
            <SectionTitle>📋 주문 요약</SectionTitle>

            {cart.map((item) => (
              <OrderItem key={item.id}>
                <ItemInfo>
                  <ItemName>{item.name}</ItemName>
                  <ItemQuantity>{item.quantity}개</ItemQuantity>
                </ItemInfo>
                <ItemPrice>
                  {((item.price || 0) * item.quantity).toLocaleString()}원
                </ItemPrice>
              </OrderItem>
            ))}

            <TotalSection>
              <TotalRow>
                <span>상품 금액</span>
                <span>{calculateSubtotal().toLocaleString()}원</span>
              </TotalRow>
              <TotalRow>
                <span>배송비</span>
                <span>{deliveryFee.toLocaleString()}원</span>
              </TotalRow>
              <TotalRow $isFinal>
                <span>총 결제 금액</span>
                <span>{calculateTotal().toLocaleString()}원</span>
              </TotalRow>
            </TotalSection>
            <InfoSetion>
              <p>서울시 내 주문 시 배송비 3만원 </p>
              <p>인천, 분당, 판교 주문 시 배송비 5만원</p>
              <p>30만원 이상 주문 시 지역 관계없이 배송비 무료</p>
            </InfoSetion>

            <CheckoutButton
              onClick={handleOrder}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              disabled={isLoading}
              $isLoading={isLoading}
            >
              {isLoading && <LoadingSpinner />}
              {isLoading ? "주문 중..." : "주문하기"}
            </CheckoutButton>
          </OrderSummary>
        </RightSection>
      </ContentWrapper>
    </Container>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutPageContent />
    </Suspense>
  );
}
