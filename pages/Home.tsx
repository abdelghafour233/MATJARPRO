import React, { useState } from 'react';
import { useStore } from '../store/StoreContext';
import { Category } from '../types';
import { ShoppingCart, Filter, Star } from 'lucide-react';

export const Home = () => {
  const { products, addToCart } = useStore();
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: 'الكل' },
    { id: 'electronics', label: 'إلكترونيات' },
    { id: 'home', label: 'المنزل' },
    { id: 'cars', label: 'السيارات' },
  ];

  return (
    <div className="pb-12">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">أفضل العروض في المغرب</h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            اكتشف تشكيلة واسعة من الإلكترونيات، مستلزمات المنزل، وإكسسوارات السيارات بأسعار لا تقبل المنافسة.
          </p>
          <a href="#products" className="inline-block bg-white text-primary px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg">
            تصفح المنتجات
          </a>
        </div>
      </div>

      {/* Products Section */}
      <div id="products" className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold text-gray-800">أحدث المنتجات</h2>
          
          {/* Categories Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeCategory === cat.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden border border-gray-100 flex flex-col">
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                />
                <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 text-xs font-bold rounded text-gray-700">
                  {categories.find(c => c.id === product.category)?.label}
                </span>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{product.name}</h3>
                </div>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <span className="text-xl font-bold text-primary">{product.price} د.م</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-secondary text-white p-2 rounded-full hover:bg-gray-700 transition flex items-center gap-2 px-4 text-sm"
                  >
                    <ShoppingCart size={18} />
                    <span>إضافة</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">لا توجد منتجات في هذا القسم حالياً.</p>
          </div>
        )}
      </div>
    </div>
  );
};