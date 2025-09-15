"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { theme } from "@/styles/theme";

const Container = styled.div`
  min-height: 100vh;
  padding: 120px 20px 80px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const SuccessIcon = styled(motion.div)`
  font-size: 5rem;
  margin-bottom: 30px;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 20px;
  background: linear-gradient(
    135deg,
    ${theme.colors.primary} 0%,
    ${theme.colors.secondary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: 40px;
  line-height: 1.6;
`;

const OrderInfo = styled(motion.div)`
  background-color: ${theme.colors.surface};
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: ${theme.shadows.md};
`;

const OrderNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.primary};
  margin-bottom: 20px;

  span {
    font-size: 1rem;
    font-weight: 600;
    color: ${theme.colors.text.primary};
    margin-right: 10px;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  gap: 15px;
  text-align: left;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid ${theme.colors.background};

  &:last-child {
    border-bottom: none;
    font-weight: 700;
    font-size: 1.1rem;
    color: ${theme.colors.primary};
  }
`;

const InfoLabel = styled.span`
  color: ${theme.colors.text.secondary};
  font-weight: 600;
`;

const InfoValue = styled.span`
  color: ${theme.colors.text.primary};
  font-weight: 600;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled(motion.button, {
  shouldForwardProp: (prop) => !["$variant"].includes(prop as string),
})<{ $variant?: "primary" | "secondary" }>`
  padding: 15px 30px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all ${theme.transitions.normal};
  min-width: 150px;

  ${(props) =>
    props.$variant === "primary"
      ? `
    background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.lg};
    }
  `
      : `
    background: ${theme.colors.surface};
    color: ${theme.colors.text.primary};
    border: 2px solid ${theme.colors.background};
    
    &:hover {
      border-color: ${theme.colors.primary};
      transform: translateY(-2px);
    }
  `}
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid ${theme.colors.background};
  border-top-color: ${theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 20px;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: 1.1rem;
`;

const ErrorMessage = styled(motion.div)`
  background-color: #ffe6e6;
  color: #d8000c;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
  border: 1px solid #ffcdd2;
`;

interface OrderData {
  orderNumber: string;
  status: string;
  customerName: string;
  deliveryDate: string;
  deliveryTime: string;
  totalAmount: number;
  createdAt: string;
}

function OrderCompletePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const orderNumber = searchParams.get("orderNumber");

    if (orderNumber) {
      // 결제 완료된 주문 정보 표시
      const orderData: OrderData = {
        orderNumber: orderNumber,
        status: "paid",
        customerName: "고객님",
        deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        deliveryTime: "09:00-11:00",
        totalAmount: 0,
        createdAt: new Date().toISOString(),
      };

      setOrderData(orderData);
      setLoading(false);
    } else {
      setError("주문 정보를 찾을 수 없습니다.");
      setLoading(false);
    }
  }, [searchParams]);

  const handleGoHome = () => {
    router.push("/");
  };

  const handleOrderMore = () => {
    router.push("/order");
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("ko-KR");
  };

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>주문 정보를 확인하고 있습니다...</LoadingText>
        </LoadingContainer>
      </Container>
    );
  }

  if (error || !orderData) {
    return (
      <Container>
        <ErrorMessage
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error || "주문 정보를 불러올 수 없습니다."}
        </ErrorMessage>
        <ButtonGroup>
          <Button $variant="primary" onClick={handleGoHome}>
            홈으로 가기
          </Button>
          <Button $variant="secondary" onClick={handleOrderMore}>
            다시 주문하기
          </Button>
        </ButtonGroup>
      </Container>
    );
  }

  return (
    <Container>
      <SuccessIcon
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        🎉
      </SuccessIcon>

      <Title
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        주문이 완료되었습니다!
      </Title>

      <Subtitle
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        신선하고 건강한 음식으로 준비해서
        <br />
        정성껏 배송해드리겠습니다. 🥗
      </Subtitle>

      <OrderInfo
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <OrderNumber>
          <span>주문번호:</span>
          {orderData.orderNumber}
        </OrderNumber>

        <InfoGrid>
          <InfoRow>
            <InfoLabel>주문일시</InfoLabel>
            <InfoValue>{formatDateTime(orderData.createdAt)}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>결제상태</InfoLabel>
            <InfoValue>결제 완료 ✅</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>배송예정일</InfoLabel>
            <InfoValue>
              {formatDate(orderData.deliveryDate)} {orderData.deliveryTime}
            </InfoValue>
          </InfoRow>
        </InfoGrid>
      </OrderInfo>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <ButtonGroup>
          <Button
            $variant="primary"
            onClick={handleGoHome}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            홈으로 가기
          </Button>
          <Button
            $variant="secondary"
            onClick={handleOrderMore}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            추가 주문하기
          </Button>
        </ButtonGroup>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          marginTop: "40px",
          padding: "20px",
          borderRadius: "12px",
          color: theme.colors.text.secondary,
          fontSize: "1.5rem",
          lineHeight: "1.6",
        }}
      >
        <p>
          <strong style={{ color: theme.colors.secondary }}>안내사항:</strong>
          <br />
          • 주문 확인 후 SMS로 주문 확인 메세지를 보내드립니다.
          <br />• 문의사항은 010-3583-3701로 연락주세요.
        </p>
      </motion.div>
    </Container>
  );
}

export default function OrderCompletePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderCompletePageContent />
    </Suspense>
  );
}
