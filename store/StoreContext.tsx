import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Order, CartItem, SiteSettings } from '../types';
import { INITIAL_PRODUCTS, INITIAL_SETTINGS } from '../constants';

interface StoreContextType {
  products: Product[];
  orders: Order[];
  settings: SiteSettings;
  cart: CartItem[];
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  placeOrder: (customer: { name: string; city: string; phone: string }) => void;
  updateSettings: (newSettings: SiteSettings) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateCartQuantity: (id: string, delta: number) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children?: ReactNode }) => {
  // Load from LocalStorage or use initial
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('store_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('store_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('store_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [cart, setCart] = useState<CartItem[]>([]);

  // Persist changes
  useEffect(() => localStorage.setItem('store_products', JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem('store_orders', JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem('store_settings', JSON.stringify(settings)), [settings]);

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const placeOrder = (customer: { name: string; city: string; phone: string }) => {
    const newOrder: Order = {
      id: Date.now().toString(),
      customerName: customer.name,
      city: customer.city,
      phone: customer.phone,
      items: [...cart],
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      date: new Date().toISOString(),
      status: 'pending'
    };
    
    setOrders(prev => [newOrder, ...prev]);
    setCart([]); // Clear cart
    
    // Simulate sending to Google Sheets if URL is present
    if (settings.integrations.googleSheetsUrl) {
      console.log('Sending order to Google Sheets:', settings.integrations.googleSheetsUrl, newOrder);
    }
    
    // Trigger Pixels logic here (simulated)
    console.log('Triggering Purchase Events for Pixels:', settings.pixels);
  };

  const updateSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  return (
    <StoreContext.Provider value={{
      products,
      orders,
      settings,
      cart,
      addProduct,
      deleteProduct,
      placeOrder,
      updateSettings,
      addToCart,
      removeFromCart,
      clearCart,
      updateCartQuantity
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};