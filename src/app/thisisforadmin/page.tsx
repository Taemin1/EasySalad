import { redirect } from "next/navigation";

// /thisisforadmin 접속 시 대시보드로 이동 (비로그인 상태면 proxy가 로그인 페이지로 보냄)
export default function AdminIndexPage() {
  redirect("/thisisforadmin/dashboard");
}
