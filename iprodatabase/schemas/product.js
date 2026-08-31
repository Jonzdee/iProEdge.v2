import {
  CATEGORY_HIERARCHY,
  MANUFACTURER_BRANDS
} from '../../src/utils/categories'; // ← adjust this relative path to match your repo

// ─── GENERATED OPTION LISTS ─────────────────────────────────────────────────
// These are derived from CATEGORY_HIERARCHY / MANUFACTURER_BRANDS so the
// Studio dropdowns can never drift out of sync with the frontend again.
// Do NOT hand-edit these arrays — edit categoryHierarchy.js instead.

const categoryOptions = CATEGORY_HIERARCHY.map(cat => ({
  title: cat.label,
  value: cat.id
}));

// Flatten + dedupe product types across every group/brand in every category.
// (e.g. avoids listing "CCTV Camera" twice if it ever appears in two groups)
const productTypeOptions = (() => {
  const seen = new Map();
  CATEGORY_HIERARCHY.forEach(cat => {
    cat.brands.forEach(group => {
      group.productTypes.forEach(pt => {
        if (!seen.has(pt.id)) {
          seen.set(pt.id, { title: pt.label, value: pt.id });
        }
      });
    });
  });
  return Array.from(seen.values());
})();

// Manufacturer brand is a flat, category-independent list — see the note in
// categoryHierarchy.js for why this isn't derived from CATEGORY_HIERARCHY's
// nested "brands" (those are nav groupings for Electronics, not manufacturers).
const brandOptions = MANUFACTURER_BRANDS.map(b => ({
  title: b.label,
  value: b.id
}));

export default {
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    {
      name: 'productName',
      type: 'string',
      title: 'Product Name'
    },
    {
      name: 'category',
      type: 'string',
      title: 'Main Category',
      description: 'Matches CATEGORY_HIERARCHY ids in the frontend.',
      options: {
        list: categoryOptions
      }
    },
    {
      name: 'brand',
      type: 'string',
      title: 'Brand',
      description:
        'Manufacturer of the item (e.g. Apple, Dahua, Generic). Independent of category — a camera or an appliance can both be "Generic".',
      options: {
        list: brandOptions
      }
    },
    {
      name: 'productType',
      type: 'string',
      title: 'Product Type',
      description:
        'Specific type of product (e.g. iPhone, CCTV Camera, Hot Plate). Matches product type ids in CATEGORY_HIERARCHY.',
      options: {
        list: productTypeOptions
      }
    },

    { name: 'inStock', type: 'boolean', title: 'In Stock', initialValue: true },
    { name: 'featured', type: 'boolean', title: 'Featured Product', initialValue: false },
    { name: 'sku', type: 'string', title: 'SKU' },
    { name: 'warranty', type: 'string', title: 'Warranty Details' },
    { name: 'oldPrice', type: 'number', title: 'Old Price' },
    { name: 'price', type: 'number', title: 'Price' },
    { name: 'discount', type: 'number', title: 'Discount' },
    { name: 'shortDesc', type: 'string', title: 'Short Description' },
    { name: 'description', type: 'text', title: 'Description' },
    { name: 'image', type: 'image', title: 'Image' },
    { name: 'avgRating', type: 'number', title: 'Average Rating' },
    { name: 'metaTitle', type: 'string', title: 'Meta Title' },
    { name: 'metaDescription', type: 'text', title: 'Meta Description' },
    { name: 'popularity', type: 'number', title: 'Popularity' },
    { name: 'createdAt', type: 'datetime', title: 'Created At' },

    {
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'image' }]
    },
    {
      name: 'relatedProducts',
      title: 'Related Products',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }]
    },
    {
      name: 'reviews',
      type: 'array',
      title: 'Reviews',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'rating', type: 'number', title: 'Rating' },
            { name: 'text', type: 'string', title: 'Text' }
          ]
        }
      ]
    },
    {
      name: 'labels',
      title: 'Product Labels',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Best Sales', value: 'bestSales' },
          { title: 'New Arrivals', value: 'newArrivals' },
          { title: 'Big Discount', value: 'bigDiscount' }
        ],
        layout: 'checkbox'
      }
    }
  ],

  preview: {
    select: {
      title: 'productName',
      brand: 'brand',
      productType: 'productType',
      price: 'price',
      media: 'image'
    },
    prepare({ title, brand, productType, price, media }) {
      return {
        title,
        subtitle: [brand, productType, price != null ? `₦${price.toLocaleString()}` : null]
          .filter(Boolean)
          .join(' · '),
        media
      };
    }
  }
};