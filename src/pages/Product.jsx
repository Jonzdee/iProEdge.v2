import { Fragment, useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import { Container } from "react-bootstrap";
import ShopList from "../components/ShopList";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProductReviews from "../components/ProductReviews/ProductReviews";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { useSanityProducts } from "../hooks/useSanityProducts";

const Product = () => {
  const { id } = useParams(); // Fetching the route param
  const { products, loading } = useSanityProducts(); // Fetching products from Sanity

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    console.log("Route ID from URL:", id); // Debug: Check the id from the route
    console.log("All products fetched from Sanity:", products.map((prod) => prod.id)); // Debug: Log all fetched products

    // Match the product based on the route `id`
    const prod = products.find((item) => String(item.id) === String(id));
    console.log("Matched Product:", prod); // Debug: Log the matched product

    setSelectedProduct(prod);

    if (prod) {
      // Find related products in the same category
      const related = products.filter(
        (item) =>
          item.category === prod.category && String(item.id) !== String(prod.id)
      );
      console.log("Related Products:", related); // Debug: Log related products
      setRelatedProducts(related);
    }

    // Scroll to the top when the product changes
    window.scrollTo(0, 0);
  }, [products, id]);

  useWindowScrollToTop();

  // Display loading state
  if (loading) return <div>Loading...</div>;

  // Display error state if no product is found
  if (!selectedProduct)
    return <div>Product not found. Please check the URL or try again later.</div>;

  return (
    <Fragment>
      {/* Product Banner */}
      <Banner title={selectedProduct.productName} />
      {/* Product Details */}
      <ProductDetails selectedProduct={selectedProduct} />
      {/* Product Reviews */}
      <ProductReviews selectedProduct={selectedProduct} />
      {/* Related Products Section */}
      <section className="related-products">
        <Container>
          <h3>You might also like</h3>
        </Container>
        <ShopList productItems={relatedProducts} />
      </section>
    </Fragment>
  );
};

export default Product;
