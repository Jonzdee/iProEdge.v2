import { useEffect, useState } from "react";
import { client } from "../../src/utils/sanity";

export const useSanityProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "product"]{
      _id,
      productName,
      category,
      brand,
      productType,
      price,
      oldPrice,
      discount,
      shortDesc,
      description,
      inStock,
      featured,
      sku,
      warranty,
      avgRating,
      popularity,
      createdAt,
      labels,
      "imageUrl": image.asset->url
    }`;

    client
      .fetch(query)
      .then((data) => {
        console.log("========== SANITY DATA DEBUG ==========");
        console.log("✅ Total products:", data.length);

        // Show unique brand values
        const brands = [...new Set(data.map(p => p.brand).filter(Boolean))];
        console.log("📌 UNIQUE BRAND VALUES:", brands);

        // Show unique category values
        const categories = [...new Set(data.map(p => p.category).filter(Boolean))];
        console.log("📌 UNIQUE CATEGORY VALUES:", categories);

        // Show unique productType values
        const types = [...new Set(data.map(p => p.productType).filter(Boolean))];
        console.log("📌 UNIQUE PRODUCT TYPES:", types);

        // Show first 10 products detailed
        console.log("📋 FIRST 10 PRODUCTS:");
        data.slice(0, 10).forEach((p, i) => {
          console.log(
            `  ${i + 1}. "${p.productName}" | brand: "${p.brand}" | category: "${p.category}" | type: "${p.productType}"`
          );
        });

        console.log("======================================");

        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Sanity fetch error:", err);
        setLoading(false);
      });
  }, []);

  return { products, loading };
};