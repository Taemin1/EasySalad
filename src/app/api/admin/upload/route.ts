import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/../lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "파일이 선택되지 않았습니다." },
        { status: 400 }
      );
    }

    // 파일 크기 제한 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "파일 크기가 5MB를 초과할 수 없습니다." },
        { status: 400 }
      );
    }

    // 이미지 파일 형식 확인
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "지원되지 않는 파일 형식입니다. (JPG, PNG, WebP만 허용)" },
        { status: 400 }
      );
    }

    // 고유한 파일명 생성
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

    // Supabase Storage에 업로드
    const { error } = await supabase.storage
      .from("menu-images")
      .upload(fileName, file, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error);
      return NextResponse.json(
        { error: "파일 업로드에 실패했습니다." },
        { status: 500 }
      );
    }

    // 공개 URL 생성
    const { data: publicUrlData } = supabase.storage
      .from("menu-images")
      .getPublicUrl(fileName);

    return NextResponse.json({
      data: {
        fileName,
        url: publicUrlData.publicUrl,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}