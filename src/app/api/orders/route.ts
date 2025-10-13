import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// 주문 데이터 타입 정의
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

interface DeliveryInfo {
  name: string;
  phone: string;
  email?: string;
  address: string;
  detailAddress: string;
  zipCode: string;
  deliveryDate: string;
  deliveryTime: string;
}

interface OrderRequest {
  items: OrderItem[];
  deliveryInfo: DeliveryInfo;
  totalAmount: number;
  deliveryFee: number;
}

export async function POST(request: NextRequest) {
  try {
    console.log("=== Order API Request Started ===");
    const body: OrderRequest = await request.json();
    console.log("Request body:", JSON.stringify(body, null, 2));
    const { items, deliveryInfo, totalAmount, deliveryFee } = body;

    // 입력값 검증
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "주문할 상품이 없습니다." },
        { status: 400 }
      );
    }

    if (
      !deliveryInfo.name ||
      !deliveryInfo.phone ||
      !deliveryInfo.address ||
      !deliveryInfo.deliveryDate ||
      !deliveryInfo.deliveryTime
    ) {
      return NextResponse.json(
        { error: "필수 배송 정보가 누락되었습니다." },
        { status: 400 }
      );
    }

    // 배송 날짜 검증 (2일 후부터 가능)
    const deliveryDate = new Date(deliveryInfo.deliveryDate);
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 2);
    minDate.setHours(0, 0, 0, 0);

    if (deliveryDate < minDate) {
      return NextResponse.json(
        { error: "배송일은 주문일 기준 2일 후부터 선택 가능합니다." },
        { status: 400 }
      );
    }

    // 주문 생성 (트랜잭션 사용)
    console.log("Creating order in database...");
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_name: deliveryInfo.name,
        customer_phone: deliveryInfo.phone,
        customer_email: deliveryInfo.email,
        delivery_address: deliveryInfo.address,
        delivery_detail_address: deliveryInfo.detailAddress,
        delivery_zip_code: deliveryInfo.zipCode,
        delivery_date: deliveryInfo.deliveryDate,
        delivery_time: deliveryInfo.deliveryTime,
        total_amount: totalAmount,
        delivery_fee: deliveryFee,
        status: "pending",
      })
      .select()
      .single();

    if (orderError) {
      console.error("Order creation error:", orderError);
      console.error("Error details:", JSON.stringify(orderError, null, 2));
      return NextResponse.json(
        {
          error: "주문 생성 중 오류가 발생했습니다.",
          details: orderError.message,
        },
        { status: 500 }
      );
    }

    // 주문 상품 생성
    const orderItems = items.map((item) => ({
      order_id: order.id,
      menu_id: item.id,
      menu_name: item.name,
      menu_category: item.category,
      price: item.price,
      quantity: item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error("Order items creation error:", itemsError);
      // 주문 롤백
      await supabase.from("orders").delete().eq("id", order.id);
      return NextResponse.json(
        { error: "주문 상품 등록 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    // 주문 생성 시에는 이메일을 발송하지 않음
    // 결제 완료 후 /api/payments/complete 에서 이메일 발송

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.order_number,
        status: order.status,
        totalAmount: order.total_amount,
        deliveryDate: order.delivery_date,
        deliveryTime: order.delivery_time,
        customerName: order.customer_name,
        customerPhone: order.customer_phone,
        customerEmail: order.customer_email,
      },
    });
  } catch (error) {
    console.error("Order processing error:", error);
    return NextResponse.json(
      { error: "주문 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// 주문 조회 API
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderNumber = searchParams.get("orderNumber");
    const phone = searchParams.get("phone");

    if (!orderNumber || !phone) {
      return NextResponse.json(
        { error: "주문번호와 연락처를 입력해주세요." },
        { status: 400 }
      );
    }

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
      .eq("order_number", orderNumber)
      .eq("customer_phone", phone)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { error: "주문 정보를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order: {
        orderNumber: order.order_number,
        status: order.status,
        customerName: order.customer_name,
        customerPhone: order.customer_phone,
        deliveryAddress: order.delivery_address,
        deliveryDetailAddress: order.delivery_detail_address,
        deliveryDate: order.delivery_date,
        deliveryTime: order.delivery_time,
        totalAmount: order.total_amount,
        deliveryFee: order.delivery_fee,
        createdAt: order.created_at,
        items: order.order_items,
      },
    });
  } catch (error) {
    console.error("Order lookup error:", error);
    return NextResponse.json(
      { error: "주문 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
