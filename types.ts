export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'electronics' | 'home' | 'cars';
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  city: string;
  phone: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface SiteSettings {
  storeName: string;
  pixels: {
    facebook: string;
    google: string;
    tiktok: string;
  };
  integrations: {
    googleSheetsUrl: string;
  };
  domain: {
    customDomain: string;
    nameservers: string;
  };
  customScripts: string;
}

export type Category = 'all' | 'electronics' | 'home' | 'cars';