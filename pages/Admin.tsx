import React, { useState } from 'react';
import { useStore } from '../store/StoreContext';
import { 
  LayoutDashboard, ShoppingBag, Settings, Package, 
  Trash2, Plus, Save, Download, Globe, Code, 
  BarChart3, FileSpreadsheet, ExternalLink
} from 'lucide-react';
import { Product, Category } from '../types';

type Tab = 'dashboard' | 'products' | 'orders' | 'settings';

export const Admin = () => {
  const { 
    products, orders, settings, 
    addProduct, deleteProduct, updateSettings 
  } = useStore();
  
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  // --- Components for each tab ---

  const DashboardTab = () => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const pendingOrders = orders.filter(o => o.status === 'pending').length;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium mb-2">إجمالي المبيعات</h3>
            <p className="text-3xl font-bold text-primary">{totalRevenue} د.م</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium mb-2">عدد الطلبات</h3>
            <p className="text-3xl font-bold text-gray-800">{orders.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium mb-2">طلبات معلقة</h3>
            <p className="text-3xl font-bold text-orange-500">{pendingOrders}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-4">آخر الطلبات</h3>
          {orders.length === 0 ? (
            <p className="text-gray-500">لا توجد طلبات بعد.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-right">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="p-3 rounded-r-lg">الرقم</th>
                    <th className="p-3">العميل</th>
                    <th className="p-3">المدينة</th>
                    <th className="p-3">المبلغ</th>
                    <th className="p-3 rounded-l-lg">التاريخ</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map(order => (
                    <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="p-3 font-mono text-xs">#{order.id.slice(-6)}</td>
                      <td className="p-3 font-medium">{order.customerName}</td>
                      <td className="p-3">{order.city}</td>
                      <td className="p-3 font-bold text-primary">{order.total} د.م</td>
                      <td className="p-3 text-gray-500">{new Date(order.date).toLocaleDateString('ar-MA')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  };

  const ProductsTab = () => {
    const [isAdding, setIsAdding] = useState(false);
    const [newProduct, setNewProduct] = useState<Partial<Product>>({
      category: 'electronics',
      price: 0,
      name: '',
      description: '',
      image: 'https://picsum.photos/400/300'
    });

    const handleAdd = () => {
      if (!newProduct.name || !newProduct.price) return;
      addProduct({
        ...newProduct as Product,
        id: Date.now().toString()
      });
      setIsAdding(false);
      setNewProduct({ category: 'electronics', price: 0, name: '', description: '', image: 'https://picsum.photos/400/300' });
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">إدارة المنتجات</h2>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
          >
            <Plus size={18} />
            <span>منتج جديد</span>
          </button>
        </div>

        {isAdding && (
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200 animate-fade-in">
            <h3 className="font-bold mb-4">إضافة منتج جديد</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                placeholder="اسم المنتج" 
                className="border p-2 rounded" 
                value={newProduct.name}
                onChange={e => setNewProduct({...newProduct, name: e.target.value})}
              />
              <input 
                type="number" 
                placeholder="السعر (د.م)" 
                className="border p-2 rounded" 
                value={newProduct.price || ''}
                onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
              />
              <select 
                className="border p-2 rounded"
                value={newProduct.category}
                onChange={e => setNewProduct({...newProduct, category: e.target.value as Category})}
              >
                <option value="electronics">إلكترونيات</option>
                <option value="home">المنزل</option>
                <option value="cars">السيارات</option>
              </select>
              <input 
                placeholder="رابط الصورة" 
                className="border p-2 rounded" 
                value={newProduct.image}
                onChange={e => setNewProduct({...newProduct, image: e.target.value})}
              />
              <textarea 
                placeholder="الوصف" 
                className="border p-2 rounded md:col-span-2" 
                value={newProduct.description}
                onChange={e => setNewProduct({...newProduct, description: e.target.value})}
              />
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={handleAdd} className="bg-primary text-white px-4 py-2 rounded">حفظ</button>
              <button onClick={() => setIsAdding(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">إلغاء</button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(product => (
            <div key={product.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
              <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded bg-gray-100" />
              <div className="flex-grow">
                <h4 className="font-bold text-gray-800 line-clamp-1">{product.name}</h4>
                <p className="text-primary font-bold text-sm">{product.price} د.م</p>
                <p className="text-xs text-gray-500">{product.category}</p>
              </div>
              <button 
                onClick={() => deleteProduct(product.id)}
                className="text-red-500 hover:bg-red-50 p-2 rounded h-fit"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const SettingsTab = () => {
    const [localSettings, setLocalSettings] = useState(settings);
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
      updateSettings(localSettings);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    };

    return (
      <div className="space-y-8 max-w-4xl">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">إعدادات المتجر</h2>
          <button 
            onClick={handleSave}
            className="bg-primary text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 shadow"
          >
            <Save size={18} />
            <span>{isSaved ? 'تم الحفظ!' : 'حفظ التغييرات'}</span>
          </button>
        </div>

        {/* Section: Tracking Pixels */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4 text-gray-800">
            <BarChart3 className="text-blue-600" />
            <h3 className="font-bold text-lg">أكواد التتبع (Pixels)</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Facebook Pixel ID</label>
              <input 
                type="text" 
                className="w-full border p-2 rounded text-left" 
                placeholder="E.g., 1234567890"
                dir="ltr"
                value={localSettings.pixels.facebook}
                onChange={e => setLocalSettings({...localSettings, pixels: {...localSettings.pixels, facebook: e.target.value}})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">TikTok Pixel ID</label>
              <input 
                type="text" 
                className="w-full border p-2 rounded text-left" 
                placeholder="E.g., C5N..."
                dir="ltr"
                value={localSettings.pixels.tiktok}
                onChange={e => setLocalSettings({...localSettings, pixels: {...localSettings.pixels, tiktok: e.target.value}})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Google Analytics / GTM ID</label>
              <input 
                type="text" 
                className="w-full border p-2 rounded text-left" 
                placeholder="E.g., G-XXXXXXXXXX"
                dir="ltr"
                value={localSettings.pixels.google}
                onChange={e => setLocalSettings({...localSettings, pixels: {...localSettings.pixels, google: e.target.value}})}
              />
            </div>
          </div>
        </div>

        {/* Section: Integrations */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4 text-gray-800">
            <FileSpreadsheet className="text-green-600" />
            <h3 className="font-bold text-lg">الربط والبيانات</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Google Sheets Webhook URL</label>
              <p className="text-xs text-gray-500 mb-2">أدخل رابط Webhook لربط الطلبات تلقائياً مع Google Sheets.</p>
              <input 
                type="url" 
                className="w-full border p-2 rounded text-left" 
                placeholder="https://script.google.com/macros/s/..."
                dir="ltr"
                value={localSettings.integrations.googleSheetsUrl}
                onChange={e => setLocalSettings({...localSettings, integrations: { ...localSettings.integrations, googleSheetsUrl: e.target.value}})}
              />
            </div>
          </div>
        </div>

        {/* Section: Domain */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4 text-gray-800">
            <Globe className="text-purple-600" />
            <h3 className="font-bold text-lg">الدومين والاستضافة</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">النطاق المخصص (Domain)</label>
              <input 
                type="text" 
                className="w-full border p-2 rounded text-left" 
                placeholder="www.mystore.ma"
                dir="ltr"
                value={localSettings.domain.customDomain}
                onChange={e => setLocalSettings({...localSettings, domain: {...localSettings.domain, customDomain: e.target.value}})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Name Servers</label>
              <input 
                type="text" 
                className="w-full border p-2 rounded text-left bg-gray-50" 
                readOnly
                dir="ltr"
                value={localSettings.domain.nameservers}
              />
              <p className="text-xs text-gray-500 mt-1">قم بتوجيه نطاقك إلى هذه العناوين.</p>
            </div>
          </div>
        </div>

        {/* Section: Custom Code */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4 text-gray-800">
            <Code className="text-gray-600" />
            <h3 className="font-bold text-lg">كود JavaScript مخصص</h3>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Header Script</label>
            <textarea 
              className="w-full border p-2 rounded font-mono text-sm h-32 text-left"
              placeholder="<!-- Add custom scripts here -->"
              dir="ltr"
              value={localSettings.customScripts}
              onChange={e => setLocalSettings({...localSettings, customScripts: e.target.value})}
            />
          </div>
        </div>

        {/* Export */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">تحميل نسخة من الموقع</h3>
            <p className="text-sm text-gray-500">تحميل الكود المصدري HTML/CSS/JS لاستضافته خارجياً.</p>
          </div>
          <button 
            className="border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50"
            onClick={() => alert('هذه الميزة ستقوم بتوليد ملف Zip في النسخة الكاملة.')}
          >
            <Download size={18} />
            <span>تصدير</span>
          </button>
        </div>
      </div>
    );
  };

  // --- Main Layout ---

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-secondary text-white flex-shrink-0">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Settings className="text-primary" />
            <span>لوحة التحكم</span>
          </h1>
        </div>
        <nav className="p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${activeTab === 'dashboard' ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-700'}`}
          >
            <LayoutDashboard size={20} />
            <span>نظرة عامة</span>
          </button>
          <button 
             onClick={() => setActiveTab('products')}
             className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${activeTab === 'products' ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-700'}`}
          >
            <Package size={20} />
            <span>المنتجات</span>
          </button>
          <button 
             onClick={() => setActiveTab('orders')}
             className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${activeTab === 'orders' ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-700'}`}
          >
            <ShoppingBag size={20} />
            <span>الطلبات</span>
          </button>
          <button 
             onClick={() => setActiveTab('settings')}
             className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${activeTab === 'settings' ? 'bg-primary text-white' : 'text-gray-300 hover:bg-gray-700'}`}
          >
            <Settings size={20} />
            <span>الإعدادات والربط</span>
          </button>
          
          <div className="pt-8 mt-8 border-t border-gray-700">
            <a href="/" className="flex items-center gap-3 px-4 text-gray-400 hover:text-white transition">
              <ExternalLink size={18} />
              <span>زيارة المتجر</span>
            </a>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 overflow-y-auto h-screen">
        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'products' && <ProductsTab />}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">كل الطلبات</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-right">
                <thead className="bg-gray-50 text-gray-700 border-b">
                  <tr>
                    <th className="p-4">الرقم</th>
                    <th className="p-4">التاريخ</th>
                    <th className="p-4">معلومات الزبون</th>
                    <th className="p-4">العناصر</th>
                    <th className="p-4">المجموع</th>
                    <th className="p-4">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="p-4 font-mono text-xs">#{order.id}</td>
                      <td className="p-4 text-sm">{new Date(order.date).toLocaleDateString('ar-MA')}</td>
                      <td className="p-4">
                        <p className="font-bold">{order.customerName}</p>
                        <p className="text-sm text-gray-500">{order.city} - {order.phone}</p>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-gray-600">
                          {order.items.map((item, idx) => (
                            <div key={idx}>{item.quantity}x {item.name}</div>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 font-bold text-primary">{order.total} د.م</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {order.status === 'pending' ? 'قيد الانتظار' : order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {orders.length === 0 && <div className="p-8 text-center text-gray-500">لا توجد طلبات.</div>}
            </div>
          </div>
        )}
        {activeTab === 'settings' && <SettingsTab />}
      </main>
    </div>
  );
};