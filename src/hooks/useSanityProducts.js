import { useEffect, useState } from 'react'
import { client, urlFor } from '../utils/sanity'

export function useSanityProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client
      .fetch(`*[_type == "product"]{
        _id,
        productName,
        category,
        price,
        oldPrice,
        discount,
        shortDesc,
        description,
        image,
        gallery,
        inStock,
        sku,  
        warranty,   
        labels,   
        reviews,
        avgRating
      }`)
      .then((data) => {
        console.log('Raw Sanity data:', data);
        const formattedData = data.map((prod) => ({
          ...prod,
          id: prod._id,
          imgUrl: prod.image ? urlFor(prod.image).url() : "",
          gallery: Array.isArray(prod.gallery)
            ? prod.gallery.map((img) =>
                img?.asset ? urlFor(img.asset).url() : urlFor(img).url()
              )
            : [],
        }));
        setProducts(formattedData);
        console.log('Formatted products:', formattedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Sanity fetch error:', err);
        setLoading(false);
      });
  }, []);

  return { products, loading }
}