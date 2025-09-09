import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/../lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("menus")
      .select("*")
      .order("category", { ascending: false })
      .order("name", { ascending: true });

    if (error) {
      return NextResponse.json(
        { error: "메뉴를 불러오는데 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("GET menus error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, category, description, price, half_price, image, size } = body;

    if (!name || !category || !price) {
      return NextResponse.json(
        { error: "필수 필드가 누락되었습니다." },
        { status: 400 }
      );
    }

    const insertData = {
      id: crypto.randomUUID(), // UUID 생성
      name,
      category,
      description: description || null,
      price: Number(price),
      half_price: half_price ? Number(half_price) : null,
      image: image || null,  // image 컬럼 사용
      size: size || null,
      is_available: true,
    };

    const { data, error } = await supabase
      .from("menus")
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "메뉴 추가에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error("POST menu error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}