import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// 주문 상태 업데이트 API
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: orderId } = await params;
    const body = await request.json();
    const { status } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: "주문 ID가 필요합니다." },
        { status: 400 }
      );
    }

    if (!status) {
      return NextResponse.json(
        { error: "변경할 상태 값이 필요합니다." },
        { status: 400 }
      );
    }

    // 주문 상태 업데이트
    const { data: order, error: updateError } = await supabase
      .from("orders")
      .update({
        status: status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId)
      .select()
      .single();

    if (updateError) {
      console.error("Order update error:", updateError);
      return NextResponse.json(
        { error: "주문 상태 업데이트에 실패했습니다." },
        { status: 500 }
      );
    }

    if (!order) {
      return NextResponse.json(
        { error: "해당 주문을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.order_number,
        status: order.status,
      },
    });
  } catch (error) {
    console.error("Order update error:", error);
    return NextResponse.json(
      { error: "주문 업데이트 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
