import OrderContent from "./OrderContent";
import { getMenuByCategories } from "@/lib/menu";

export default async function OrderPage() {
  const menuCategories = await getMenuByCategories();
  return <OrderContent menuCategories={menuCategories} />;
}
