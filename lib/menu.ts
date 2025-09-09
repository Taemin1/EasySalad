import { supabase } from "./supabase";
import { MenuItem, MenuCategory } from "@/types/menu";

// Supabase에서 가져온 raw 데이터 타입
interface MenuFromDB {
  id: string;
  name: string;
  category: string;
  description: string | null;
  image: string | null;
  size: string[] | null;
  price: number;
  half_price: number | null;
  is_available?: boolean;
}

// Supabase 데이터를 MenuItem 타입으로 변환하는 함수
function transformMenuItemFromDB(dbItem: MenuFromDB): MenuItem {
  return {
    id: dbItem.id,
    name: dbItem.name,
    category: dbItem.category,
    description: dbItem.description || undefined,
    image: dbItem.image || undefined,
    size: dbItem.size || undefined,
    price: dbItem.price,
    halfPrice: dbItem.half_price || undefined,
  };
}

// 모든 메뉴 아이템을 가져오는 함수
export async function getAllMenuItems(): Promise<MenuItem[]> {
  try {
    const { data, error } = await supabase
      .from("menus")
      .select("*")
      .order("category", { ascending: false })
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching menu items:", error);
      return [];
    }

    return (data as MenuFromDB[]).map(transformMenuItemFromDB);
  } catch (error) {
    console.error("Error in getAllMenuItems:", error);
    return [];
  }
}

// 카테고리별로 그룹화된 메뉴 데이터를 가져오는 함수
export async function getMenuByCategories(): Promise<MenuCategory[]> {
  try {
    const menuItems = await getAllMenuItems();
    
    // 카테고리명 매핑
    const categoryNames: { [key: string]: string } = {
      sandwiches: "샌드위치",
      salads: "샐러드",
      panini: "파니니",
      lunchbox: "샌드위치 도시락 박스",
      beverages: "음료",
      desserts: "디저트",
      meals: "식사류",
    };

    // 카테고리별로 그룹화
    const groupedByCategory = menuItems.reduce((acc, item) => {
      const category = item.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {} as { [key: string]: MenuItem[] });

    // MenuCategory[] 형태로 변환
    return Object.entries(groupedByCategory).map(([categoryId, items]) => ({
      id: categoryId,
      name: categoryNames[categoryId] || categoryId,
      items,
    }));
  } catch (error) {
    console.error("Error in getMenuByCategories:", error);
    return [];
  }
}

// 특정 카테고리의 메뉴만 가져오는 함수
export async function getMenuByCategory(categoryId: string): Promise<MenuItem[]> {
  try {
    const { data, error } = await supabase
      .from("menus")
      .select("*")
      .eq("category", categoryId)
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching menu items by category:", error);
      return [];
    }

    return (data as MenuFromDB[]).map(transformMenuItemFromDB);
  } catch (error) {
    console.error("Error in getMenuByCategory:", error);
    return [];
  }
}

// 특정 메뉴 아이템을 ID로 가져오는 함수
export async function getMenuItemById(id: string): Promise<MenuItem | null> {
  try {
    const { data, error } = await supabase
      .from("menus")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching menu item by ID:", error);
      return null;
    }

    return transformMenuItemFromDB(data as MenuFromDB);
  } catch (error) {
    console.error("Error in getMenuItemById:", error);
    return null;
  }
}

