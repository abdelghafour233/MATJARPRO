import { Product, SiteSettings } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'هاتف ذكي فائق السرعة',
    price: 3500,
    category: 'electronics',
    image: 'https://picsum.photos/400/300?random=1',
    description: 'هاتف ذكي بذاكرة 256 جيجا وكاميرا احترافية.',
  },
  {
    id: '2',
    name: 'مكنسة كهربائية روبوت',
    price: 1200,
    category: 'home',
    image: 'https://picsum.photos/400/300?random=2',
    description: 'تنظيف تلقائي للمنزل مع تحكم عبر التطبيق.',
  },
  {
    id: '3',
    name: 'شاشة سيارة ذكية',
    price: 800,
    category: 'cars',
    image: 'https://picsum.photos/400/300?random=3',
    description: 'شاشة لمس 10 بوصة تدعم أندرويد أوتو وكاربلاي.',
  },
  {
    id: '4',
    name: 'سماعات بلوتوث عازلة للصوت',
    price: 450,
    category: 'electronics',
    image: 'https://picsum.photos/400/300?random=4',
    description: 'جودة صوت عالية مع بطارية تدوم طويلاً.',
  },
  {
    id: '5',
    name: 'طقم أواني طهي جرانيت',
    price: 950,
    category: 'home',
    image: 'https://picsum.photos/400/300?random=5',
    description: 'طقم متكامل غير قابل للالتصاق وعالي الجودة.',
  },
  {
    id: '6',
    name: 'مضخة هواء للإطارات',
    price: 250,
    category: 'cars',
    image: 'https://picsum.photos/400/300?random=6',
    description: 'مضخة محمولة وسريعة لجميع أنواع السيارات.',
  },
];

export const INITIAL_SETTINGS: SiteSettings = {
  storeName: 'متجر المغرب برو',
  pixels: {
    facebook: '',
    google: '',
    tiktok: '',
  },
  integrations: {
    googleSheetsUrl: '',
  },
  domain: {
    customDomain: '',
    nameservers: 'ns1.hosting.com, ns2.hosting.com',
  },
  customScripts: '',
};