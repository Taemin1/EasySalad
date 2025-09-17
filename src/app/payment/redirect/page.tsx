"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { theme } from "@/styles/theme";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(
    135deg,
    ${theme.colors.primary}10 0%,
    ${theme.colors.secondary}10 100%
  );
`;

const Card = styled(motion.div)`
  background-color: ${theme.colors.surface};
  border-radius: 20px;
  padding: 60px 40px;
  text-align: center;
  box-shadow: ${theme.shadows.lg};
  max-width: 500px;
  width: 100%;
`;

const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid ${theme.colors.background};
  border-top: 4px solid ${theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 30px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: ${theme.colors.text.primary};
`;

const Message = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
`;

const ErrorMessage = styled.div`
  background-color: #ff6b6b20;
  border: 1px solid #ff6b6b;
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
  color: #d63031;
`;

function PaymentRedirectContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [processing, setProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processPayment = async () => {
      try {
        // URL에서 결제 정보 추출
        const paymentId =
          searchParams.get("payment_id") || searchParams.get("paymentId");
        const orderId = searchParams.get("orderId");
        const code = searchParams.get("code");
        const message = searchParams.get("message");

        if (code && code !== "0") {
          // 결제 실패
          throw new Error(message || "결제가 취소되었거나 실패했습니다.");
        }

        if (!paymentId || !orderId) {
          throw new Error("결제 정보가 올바르지 않습니다.");
        }

        // 결제 검증 API 호출
        const verifyResponse = await fetch("/api/payments/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentId,
            orderId,
          }),
        });

        if (!verifyResponse.ok) {
          const errorText = await verifyResponse.text();
          throw new Error(errorText || "결제 검증에 실패했습니다.");
        }

        const verifyResult = await verifyResponse.json();

        if (verifyResult.status === "PAID") {
          // 장바구니 초기화
          localStorage.removeItem("cart");

          // 주문 완료 페이지로 이동
          const orderNumber = verifyResult.orderNumber || "N/A";
          router.push(
            `/order-complete?orderNumber=${orderNumber}&paymentId=${paymentId}`
          );
        } else {
          throw new Error("결제 검증에 실패했습니다.");
        }
      } catch (error) {
        console.error("Payment processing error:", error);
        setError(
          error instanceof Error
            ? error.message
            : "결제 처리 중 오류가 발생했습니다."
        );
        setProcessing(false);
      }
    };

    processPayment();
  }, [searchParams, router]);

  if (processing && !error) {
    return (
      <Container>
        <Card
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LoadingSpinner />
          <Title>결제 처리 중...</Title>
          <Message>
            결제 정보를 확인하고 있습니다.
            <br />
            잠시만 기다려주세요.
          </Message>
        </Card>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Card
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title>결제 오류</Title>
          <ErrorMessage>{error}</ErrorMessage>
          <motion.button
            onClick={() => router.push("/order")}
            style={{
              padding: "12px 24px",
              backgroundColor: theme.colors.primary,
              color: "white",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              marginTop: "20px",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            메뉴로 돌아가기
          </motion.button>
        </Card>
      </Container>
    );
  }

  return null;
}

export default function PaymentRedirectPage() {
  return (
    <Suspense
      fallback={
        <Container>
          <Card>
            <LoadingSpinner />
            <Title>로딩 중...</Title>
          </Card>
        </Container>
      }
    >
      <PaymentRedirectContent />
    </Suspense>
  );
}
