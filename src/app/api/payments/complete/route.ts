// app/api/payment/complete/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import nodemailer from "nodemailer";

interface CompletePaymentRequest {
  paymentId: string;
  orderId: string;
  amount?: number; // redirect 방식에서는 amount가 없을 수 있음
}

interface OrderItem {
  menu_id: string;
  menu_name: string;
  menu_category: string;
  price: number;
  quantity: number;
}

interface OrderData {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  delivery_address: string;
  delivery_detail_address: string;
  delivery_zip_code: string;
  delivery_date: string;
  delivery_time: string;
  total_amount: number;
  delivery_fee: number;
  paid_at: string;
  order_items: OrderItem[];
}

// 포트원 V2 결제 검증 함수
async function verifyPaymentWithPortOne(paymentId: string, amount: number) {
  try {
    // 포트원 V2 API 직접 호출
    const paymentResponse = await fetch(
      `https://api.portone.io/payments/${paymentId}`,
      {
        method: "GET",
        headers: {
          Authorization: `PortOne ${process.env.PORTONE_API_SECRET}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!paymentResponse.ok) {
      throw new Error("결제 정보 조회 실패");
    }

    const payment = await paymentResponse.json();

    // 결제 검증
    if (payment.status !== "PAID") {
      throw new Error("결제가 완료되지 않았습니다.");
    }

    if (payment.amount.total !== amount) {
      throw new Error("결제 금액이 일치하지 않습니다.");
    }

    return {
      verified: true,
      payment: {
        id: payment.id,
        transactionId: payment.transactionId,
        amount: payment.amount.total,
        status: payment.status,
        method: payment.method?.type,
        paidAt: new Date(payment.paidAt),
        receiptUrl: payment.receiptUrl,
      },
    };
  } catch (error) {
    console.error("Payment verification error:", error);
    return {
      verified: false,
      error: error instanceof Error ? error.message : "결제 검증 실패",
    };
  }
}

// 이메일 전송을 위한 transporter 설정
const createEmailTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// 주문 확인 이메일 템플릿
const createOrderEmailTemplate = (
  orderData: OrderData,
  orderNumber: string,
  paymentId: string
) => {
  const itemsHtml = orderData.order_items
    .map(
      (item: OrderItem) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${
        item.menu_name
      }</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${
        item.quantity
      }개</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${(
        item.price * item.quantity
      ).toLocaleString()}원</td>
    </tr>
  `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>ezySalad 주문 확인</title>
    </head>
    <body style="font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #4CAF50; margin-bottom: 10px;">🥗 ezySalad</h1>
        <h2 style="color: #333;">결제가 완료되었습니다!</h2>
      </div>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="color: #333; margin-top: 0;">주문 정보</h3>
        <p><strong>주문번호:</strong> ${orderNumber}</p>
        <p><strong>결제ID:</strong> ${paymentId}</p>
        <p><strong>결제일시:</strong> ${new Date(
          orderData.paid_at
        ).toLocaleString("ko-KR")}</p>
        <p><strong>주문자:</strong> ${orderData.customer_name}</p>
        <p><strong>연락처:</strong> ${orderData.customer_phone}</p>
      </div>
      
      <div style="background-color: #fff; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="color: #333; padding: 15px 20px; margin: 0; border-bottom: 1px solid #eee;">주문 상품</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f8f9fa;">
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #dee2e6;">상품명</th>
              <th style="padding: 10px; text-align: center; border-bottom: 2px solid #dee2e6;">수량</th>
              <th style="padding: 10px; text-align: right; border-bottom: 2px solid #dee2e6;">금액</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
        <div style="padding: 15px 20px; border-top: 2px solid #4CAF50; background-color: #f8f9fa;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <span>상품 금액:</span>
            <span>${(
              orderData.total_amount - orderData.delivery_fee
            ).toLocaleString()}원</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <span>배송비:</span>
            <span>${orderData.delivery_fee.toLocaleString()}원</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 18px; color: #4CAF50;">
            <span>총 결제 금액:</span>
            <span>${orderData.total_amount.toLocaleString()}원</span>
          </div>
        </div>
      </div>
      
      <div style="background-color: #fff; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="color: #333; padding: 15px 20px; margin: 0; border-bottom: 1px solid #eee;">배송 정보</h3>
        <div style="padding: 20px;">
          <p><strong>배송 주소:</strong><br/>
            (${orderData.delivery_zip_code}) ${orderData.delivery_address}<br/>
            ${orderData.delivery_detail_address}
          </p>
          <p><strong>배송 일시:</strong> ${orderData.delivery_date} ${
    orderData.delivery_time
  }</p>
        </div>
      </div>
      
      <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; text-align: center;">
        <p style="margin: 0; color: #2e7d32;">
          <strong>결제가 완료되었습니다! 🙏</strong><br/>
          신선하고 건강한 음식으로 준비해서 배송해드리겠습니다.
        </p>
      </div>
      
      
    </body>
    </html>
  `;
};

// 결제 검증 및 주문 완료 처리
export async function POST(request: NextRequest) {
  try {
    const body: CompletePaymentRequest = await request.json();
    const { orderId, paymentId, amount } = body;

    // 주문 정보 조회
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select(
        `
        *,
        order_items (
          menu_id,
          menu_name,
          menu_category,
          price,
          quantity
        )
      `
      )
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        {
          status: "FAILED",
          message: "주문 정보를 찾을 수 없습니다.",
        },
        { status: 404 }
      );
    }

    // 이미 결제 완료된 주문인지 확인
    if (order.payment_status === "paid") {
      return NextResponse.json({
        status: "PAID",
        message: "이미 처리된 주문입니다.",
        order: {
          orderNumber: order.order_number,
          paymentId: order.payment_id,
        },
      });
    }

    // 포트원에서 결제 검증 (amount가 없으면 주문의 총 금액 사용)
    const verificationResult = await verifyPaymentWithPortOne(
      paymentId,
      amount || order.total_amount
    );

    if (!verificationResult.verified) {
      // 결제 검증 실패 시 주문 상태 업데이트
      await supabase
        .from("orders")
        .update({
          payment_status: "failed",
          status: "cancelled",
          updated_at: new Date().toISOString(),
        })
        .eq("id", orderId);

      return NextResponse.json(
        {
          status: "FAILED",
          message: verificationResult.error || "결제 검증에 실패했습니다.",
        },
        { status: 400 }
      );
    }

    // 결제 성공 시 주문 상태 업데이트
    const { data: updatedOrder, error: updateError } = await supabase
      .from("orders")
      .update({
        payment_id: paymentId,
        payment_status: "paid",
        payment_method: verificationResult.payment?.method,
        paid_at: verificationResult.payment?.paidAt.toISOString(),
        status: "paid",
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId)
      .select(
        `
        *,
        order_items (
          menu_id,
          menu_name,
          menu_category,
          price,
          quantity
        )
      `
      )
      .single();

    if (updateError) {
      console.error("Order update error:", updateError);
      return NextResponse.json(
        {
          status: "FAILED",
          message: "주문 상태 업데이트 중 오류가 발생했습니다.",
        },
        { status: 500 }
      );
    }

    // 이메일 발송 (실패해도 결제는 성공으로 처리)
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = createEmailTransporter();

        // 고객에게 주문 확인 이메일 발송
        if (updatedOrder.customer_email) {
          await transporter.sendMail({
            from: `"ezySalad" <${process.env.EMAIL_USER}>`,
            to: updatedOrder.customer_email,
            subject: `[ezySalad] 결제 완료 - ${updatedOrder.order_number}`,
            html: createOrderEmailTemplate(
              updatedOrder,
              updatedOrder.order_number,
              paymentId
            ),
          });
        }

        // 관리자에게 새 주문 알림 이메일 발송
        if (process.env.RECIPIENT_EMAIL) {
          await transporter.sendMail({
            from: `"ezySalad" <${process.env.EMAIL_USER}>`,
            to: process.env.RECIPIENT_EMAIL,
            subject: `[새 주문] ${updatedOrder.order_number} - ${updatedOrder.customer_name}님`,
            html: createOrderEmailTemplate(
              updatedOrder,
              updatedOrder.order_number,
              paymentId
            ),
          });
        }
      }
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      // 이메일 발송 실패해도 결제는 성공으로 처리
    }

    // 포트원 공식 예제와 동일한 응답 형식
    return NextResponse.json({
      status: "PAID",
      orderNumber: updatedOrder.order_number, // redirect 페이지에서 사용할 수 있도록 직접 반환
      order: {
        id: updatedOrder.id,
        orderNumber: updatedOrder.order_number,
        paymentId: paymentId,
        status: updatedOrder.status,
        paymentStatus: updatedOrder.payment_status,
        totalAmount: updatedOrder.total_amount,
        paidAt: updatedOrder.paid_at,
      },
    });
  } catch (error) {
    console.error("Payment completion error:", error);
    return NextResponse.json(
      {
        status: "FAILED",
        message: "결제 처리 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
