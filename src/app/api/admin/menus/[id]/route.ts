import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/../lib/supabase";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log("PUT request for menu ID:", id);
    
    const body = await request.json();
    console.log("Request body:", JSON.stringify(body, null, 2));
    
    const { name, category, description, price, half_price, image, size, is_available } = body;

    if (!name || !category || !price) {
      console.log("Missing required fields:", { name: !!name, category: !!category, price: !!price });
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
    
    console.log("Update data:", JSON.stringify(updateData, null, 2));

    // 먼저 해당 메뉴가 존재하는지 확인하고 현재 데이터 가져오기
    const { data: existingMenu, error: checkError } = await supabase
      .from("menus")
      .select("*")
      .eq("id", id)
      .single();

    if (checkError) {
      console.error("Menu check error:", checkError);
      return NextResponse.json(
        { error: "메뉴를 찾을 수 없습니다.", details: checkError.message },
        { status: 404 }
      );
    }

    console.log("Existing menu data:", JSON.stringify(existingMenu, null, 2));
    console.log("ID type check - Received ID:", typeof id, id);
    console.log("ID type check - Existing menu ID:", typeof existingMenu.id, existingMenu.id);

    // 업데이트 실행
    const { data, error, count } = await supabase
      .from("menus")
      .update(updateData)
      .eq("id", id)
      .select();

    console.log("Update result - data:", data);
    console.log("Update result - error:", error);
    console.log("Update result - count:", count);

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json(
        { error: "메뉴 수정에 실패했습니다.", details: error.message },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      console.log("No data returned after update");
      console.log("Trying alternative update approach...");
      
      // 대안: upsert 방식으로 시도
      const { data: upsertData, error: upsertError } = await supabase
        .from("menus")
        .upsert({ ...updateData, id: id }, { onConflict: 'id' })
        .select();
      
      console.log("Upsert result:", { data: upsertData, error: upsertError });
      
      if (upsertError || !upsertData || upsertData.length === 0) {
        return NextResponse.json(
          { 
            error: "업데이트된 메뉴가 없습니다.", 
            debug: {
              originalUpdate: { data, error, count },
              upsertAttempt: { data: upsertData, error: upsertError }
            }
          },
          { status: 404 }
        );
      }
      
      const updatedMenu = Array.isArray(upsertData) ? upsertData[0] : upsertData;
      console.log("Upsert successful:", updatedMenu);
      return NextResponse.json({ data: updatedMenu });
    }

    // 단일 결과 반환
    const updatedMenu = Array.isArray(data) ? data[0] : data;
    console.log("Update successful:", updatedMenu);
    return NextResponse.json({ data: updatedMenu });
  } catch (error) {
    console.error("PUT menu error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다.", details: error instanceof Error ? error.message : String(error) },
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