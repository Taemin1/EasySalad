import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Supabase 무료 플랜은 7일간 요청이 없으면 프로젝트가 일시정지되므로
// Vercel Cron(vercel.json)으로 매일 호출해 가벼운 조회를 보냄
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // CRON_SECRET이 설정되어 있으면 Vercel Cron 요청만 허용
  const cronSecret = process.env.CRON_SECRET;
  if (
    cronSecret &&
    request.headers.get("authorization") !== `Bearer ${cronSecret}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabase.from("menus").select("id").limit(1);

  if (error) {
    console.error("Supabase keep-alive error:", error);
    return NextResponse.json(
      { ok: false, details: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, checkedAt: new Date().toISOString() });
}
