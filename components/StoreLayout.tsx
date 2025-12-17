import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Phone, ShoppingBag } from 'lucide-react';
import { useStore } from '../store/StoreContext';

interface StoreLayoutProps {
  children: React.ReactNode;
}

export const StoreLayout: React.FC<StoreLayoutProps> = ({ children }) => {
  const { cart, settings } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
              <ShoppingBag className="h-8 w-8" />
              <span>{settings.storeName}</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-gray-700 hover:text-primary font-medium transition">الرئيسية</Link>
              <Link to="/#products" className="text-gray-700 hover:text-primary font-medium transition">المنتجات</Link>
              <Link to="/cart" className="relative p-2 text-gray-700 hover:text-primary transition">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 p-4">
            <div className="flex flex-col gap-4">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-gray-700 font-medium">الرئيسية</Link>
              <Link to="/#products" onClick={() => setIsMenuOpen(false)} className="text-gray-700 font-medium">المنتجات</Link>
              <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between text-gray-700 font-medium">
                <span>سلة المشتريات</span>
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">{cartCount}</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">{settings.storeName}</h3>
              <p className="text-gray-400 leading-relaxed">
                وجهتكم الأولى للتسوق الإلكتروني في المغرب. نوفر لكم أفضل المنتجات بجودة عالية وأسعار منافسة.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">الرئيسية</Link></li>
                <li><Link to="/cart" className="text-gray-400 hover:text-white">سلة المشتريات</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white">سياسة الخصوصية</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">شروط الاستخدام</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">تواصل معنا</h3>
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <Phone className="h-5 w-5" />
                <span>+212 600 000 000</span>
              </div>
              <p className="text-gray-400">الدار البيضاء، المغرب</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} {settings.storeName}. جميع الحقوق محفوظة.</p>
            <Link to="/admin" className="mt-2 md:mt-0 hover:text-white transition">دخول لوحة التحكم (للمدير)</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};