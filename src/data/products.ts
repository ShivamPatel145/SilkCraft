export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  fabric: string;
  color: string;
  category: string;
  subcategory: string;
  rating: number;
  reviews: number;
  images: string[];
  description: string;
  features: string[];
  specifications: {
    fabric: string;
    weave: string;
    length: string;
    width: string;
    blousePiece: boolean;
    careInstructions: string[];
    origin: string;
  };
  isNew: boolean;
  inStock: boolean;
  stockQuantity: number;
  tags: string[];
  discount?: number;
}

export const categories = [
  { id: 'silk', name: 'Silk Sarees', count: 4 },
  { id: 'cotton', name: 'Cotton Sarees', count: 1 },
  { id: 'georgette', name: 'Georgette Sarees', count: 1 },
  { id: 'chiffon', name: 'Chiffon Sarees', count: 1 },
  { id: 'net', name: 'Net Sarees', count: 1 },
  { id: 'designer', name: 'Designer Sarees', count: 2 },
  { id: 'banarasi', name: 'Banarasi Sarees', count: 2 },
  { id: 'kanjivaram', name: 'Kanjivaram Sarees', count: 1 },
  { id: 'velvet', name: 'Velvet Sarees', count: 1 },
  { id: 'organza', name: 'Organza Sarees', count: 1 },
  { id: 'chanderi', name: 'Chanderi Sarees', count: 1 },
  { id: 'art-silk', name: 'Art Silk Sarees', count: 1 },
  { id: 'linen', name: 'Linen Sarees', count: 1 },
];

export const colors = [
  { id: 'red', name: 'Red', hex: '#DC2626' },
  { id: 'blue', name: 'Blue', hex: '#2563EB' },
  { id: 'green', name: 'Green', hex: '#16A34A' },
  { id: 'yellow', name: 'Yellow', hex: '#CA8A04' },
  { id: 'purple', name: 'Purple', hex: '#9333EA' },
  { id: 'pink', name: 'Pink', hex: '#EC4899' },
  { id: 'orange', name: 'Orange', hex: '#EA580C' },
  { id: 'black', name: 'Black', hex: '#000000' },
  { id: 'white', name: 'White', hex: '#FFFFFF' },
  { id: 'gold', name: 'Gold', hex: '#F59E0B' },
  { id: 'cream', name: 'Cream', hex: '#FEF3C7' },
  { id: 'turquoise', name: 'Turquoise', hex: '#06B6D4' },
];

export const priceRanges = [
  { id: 'under-5k', label: 'Under ₹5,000', min: 0, max: 5000 },
  { id: '5k-10k', label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
  { id: '10k-20k', label: '₹10,000 - ₹20,000', min: 10000, max: 20000 },
  { id: '20k-50k', label: '₹20,000 - ₹50,000', min: 20000, max: 50000 },
  { id: 'above-50k', label: 'Above ₹50,000', min: 50000, max: Infinity },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Royal Emerald Silk Saree",
    price: 15999,
    originalPrice: 19999,
    fabric: "Pure Silk",
    color: "Emerald Green",
    category: "silk",
    subcategory: "banarasi",
    rating: 4.8,
    reviews: 124,
    images: [
      "/src/assets/Royal_Emerald_Slik.png",
      "/src/assets/Royal_Emerald_Silk_1.png",
      "/src/assets/Royal_Emerald_Slik_2.png",
    ],
    description: "Exquisite emerald green silk saree with intricate golden zari work. This masterpiece showcases traditional Banarasi craftsmanship with contemporary elegance.",
    features: [
      "Hand-woven pure silk fabric",
      "24k gold zari embroidery",
      "Traditional Banarasi design",
      "Matching blouse piece included",
      "Dry clean only"
    ],
    specifications: {
      fabric: "100% Pure Mulberry Silk",
      weave: "Banarasi Handloom",
      length: "6.3 meters",
      width: "1.15 meters",
      blousePiece: true,
      careInstructions: ["Dry clean only", "Store in cotton cloth", "Avoid direct sunlight"],
      origin: "Varanasi, Uttar Pradesh"
    },
    isNew: true,
    inStock: true,
    stockQuantity: 15,
    tags: ["wedding", "festive", "traditional", "handwoven"],
    discount: 20
  },
  {
    id: 2,
    name: "Purple Banarasi Heritage",
    price: 12999,
    originalPrice: 15999,
    fabric: "Banarasi Silk",
    color: "Royal Purple",
    category: "silk",
    subcategory: "banarasi",
    rating: 4.9,
    reviews: 89,
    images: [
      "/src/assets/Purple_Banarasi_heritage.png",
      "/src/assets/Purple_Banarasi_heritage_1.png",
      "/src/assets/Purple_Banarasi_heritage_2.png",
    ],
    description: "Rich purple Banarasi silk saree with traditional motifs and silver zari work. Perfect for weddings and special occasions.",
    features: [
      "Pure Banarasi silk",
      "Silver zari work",
      "Traditional motifs",
      "Rich purple color",
      "Heritage craftsmanship"
    ],
    specifications: {
      fabric: "100% Pure Silk",
      weave: "Banarasi Handloom",
      length: "6.3 meters",
      width: "1.15 meters",
      blousePiece: true,
      careInstructions: ["Dry clean only", "Iron on low heat", "Store properly"],
      origin: "Varanasi, Uttar Pradesh"
    },
    isNew: false,
    inStock: true,
    stockQuantity: 8,
    tags: ["wedding", "traditional", "silk", "banarasi"]
  },
  {
    id: 3,
    name: "Golden Kanjivaram Classic",
    price: 18999,
    originalPrice: 22999,
    fabric: "Kanjivaram Silk",
    color: "Golden Yellow",
    category: "silk",
    subcategory: "kanjivaram",
    rating: 4.7,
    reviews: 156,
    images: [
      "/src/assets/Golden_Kanjivaram_Classic.png",
      "/src/assets/Golden_Kanjivaram_Classic_1.png",
      "/src/assets/Golden_Kanjivaram_Classic.png",
    ],
    description: "Stunning golden Kanjivaram silk saree with temple border design. A timeless piece that represents South Indian silk tradition.",
    features: [
      "Pure Kanjivaram silk",
      "Temple border design",
      "Gold zari work",
      "Traditional patterns",
      "Premium quality"
    ],
    specifications: {
      fabric: "100% Pure Mulberry Silk",
      weave: "Kanjivaram Handloom",
      length: "6.3 meters",
      width: "1.15 meters",
      blousePiece: true,
      careInstructions: ["Dry clean only", "Avoid moisture", "Store with care"],
      origin: "Kanchipuram, Tamil Nadu"
    },
    isNew: true,
    inStock: false,
    stockQuantity: 0,
    tags: ["wedding", "south-indian", "traditional", "silk"]
  },
  {
    id: 4,
    name: "Coral Pink Georgette Elegance",
    price: 8999,
    originalPrice: 11999,
    fabric: "Georgette",
    color: "Coral Pink",
    category: "georgette",
    subcategory: "party-wear",
    rating: 4.6,
    reviews: 73,
    images: [
      "/src/assets/Coral_Pink_Organza_Silk_Embroidered.png",
      "/src/assets/Coral_Pink_Organza_Silk_Embroidered_1.png",
      "/src/assets/Coral_Pink_Organza_Silk_Embroidered_2.png",
    ],
    description: "Elegant coral pink georgette saree with delicate embroidery work. Perfect for parties and casual occasions.",
    features: [
      "Soft georgette fabric",
      "Embroidery work",
      "Comfortable drape",
      "Party wear design",
      "Easy to maintain"
    ],
    specifications: {
      fabric: "100% Georgette",
      weave: "Machine woven",
      length: "6.3 meters",
      width: "1.15 meters",
      blousePiece: true,
      careInstructions: ["Hand wash or machine wash", "Iron on medium heat", "Hang dry"],
      origin: "Surat, Gujarat"
    },
    isNew: false,
    inStock: true,
    stockQuantity: 25,
    tags: ["party", "casual", "comfortable", "modern"]
  },
  {
    id: 5,
    name: "Midnight Blue Chiffon Dream",
    price: 6999,
    originalPrice: 8999,
    fabric: "Chiffon",
    color: "Midnight Blue",
    category: "chiffon",
    subcategory: "casual",
    rating: 4.5,
    reviews: 92,
    images: [
      "/src/assets/Purple_Banarasi_heritage.png",
      "/src/assets/Royal_Emerald_Silk_1.png",
      "/src/assets/Golden_Kanjivaram_Classic.png",
    ],
    description: "Graceful midnight blue chiffon saree with sequin work. Light and airy for comfortable all-day wear.",
    features: [
      "Lightweight chiffon",
      "Sequin embellishments",
      "Flowy drape",
      "Comfortable fit",
      "Versatile styling"
    ],
    specifications: {
      fabric: "100% Chiffon",
      weave: "Machine woven",
      length: "6.3 meters",
      width: "1.15 meters",
      blousePiece: true,
      careInstructions: ["Gentle hand wash", "Air dry", "Iron on low heat"],
      origin: "Mumbai, Maharashtra"
    },
    isNew: false,
    inStock: true,
    stockQuantity: 18,
    tags: ["casual", "office", "comfortable", "versatile"]
  },
  {
    id: 6,
    name: "Crimson Red Designer Net",
    price: 14999,
    originalPrice: 18999,
    fabric: "Net",
    color: "Crimson Red",
    category: "net",
    subcategory: "designer",
    rating: 4.8,
    reviews: 67,
    images: [
      "/src/assets/Coral_Pink_Organza_Silk_Embroidered.png",
      "/src/assets/Royal_Emerald_Slik.png",
      "/src/assets/Purple_Banarasi_heritage_1.png",
    ],
    description: "Striking crimson red net saree with heavy embroidery and stone work. A statement piece for special events.",
    features: [
      "Premium net fabric",
      "Heavy embroidery work",
      "Stone embellishments",
      "Designer cut",
      "Wedding special"
    ],
    specifications: {
      fabric: "Premium Net with Lining",
      weave: "Machine embroidered",
      length: "6.3 meters",
      width: "1.15 meters",
      blousePiece: true,
      careInstructions: ["Dry clean only", "Handle with care", "Store in garment bag"],
      origin: "Delhi, India"
    },
    isNew: true,
    inStock: true,
    stockQuantity: 5,
    tags: ["designer", "wedding", "heavy-work", "statement"]
  },
  {
    id: 7,
    name: "Sage Green Cotton Handloom",
    price: 4999,
    originalPrice: 6999,
    fabric: "Cotton",
    color: "Sage Green",
    category: "cotton",
    subcategory: "handloom",
    rating: 4.4,
    reviews: 118,
    images: [
      "/src/assets/Golden_Kanjivaram_Classic_1.png",
      "/src/assets/Purple_Banarasi_heritage_2.png",
      "/src/assets/Royal_Emerald_Slik_2.png",
    ],
    description: "Comfortable sage green cotton handloom saree with traditional border. Perfect for daily wear and office.",
    features: [
      "100% pure cotton",
      "Handloom woven",
      "Breathable fabric",
      "Traditional border",
      "Easy maintenance"
    ],
    specifications: {
      fabric: "100% Pure Cotton",
      weave: "Handloom",
      length: "6.3 meters",
      width: "1.15 meters",
      blousePiece: true,
      careInstructions: ["Machine washable", "Iron on high heat", "Tumble dry"],
      origin: "Pochampally, Telangana"
    },
    isNew: false,
    inStock: true,
    stockQuantity: 35,
    tags: ["daily-wear", "office", "comfortable", "handloom", "eco-friendly"]
  },
  {
    id: 8,
    name: "Ivory White Designer Lehenga Saree",
    price: 24999,
    originalPrice: 29999,
    fabric: "Silk Blend",
    color: "Ivory White",
    category: "designer",
    subcategory: "lehenga-saree",
    rating: 4.9,
    reviews: 45,
    images: [
      "/src/assets/Coral_Pink_Organza_Silk_Embroidered_2.png",
      "/src/assets/Golden_Kanjivaram_Classic.png",
      "/src/assets/Royal_Emerald_Silk_1.png",
    ],
    description: "Luxurious ivory white designer lehenga saree with intricate pearl and crystal work. Perfect for weddings and receptions.",
    features: [
      "Designer lehenga style",
      "Pearl and crystal work",
      "Pre-stitched pleats",
      "Premium silk blend",
      "Bridal collection"
    ],
    specifications: {
      fabric: "Silk Blend with Net",
      weave: "Designer embroidered",
      length: "6.3 meters",
      width: "1.15 meters",
      blousePiece: true,
      careInstructions: ["Dry clean only", "Professional care recommended", "Store with acid-free tissue"],
      origin: "Mumbai, Maharashtra"
    },
    isNew: true,
    inStock: true,
    stockQuantity: 3,
    tags: ["bridal", "designer", "luxury", "wedding", "reception"]
  },
  {
    id: 9,
    name: "Mustard Yellow Bandhani Silk",
    price: 12999,
    originalPrice: 15999,
    fabric: "Bandhani Silk",
    color: "Mustard Yellow",
    category: "silk",
    subcategory: "traditional",
    rating: 4.6,
    reviews: 85,
    images: [
      "/src/assets/Golden_Kanjivaram_Classic.png",
      "/src/assets/Golden_Kanjivaram_Classic_1.png",
      "/src/assets/Coral_Pink_Organza_Silk_Embroidered.png",
    ],
    description: "Traditional mustard yellow Bandhani silk saree with intricate tie-dye patterns. Handcrafted with love from Gujarat.",
    features: [
      "Authentic Bandhani work",
      "Pure silk fabric",
      "Traditional tie-dye",
      "Handcrafted details",
      "Vibrant colors"
    ],
    specifications: {
      fabric: "100% Pure Silk",
      weave: "Bandhani Handwork",
      length: "6.3 meters",
      width: "1.15 meters",
      blousePiece: true,
      careInstructions: ["Dry clean only", "Avoid direct sunlight", "Iron on medium heat"],
      origin: "Kutch, Gujarat"
    },
    isNew: false,
    inStock: true,
    stockQuantity: 12,
    tags: ["traditional", "bandhani", "handcrafted", "gujarati", "festival"]
  },
  {
    id: 10,
    name: "Deep Purple Velvet Royal",
    price: 18999,
    originalPrice: 22999,
    fabric: "Velvet",
    color: "Deep Purple",
    category: "velvet",
    subcategory: "royal",
    rating: 4.8,
    reviews: 62,
    images: [
      "/src/assets/Purple_Banarasi_heritage.png",
      "/src/assets/Purple_Banarasi_heritage_1.png",
      "/src/assets/Purple_Banarasi_heritage_2.png",
    ],
    description: "Majestic deep purple velvet saree with gold zardozi work. Perfect for winter weddings and royal occasions.",
    features: [
      "Luxurious velvet fabric",
      "Gold zardozi embroidery",
      "Royal appearance",
      "Winter appropriate",
      "Heavy border work"
    ],
    specifications: {
      fabric: "Premium Velvet",
      weave: "Machine embroidered",
      length: "6.3 meters",
      width: "1.15 meters",
      blousePiece: true,
      careInstructions: ["Dry clean only", "Steam iron carefully", "Store in cool place"],
      origin: "Lucknow, Uttar Pradesh"
    },
    isNew: true,
    inStock: true,
    stockQuantity: 8,
    tags: ["velvet", "royal", "winter", "zardozi", "luxury"]
  },
  {
    id: 11,
    name: "Rose Pink Organza Floral",
    price: 7999,
    originalPrice: 9999,
    fabric: "Organza",
    color: "Rose Pink",
    category: "organza",
    subcategory: "floral",
    rating: 4.5,
    reviews: 95,
    images: [
      "/src/assets/Coral_Pink_Organza_Silk_Embroidered.png",
      "/src/assets/Coral_Pink_Organza_Silk_Embroidered_1.png",
      "/src/assets/Coral_Pink_Organza_Silk_Embroidered_2.png",
    ],
    description: "Delicate rose pink organza saree with beautiful floral embroidery. Light and ethereal for daytime events.",
    features: [
      "Lightweight organza",
      "Floral embroidery",
      "Soft pastel shade",
      "Comfortable drape",
      "Daytime perfect"
    ],
    specifications: {
      fabric: "100% Organza",
      weave: "Machine embroidered",
      length: "6.3 meters",
      width: "1.15 meters",
      blousePiece: true,
      careInstructions: ["Hand wash gently", "Air dry", "Iron on low heat"],
      origin: "Bangalore, Karnataka"
    },
    isNew: false,
    inStock: true,
    stockQuantity: 22,
    tags: ["organza", "floral", "pastel", "daytime", "light"]
  },
  {
    id: 12,
    name: "Black Chanderi Elegance",
    price: 9999,
    originalPrice: 12999,
    fabric: "Chanderi",
    color: "Black",
    category: "chanderi",
    subcategory: "elegant",
    rating: 4.7,
    reviews: 78,
    images: [
      "/src/assets/Royal_Emerald_Slik.png",
      "/src/assets/Royal_Emerald_Slik_2.png",
      "/src/assets/Royal_Emerald_Silk_1.png",
    ],
    description: "Sophisticated black Chanderi saree with silver motifs. Timeless elegance for formal occasions.",
    features: [
      "Authentic Chanderi weave",
      "Silver motif work",
      "Elegant black color",
      "Formal appropriate",
      "Lightweight comfort"
    ],
    specifications: {
      fabric: "Chanderi Cotton Silk",
      weave: "Handloom Chanderi",
      length: "6.3 meters",
      width: "1.15 meters",
      blousePiece: true,
      careInstructions: ["Gentle wash", "Dry in shade", "Medium heat iron"],
      origin: "Chanderi, Madhya Pradesh"
    },
    isNew: false,
    inStock: true,
    stockQuantity: 15,
    tags: ["chanderi", "formal", "elegant", "silver-work", "traditional"]
  },
  {
    id: 13,
    name: "Turquoise Blue Art Silk",
    price: 5999,
    originalPrice: 7999,
    fabric: "Art Silk",
    color: "Turquoise Blue",
    category: "art-silk",
    subcategory: "contemporary",
    rating: 4.4,
    reviews: 103,
    images: [
      "/src/assets/Royal_Emerald_Silk_1.png",
      "/src/assets/Royal_Emerald_Slik.png",
      "/src/assets/Royal_Emerald_Slik_2.png",
    ],
    description: "Vibrant turquoise blue art silk saree with contemporary print design. Modern style with traditional appeal.",
    features: [
      "High-quality art silk",
      "Contemporary prints",
      "Vibrant turquoise",
      "Modern styling",
      "Affordable luxury"
    ],
    specifications: {
      fabric: "Art Silk",
      weave: "Power loom",
      length: "6.3 meters",
      width: "1.15 meters",
      blousePiece: true,
      careInstructions: ["Machine wash cold", "Gentle cycle", "Iron medium heat"],
      origin: "Varanasi, Uttar Pradesh"
    },
    isNew: false,
    inStock: true,
    stockQuantity: 28,
    tags: ["art-silk", "contemporary", "vibrant", "affordable", "modern"]
  },
  {
    id: 14,
    name: "Cream Tussar Silk Handwoven",
    price: 11999,
    originalPrice: 14999,
    fabric: "Tussar Silk",
    color: "Cream",
    category: "silk",
    subcategory: "handwoven",
    rating: 4.6,
    reviews: 71,
    images: [
      "/src/assets/Golden_Kanjivaram_Classic.png",
      "/src/assets/Coral_Pink_Organza_Silk_Embroidered.png",
      "/src/assets/Purple_Banarasi_heritage.png",
    ],
    description: "Natural cream Tussar silk saree with handwoven texture. Eco-friendly and naturally elegant.",
    features: [
      "Pure Tussar silk",
      "Handwoven texture",
      "Natural cream color",
      "Eco-friendly fabric",
      "Unique texture"
    ],
    specifications: {
      fabric: "100% Tussar Silk",
      weave: "Handloom",
      length: "6.3 meters",
      width: "1.15 meters",
      blousePiece: true,
      careInstructions: ["Dry clean preferred", "Handle gently", "Store carefully"],
      origin: "Bhagalpur, Bihar"
    },
    isNew: true,
    inStock: true,
    stockQuantity: 9,
    tags: ["tussar", "handwoven", "eco-friendly", "natural", "textured"]
  },
  {
    id: 15,
    name: "Wine Red Banarasi Brocade",
    price: 16999,
    originalPrice: 19999,
    fabric: "Banarasi Silk",
    color: "Wine Red",
    category: "banarasi",
    subcategory: "brocade",
    rating: 4.9,
    reviews: 56,
    images: [
      "/src/assets/Purple_Banarasi_heritage.png",
      "/src/assets/Purple_Banarasi_heritage_1.png",
      "/src/assets/Golden_Kanjivaram_Classic.png",
    ],
    description: "Rich wine red Banarasi silk saree with intricate brocade work. A masterpiece of traditional Indian weaving.",
    features: [
      "Authentic Banarasi silk",
      "Intricate brocade work",
      "Rich wine color",
      "Traditional motifs",
      "Wedding special"
    ],
    specifications: {
      fabric: "Pure Banarasi Silk",
      weave: "Handloom Brocade",
      length: "6.3 meters",
      width: "1.15 meters",
      blousePiece: true,
      careInstructions: ["Dry clean only", "Store with muslin cloth", "Avoid folding"],
      origin: "Varanasi, Uttar Pradesh"
    },
    isNew: true,
    inStock: true,
    stockQuantity: 6,
    tags: ["banarasi", "brocade", "traditional", "wedding", "handloom"]
  },
  {
    id: 16,
    name: "Pastel Green Linen Casual",
    price: 3999,
    originalPrice: 5499,
    fabric: "Linen",
    color: "Pastel Green",
    category: "linen",
    subcategory: "casual",
    rating: 4.3,
    reviews: 124,
    images: [
      "/src/assets/Royal_Emerald_Silk_1.png",
      "/src/assets/Coral_Pink_Organza_Silk_Embroidered.png",
      "/src/assets/Golden_Kanjivaram_Classic_1.png",
    ],
    description: "Fresh pastel green linen saree with minimal border. Perfect for summer days and casual outings.",
    features: [
      "Pure linen fabric",
      "Breathable material",
      "Minimal design",
      "Summer appropriate",
      "Easy care"
    ],
    specifications: {
      fabric: "100% Pure Linen",
      weave: "Plain weave",
      length: "6.3 meters",
      width: "1.15 meters",
      blousePiece: true,
      careInstructions: ["Machine washable", "Line dry", "Iron while damp"],
      origin: "Kerala, India"
    },
    isNew: false,
    inStock: true,
    stockQuantity: 42,
    tags: ["linen", "casual", "summer", "breathable", "minimal", "eco-friendly"]
  }
];

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};

export const getProductsByPriceRange = (min: number, max: number): Product[] => {
  return products.filter(product => product.price >= min && product.price <= max);
};

export const getProductsByColor = (colorId: string): Product[] => {
  return products.filter(product => 
    product.color.toLowerCase().includes(colorId.toLowerCase())
  );
};

export const searchProducts = (query: string): Product[] => {
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.fabric.toLowerCase().includes(searchTerm) ||
    product.color.toLowerCase().includes(searchTerm) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};