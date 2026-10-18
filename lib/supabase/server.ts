import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// 로그인 세션(쿠키)을 담아 Supabase를 호출하는 서버용 클라이언트
// RLS의 authenticated 정책을 통과해야 하는 관리자 API에서 사용
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        },
      },
    },
  );
}
