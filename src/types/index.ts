export type ProductCategory = 'veg' | 'non-veg';

export interface WeightOption {
  weight: string; // e.g. "250g", "400g", "800g"
  price: number; // in INR
  originalPrice?: number;
  inStock: boolean;
}

export interface PickleProduct {
  id: string;
  slug: string;
  number: string; // e.g. "01", "02", ... "11"
  name: string;
  shortName: string;
  tagline: string;
  category: ProductCategory;
  description: string;
  flavorProfile: string;
  spiceLevel: number; // 1 to 5
  weights: WeightOption[];
  ingredients: string[];
  aromaNotes: string[];
  pairingSuggestions: string[];
  storageAdvice: string;
  shelfLife: string;
  bgGradient: string;
  accentColor: string;
  textColor: string;
  cardBg: string;
  pickleColor: string; // Hex for jar visual
  pickleOilColor: string;
  textureDetails: string;
  image?: string;
  featured?: boolean;
}

export interface CartItem {
  id: string; // composite: `${product.id}-${weight}`
  product: PickleProduct;
  selectedWeight: string;
  quantity: number;
  price: number;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  review: string;
  verified: boolean;
  pickleName: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'Products' | 'Ingredients' | 'Ordering & Shipping' | 'Storage';
}

