import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/../lib/supabase";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, category, description, price, half_price, image, size, is_available } = body;

    if (!name || !category || !price) {
      return NextResponse.json(
        { error: "필수 필드가 누락되었습니다." },
        { status: 400 }
      );
    }

    const updateData = {
      name,
      category,
      description: description || null,
      price: Number(price),
      half_price: half_price ? Number(half_price) : null,
      image: image || null,  // image 컬럼 사용
      size: size || null,
      is_available: is_available !== undefined ? is_available : true,
    };

    // 먼저 해당 메뉴가 존재하는지 확인
    const { data: existingMenu, error: checkError } = await supabase
      .from("menus")
      .select("*")
      .eq("id", id)
      .single();

    if (checkError) {
      return NextResponse.json(
        { error: "메뉴를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 업데이트 실행
    const { data, error } = await supabase
      .from("menus")
      .update(updateData)
      .eq("id", id)
      .select();

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json(
        { error: "메뉴 수정에 실패했습니다." },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "업데이트된 메뉴가 없습니다." },
        { status: 404 }
      );
    }

    // 단일 결과 반환
    const updatedMenu = Array.isArray(data) ? data[0] : data;
    return NextResponse.json({ data: updatedMenu });
  } catch (error) {
    console.error("PUT menu error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { error } = await supabase
      .from("menus")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: "메뉴 삭제에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "메뉴가 성공적으로 삭제되었습니다." });
  } catch (error) {
    console.error("DELETE menu error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}