import React, { useState } from 'react';
import { useStore } from '../store/StoreContext';
import { Trash2, Plus, Minus, CheckCircle, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity, placeOrder } = useStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    phone: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    placeOrder(formData);
    setIsSuccess(true);
    // Reset form handled by success view or navigation
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-20 w-20 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold mb-4">تم استلام طلبك بنجاح!</h2>
          <p className="text-gray-600 mb-8">
            شكراً لثقتكم بنا. سيقوم فريقنا بالاتصال بكم قريباً لتأكيد الطلب.
          </p>
          <button 
            onClick={() => {
              setIsSuccess(false);
              navigate('/');
            }}
            className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition w-full"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">سلة المشتريات فارغة</h2>
        <p className="text-gray-500 mb-8">لم تقم بإضافة أي منتجات بعد.</p>
        <Link to="/" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
          <ArrowRight size={20} />
          <span>تصفح المنتجات</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">إتمام الطلب</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Cart Items */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-bold mb-6 border-b pb-4">ملخص الطلبية</h2>
          <div className="space-y-6">
            {cart.map(item => (
              <div key={item.id} className="flex gap-4 items-center">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-gray-100" />
                <div className="flex-grow">
                  <h3 className="font-bold text-gray-800">{item.name}</h3>
                  <p className="text-primary font-bold">{item.price} د.م</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border rounded-lg">
                    <button 
                      onClick={() => updateCartQuantity(item.id, -1)}
                      className="p-1 hover:bg-gray-100 text-gray-600"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-2 font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateCartQuantity(item.id, 1)}
                      className="p-1 hover:bg-gray-100 text-gray-600"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t mt-6 pt-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>المجموع الكلي:</span>
              <span className="text-2xl text-primary">{total} د.م</span>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-bold mb-6 border-b pb-4">معلومات الزبون</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
              <input
                type="text"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                placeholder="أدخل اسمك الكامل"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">المدينة</label>
              <input
                type="text"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                placeholder="مدينتك"
                value={formData.city}
                onChange={e => setFormData({...formData, city: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
              <input
                type="tel"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition text-left"
                placeholder="0600000000"
                dir="ltr"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
              >
                تأكيد الطلب - {total} د.م
              </button>
              <p className="text-xs text-gray-500 text-center mt-3">الدفع عند الاستلام. التوصيل متوفر لجميع المدن.</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};