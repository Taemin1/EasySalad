export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description?: string;
  price: number;
  halfPrice?: number;
  image?: string;
  size?: string | string[];
  isNew?: boolean;
  isPopular?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}
