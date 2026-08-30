/**
 * Central category system for iProEdge
 * 
 * Structure: Category → Brands → Product Types
 * 
 * This is the single source of truth for:
 * - Main categories (Phones & Tablets, Electronics, etc.)
 * - Brands under each category (iPhone, Samsung, Dahua, etc.)
 * - Product types under each brand (iPhone, Samsung, CCTV Camera, etc.)
 */

// ─── HIERARCHY: Category → Brands → Product Types ──────────────────────────
export const CATEGORY_HIERARCHY = [
  {
    id: 'phones-tablets',
    label: 'Phones & Tablets',
    icon: 'bi-phone',
    description: 'Smartphones, Tablets & Accessories',
    brands: [
      {
        id: 'iphone',
        label: 'iPhone',
        icon: 'bi-phone-fill',
        productTypes: ['iPhone']
      },
      {
        id: 'samsung',
        label: 'Samsung',
        icon: 'bi-phone-flip',
        productTypes: ['Samsung']
      },
      {
        id: 'tablets',
        label: 'Tablets',
        icon: 'bi-tablet',
        productTypes: ['iPad', 'Samsung Tab', 'Android Tablet']
      },
      {
        id: 'accessories',
        label: 'Accessories',
        icon: 'bi-bag',
        productTypes: [
          'Charger',
          'Power Bank',
          'Phone Cords',
          'Earphones',
          'Smartwatch',
          'Bluetooth Speaker',
          'MicroSD Card',
          'Hair Clipper'
        ]
      }
    ]
  },
  {
    id: 'electronics',
    label: 'Electronics',
    icon: 'bi-camera-video',
    description: 'CCTV Cameras, Security & Surveillance',
    brands: [
      {
        id: 'dahua',
        label: 'Dahua',
        icon: 'bi-shield-check',
        productTypes: ['CCTV Camera', 'DVR', 'NVR', 'PTZ Camera']
      },
      {
        id: 'hikvision',
        label: 'Hikvision',
        icon: 'bi-camera',
        productTypes: ['CCTV Camera', 'DVR', 'NVR', 'IP Camera']
      },
      {
        id: 'solar',
        label: 'Solar Cameras',
        icon: 'bi-sun',
        productTypes: ['4G Solar Camera', 'Solar PTZ Camera', 'Solar Bullet Camera']
      }
    ]
  }
];

// Alias for backward compatibility
export const CATEGORY_STRUCTURE = CATEGORY_HIERARCHY;

// ─── LOOKUP: Quick access helpers ──────────────────────────────────────────

/**
 * Get category by ID
 * @param {string} categoryId - e.g., 'phones-tablets'
 * @returns {object|null} Category object or null
 */
export const getCategoryById = (categoryId) => {
  return CATEGORY_HIERARCHY.find(cat => cat.id === categoryId) || null;
};

/**
 * Get brand by ID (searches all categories)
 * @param {string} brandId - e.g., 'iphone'
 * @returns {object|null} Brand object or null
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
 * @param {string} categoryId - e.g., 'phones-tablets'
 * @returns {array} Array of brand objects
 */
export const getBrandsByCategory = (categoryId) => {
  const category = getCategoryById(categoryId);
  return category ? category.brands : [];
};

/**
 * Get product types for a brand
 * @param {string} brandId - e.g., 'iphone'
 * @returns {array} Array of product type strings
 */
export const getProductTypesByBrand = (brandId) => {
  const brand = getBrandById(brandId);
  return brand ? brand.productTypes : [];
};

/**
 * Get category ID for a brand
 * @param {string} brandId - e.g., 'iphone'
 * @returns {string|null} Category ID or null
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
 * @param {string} categoryId - e.g., 'phones-tablets'
 * @returns {string} Category label or ID as fallback
 */
export const getCategoryLabel = (categoryId) => {
  const category = getCategoryById(categoryId);
  return category ? category.label : categoryId;
};

/**
 * Get brand label by ID
 * @param {string} brandId - e.g., 'iphone'
 * @returns {string} Brand label or ID as fallback
 */
export const getBrandLabel = (brandId) => {
  const brand = getBrandById(brandId);
  return brand ? brand.label : brandId;
};

/**
 * Filter products by category, brand, and/or product type
 * @param {array} products - Array of product objects
 * @param {object} filters - { category, brand, productType }
 * @returns {array} Filtered products
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
 * @param {array} products - Array of product objects
 * @param {string} categoryId - e.g., 'phones-tablets'
 * @returns {number} Count of products
 */
export const getProductCountByCategory = (products, categoryId) => {
  return products.filter(p => p.category === categoryId).length;
};

/**
 * Get product count for a brand
 * @param {array} products - Array of product objects
 * @param {string} brandId - e.g., 'iphone'
 * @returns {number} Count of products
 */
export const getProductCountByBrand = (products, brandId) => {
  return products.filter(p => p.brand === brandId).length;
};

/**
 * Get product count for a product type
 * @param {array} products - Array of product objects
 * @param {string} productType - e.g., 'iPhone'
 * @returns {number} Count of products
 */
export const getProductCountByType = (products, productType) => {
  return products.filter(p => p.productType === productType).length;
};

/**
 * Get all unique product types across all brands in a category
 * @param {string} categoryId - e.g., 'phones-tablets'
 * @returns {array} Array of unique product types
 */
export const getProductTypesInCategory = (categoryId) => {
  const category = getCategoryById(categoryId);
  if (!category) return [];

  const types = new Set();
  category.brands.forEach(brand => {
    brand.productTypes.forEach(type => types.add(type));
  });

  return Array.from(types);
};

/**
 * Search products by keyword (name, brand, category, type)
 * @param {array} products - Array of product objects
 * @param {string} query - Search query
 * @returns {array} Matching products
 */
export const searchProducts = (products, query) => {
  if (!query || !query.trim()) return products;

  const q = query.toLowerCase();
  return products.filter(p =>
    (p.productName && p.productName.toLowerCase().includes(q)) ||
    (p.brand && p.brand.toLowerCase().includes(q)) ||
    (p.productType && p.productType.toLowerCase().includes(q)) ||
    (p.category && p.category.toLowerCase().includes(q))
  );
};

/**
 * Get breadcrumb path for current filter
 * @param {object} filter - { category, brand, productType }
 * @returns {array} Array of breadcrumb objects
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
      label: filter.productType,
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
  filterProducts,
  getProductCountByCategory,
  getProductCountByBrand,
  getProductCountByType,
  getProductTypesInCategory,
  searchProducts,
  getBreadcrumbPath
};
