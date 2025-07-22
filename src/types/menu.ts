export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description?: string;
  price?: number;
  image?: string;
  isNew?: boolean;
  isPopular?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}
