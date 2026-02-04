import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // 세션 새로고침 (필수)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("🔒 Proxy 실행:", request.nextUrl.pathname);
  console.log("👤 사용자:", user ? user.email : "없음");

  // 보호할 경로들
  const protectedPaths = [
    "/university/duksung",
    "/thisisforadmin",
    "/api/admin",
  ];
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );

  // 로그인 페이지는 제외
  const isLoginPage = request.nextUrl.pathname === "/thisisforadmin/login";
  if (isLoginPage) {
    console.log("✅ 로그인 페이지 - 통과");
    return supabaseResponse;
  }

  console.log("🛡️ 보호된 경로:", isProtectedPath);

  // 보호된 경로인데 사용자가 없으면 로그인 페이지로 리다이렉트
  if (isProtectedPath && !user) {
    // Admin 경로는 admin 로그인으로
    if (
      request.nextUrl.pathname.startsWith("/thisisforadmin") ||
      request.nextUrl.pathname.startsWith("/api/admin")
    ) {
      const redirectUrl = new URL("/thisisforadmin/login", request.url);
      return NextResponse.redirect(redirectUrl);
    }
    // University 경로는 university 로그인으로
    const redirectUrl = new URL("/university/login", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  console.log("✅ 통과");
  return supabaseResponse;
}

export const config = {
  matcher: [
    "/university/duksung/:path*",
    "/thisisforadmin/:path*",
    "/api/admin/:path*",
  ],
};
