/**
 * Central category system for iProEdge
 *
 * Structure: Category → Brands → Product Types
 * Product types are now { id, label } pairs so we have a stable slug
 * (used for storage/filtering) separate from the display label.
 *
 * This is the single source of truth for:
 * - Main categories (Phones & Tablets, Electronics, etc.)
 * - Brands under each category (iPhone, Samsung, Dahua, Generic, etc.)
 * - Product types under each brand (iPhone, CCTV Camera, Hot Plate, etc.)
 *
 * The Sanity schema's option lists should be GENERATED from this file
 * rather than hand-maintained separately, so the two never drift apart.
 */

// ─── HIERARCHY: Category → Brands → Product Types ──────────────────────────
export const CATEGORY_HIERARCHY = [
  {
    id: 'phones-tablets',
    label: 'Phones & Tablets',
    icon: 'bi-phone',
    description: 'Smartphones & Tablets',
    brands: [
      {
        id: 'apple',
        label: 'Apple',
        icon: 'bi-phone-fill',
        productTypes: [
          { id: 'iphone', label: 'iPhone' },
          { id: 'ipad', label: 'iPad' }
        ]
      },
      {
        id: 'samsung',
        label: 'Samsung',
        icon: 'bi-phone-flip',
        productTypes: [
          { id: 'samsung-galaxy', label: 'Samsung Galaxy' },
          { id: 'samsung-tab', label: 'Samsung Tab' }
        ]
      },
      {
        id: 'infinix',
        label: 'Infinix',
        icon: 'bi-phone',
        productTypes: [{ id: 'infinix-phone', label: 'Infinix Phone' }]
      },
      {
        id: 'tecno',
        label: 'Tecno',
        icon: 'bi-phone',
        productTypes: [{ id: 'tecno-phone', label: 'Tecno Phone' }]
      },
      {
        id: 'itel',
        label: 'Itel',
        icon: 'bi-phone',
        productTypes: [{ id: 'itel-phone', label: 'Itel Phone' }]
      },
      {
        id: 'xiaomi',
        label: 'Xiaomi',
        icon: 'bi-phone',
        productTypes: [
          { id: 'xiaomi-phone', label: 'Xiaomi Phone' },
          { id: 'redmi-phone', label: 'Redmi Phone' }
        ]
      },
      {
        id: 'tablets-generic',
        label: 'Tablets',
        icon: 'bi-tablet',
        productTypes: [{ id: 'android-tablet', label: 'Android Tablet' }]
      }
    ]
  },
  {
    id: 'phone-accessories',
    label: 'Phone Accessories',
    icon: 'bi-bag',
    description: 'Chargers, Cases, Cables & More',
    brands: [
      {
        id: 'accessories',
        label: 'Accessories',
        icon: 'bi-bag',
        productTypes: [
          { id: 'charger', label: 'Charger' },
          { id: 'power-bank', label: 'Power Bank' },
          { id: 'cable', label: 'Phone Cords' },
          { id: 'earbuds', label: 'Earphones' },
          { id: 'phone-case', label: 'Phone Case' },
          { id: 'screen-protector', label: 'Screen Protector' },
          { id: 'bluetooth-speaker', label: 'Bluetooth Speaker' },
          { id: 'microsd-card', label: 'MicroSD Card' }
        ]
      }
    ]
  },
  {
    id: 'smart-watches',
    label: 'Smart Watches',
    icon: 'bi-smartwatch',
    description: 'Smartwatches & Fitness Bands',
    brands: [
      {
        id: 'smart-watches-generic',
        label: 'Smart Watches',
        icon: 'bi-smartwatch',
        productTypes: [
          { id: 'smartwatch', label: 'Smartwatch' },
          { id: 'fitness-band', label: 'Fitness Band' }
        ]
      }
    ]
  },
  {
    id: 'electronics',
    label: 'Electronics',
    icon: 'bi-camera-video',
    description: 'Security & Surveillance, Home & Kitchen Electronics',
    // NOTE: these "brands" are just navigational groupings of product types,
    // not manufacturer filters. A product's actual manufacturer still lives
    // in its own `brand` field (Dahua, Hikvision, Generic, etc.) and is
    // independent of which group its product type sits in below. This keeps
    // camera types from being duplicated per manufacturer.
    brands: [
      {
        id: 'security-surveillance',
        label: 'Security & Surveillance',
        icon: 'bi-camera',
        productTypes: [
          { id: 'cctv-camera', label: 'CCTV Camera' },
          { id: 'ip-camera', label: 'IP Camera' },
          { id: 'ptz-camera', label: 'PTZ Camera' },
          { id: 'dvr', label: 'DVR' },
          { id: 'nvr', label: 'NVR' },
          { id: '4g-solar-camera', label: '4G Solar Camera' },
          { id: 'solar-ptz-camera', label: 'Solar PTZ Camera' },
          { id: 'solar-bullet-camera', label: 'Solar Bullet Camera' }
        ]
      },
      {
        id: 'home-appliances',
        label: 'Home Appliances',
        icon: 'bi-house-gear',
        productTypes: [
          { id: 'hot-plate', label: 'Hot Plate' },
          { id: 'electric-kettle', label: 'Electric Kettle' },
          { id: 'microwave', label: 'Microwave' },
          { id: 'blender', label: 'Blender' },
          { id: 'air-fryer', label: 'Air Fryer' },
          { id: 'rice-cooker', label: 'Rice Cooker' },
          { id: 'electric-iron', label: 'Electric Iron' },
          { id: 'standing-fan', label: 'Standing Fan' },
          { id: 'water-dispenser', label: 'Water Dispenser' },
          { id: 'hair-clipper', label: 'Hair Clipper' },
          { id: 'tv', label: 'TV' },
          { id: 'bulb', label: 'Bulb' }
        ]
      },
      {
        id: 'generic-electronics',
        label: 'Other Electronics',
        icon: 'bi-lightning-charge',
        productTypes: [
          { id: 'extension-box', label: 'Extension Box' },
          { id: 'stabilizer', label: 'Stabilizer / AVR' },
          { id: 'inverter', label: 'Inverter' }
        ]
      }
    ]
  },
  {
    id: 'audio',
    label: 'Audio',
    icon: 'bi-earbuds',
    description: 'Headphones, Soundbars & Audio Equipment',
    brands: [
      {
        id: 'oraimo',
        label: 'Oraimo',
        icon: 'bi-earbuds',
        productTypes: [
          { id: 'headphones', label: 'Headphones' },
          { id: 'earbuds-audio', label: 'Earbuds' }
        ]
      },
      {
        id: 'generic-audio',
        label: 'Generic',
        icon: 'bi-speaker',
        productTypes: [{ id: 'soundbar', label: 'Soundbar' }]
      }
    ]
  },
  {
    id: 'computers',
    label: 'Computers',
    icon: 'bi-laptop',
    description: 'Laptops & Computer Accessories',
    brands: [
      {
        id: 'generic-computers',
        label: 'Generic',
        icon: 'bi-laptop',
        productTypes: [
          { id: 'laptop', label: 'Laptop' },
          { id: 'mouse', label: 'Mouse' },
          { id: 'keyboard', label: 'Keyboard' },
          { id: 'hard-drive', label: 'Hard Drive' }
        ]
      }
    ]
  }
];

// Alias for backward compatibility
export const CATEGORY_STRUCTURE = CATEGORY_HIERARCHY;

// ─── MANUFACTURER BRANDS ────────────────────────────────────────────────────
// This is deliberately SEPARATE from the "brands" arrays inside
// CATEGORY_HIERARCHY above. For Phones & Tablets, those nested "brands" are
// real manufacturers (Apple, Samsung, etc.) and double as manufacturer tags.
// For Electronics, the nested "brands" (Security & Surveillance, Home
// Appliances, Other Electronics) are just navigation groupings of product
// types — NOT manufacturers — so cameras aren't locked to Dahua/Hikvision.
//
// This flat list is the actual manufacturer tag a product can carry,
// independent of which category/group its product type sits in.
export const MANUFACTURER_BRANDS = [
  { id: 'apple', label: 'Apple' },
  { id: 'samsung', label: 'Samsung' },
  { id: 'infinix', label: 'Infinix' },
  { id: 'tecno', label: 'Tecno' },
  { id: 'itel', label: 'Itel' },
  { id: 'xiaomi', label: 'Xiaomi' },
  { id: 'redmi', label: 'Redmi' },
  { id: 'oraimo', label: 'Oraimo' },
  { id: 'shiplus', label: 'Shiplus' },

  { id: 'dahua', label: 'Dahua' },
  { id: 'hikvision', label: 'Hikvision' },
  { id: 'generic', label: 'Generic' }
];

// ─── LOOKUP: Quick access helpers ──────────────────────────────────────────

/**
 * Get category by ID
 */
export const getCategoryById = (categoryId) => {
  return CATEGORY_HIERARCHY.find(cat => cat.id === categoryId) || null;
};

/**
 * Get brand by ID (searches all categories)
 */
export const getBrandById = (brandId) => {
  for (const category of CATEGORY_HIERARCHY) {
    const brand = category.brands.find(b => b.id === brandId);
    if (brand) return brand;
  }
  return null;
};

/**
 * Get all brands in a category
 */
export const getBrandsByCategory = (categoryId) => {
  const category = getCategoryById(categoryId);
  return category ? category.brands : [];
};

/**
 * Get product types for a brand
 * @returns {array} Array of { id, label } objects
 */
export const getProductTypesByBrand = (brandId) => {
  const brand = getBrandById(brandId);
  return brand ? brand.productTypes : [];
};

/**
 * Get category ID for a brand
 */
export const getCategoryByBrand = (brandId) => {
  for (const category of CATEGORY_HIERARCHY) {
    if (category.brands.some(b => b.id === brandId)) {
      return category.id;
    }
  }
  return null;
};

/**
 * Get category label by ID
 */
export const getCategoryLabel = (categoryId) => {
  const category = getCategoryById(categoryId);
  return category ? category.label : categoryId;
};

/**
 * Get brand label by ID
 */
export const getBrandLabel = (brandId) => {
  const brand = getBrandById(brandId);
  return brand ? brand.label : brandId;
};

/**
 * Get product type label by its id (searches all brands/categories)
 * @param {string} productTypeId - e.g., 'cctv-camera'
 * @returns {string} Label or the id as fallback
 */
export const getProductTypeLabel = (productTypeId) => {
  for (const category of CATEGORY_HIERARCHY) {
    for (const brand of category.brands) {
      const pt = brand.productTypes.find(t => t.id === productTypeId);
      if (pt) return pt.label;
    }
  }
  return productTypeId;
};

/**
 * Filter products by category, brand, and/or product type (all ids/slugs)
 */
export const filterProducts = (products, filters = {}) => {
  let result = [...products];

  if (filters.category) {
    result = result.filter(p => p.category === filters.category);
  }

  if (filters.brand) {
    result = result.filter(p => p.brand === filters.brand);
  }

  if (filters.productType) {
    result = result.filter(p => p.productType === filters.productType);
  }

  return result;
};

/**
 * Get product count for a category
 */
export const getProductCountByCategory = (products, categoryId) => {
  return products.filter(p => p.category === categoryId).length;
};

/**
 * Get product count for a brand
 */
export const getProductCountByBrand = (products, brandId) => {
  return products.filter(p => p.brand === brandId).length;
};

/**
 * Get product count for a product type (matches by id/slug)
 */
export const getProductCountByType = (products, productTypeId) => {
  return products.filter(p => p.productType === productTypeId).length;
};

/**
 * Get all unique product types across all brands in a category
 * @returns {array} Array of unique { id, label } objects
 */
export const getProductTypesInCategory = (categoryId) => {
  const category = getCategoryById(categoryId);
  if (!category) return [];

  const seen = new Map();
  category.brands.forEach(brand => {
    brand.productTypes.forEach(type => {
      if (!seen.has(type.id)) seen.set(type.id, type);
    });
  });

  return Array.from(seen.values());
};

/**
 * Search products by keyword (name, brand, category, type)
 * Resolves brand/category/productType ids to their display labels
 * before matching, since stored products use ids/slugs.
 */
export const searchProducts = (products, query) => {
  if (!query || !query.trim()) return products;

  const q = query.toLowerCase();
  return products.filter(p => {
    const productName = p.productName?.toLowerCase() || '';
    const brandLabel = getBrandLabel(p.brand)?.toLowerCase() || '';
    const categoryLabel = getCategoryLabel(p.category)?.toLowerCase() || '';
    const typeLabel = getProductTypeLabel(p.productType)?.toLowerCase() || '';

    return (
      productName.includes(q) ||
      brandLabel.includes(q) ||
      categoryLabel.includes(q) ||
      typeLabel.includes(q)
    );
  });
};

/**
 * Get breadcrumb path for current filter
 */
export const getBreadcrumbPath = (filter) => {
  const breadcrumbs = [];

  if (filter.category) {
    const category = getCategoryById(filter.category);
    breadcrumbs.push({
      label: category?.label || filter.category,
      type: 'category',
      id: filter.category
    });
  }

  if (filter.brand) {
    const brand = getBrandById(filter.brand);
    breadcrumbs.push({
      label: brand?.label || filter.brand,
      type: 'brand',
      id: filter.brand
    });
  }

  if (filter.productType) {
    breadcrumbs.push({
      label: getProductTypeLabel(filter.productType),
      type: 'productType',
      id: filter.productType
    });
  }

  return breadcrumbs;
};

// ─── DEFAULT EXPORT ─────────────────────────────────────────────────────────
export default {
  CATEGORY_HIERARCHY,
  CATEGORY_STRUCTURE,
  getCategoryById,
  getBrandById,
  getBrandsByCategory,
  getProductTypesByBrand,
  getCategoryByBrand,
  getCategoryLabel,
  getBrandLabel,
  getProductTypeLabel,
  filterProducts,
  getProductCountByCategory,
  getProductCountByBrand,
  getProductCountByType,
  getProductTypesInCategory,
  searchProducts,
  getBreadcrumbPath
};