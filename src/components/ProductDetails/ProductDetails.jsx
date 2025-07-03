import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../app/features/cart/cartSlice";
import { urlFor } from "../../utils/sanity";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./product-details.css";

const ProductDetails = ({ selectedProduct }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  // Defensive: handle boolean, string, number
  const inStock =
    selectedProduct?.inStock === true ||
    selectedProduct?.inStock === "true" ||
    selectedProduct?.inStock === 1 ||
    selectedProduct?.inStock === "1";

  const handleQuantityChange = (e) => {
    setQuantity(Math.max(Number(e.target.value), 1));
  };

  const handleAdd = () => {
    dispatch(addToCart({ product: selectedProduct, num: quantity }));
    toast.success("Product has been added to cart!");
  };

  // Gallery images: prefer gallery, fallback to image
  const galleryImages = Array.isArray(selectedProduct?.gallery) && selectedProduct.gallery.length
    ? selectedProduct.gallery.map(img =>
        img?.asset ? urlFor(img.asset) : urlFor(img)
      )
    : selectedProduct?.image
      ? [urlFor(selectedProduct.image.asset ? selectedProduct.image.asset : selectedProduct.image)]
      : [];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <section className="product-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            {/* Gallery Slider */}
            {galleryImages.length > 0 && (
              <Slider {...sliderSettings}>
                {galleryImages.map((imgUrl, idx) => (
                  <div key={idx}>
                    <img
                      src={imgUrl}
                      alt={`Product image ₦{idx + 1}`}
                      style={{
                        width: "100%",
                        height: 300,
                        objectFit: "contain",
                        borderRadius: 8,
                        background: "#fafafa"
                      }}
                    />
                  </div>
                ))}
              </Slider>
            )}
          </Col>
          <Col md={6}>
            <h2>{selectedProduct?.productName}</h2>
            <div className="info mb-2">
              <div>SKU: {selectedProduct?.sku}</div>
              <div>Category: {selectedProduct?.category}</div>
              <div>
                In Stock:{" "}
                <span className={inStock ? "text-success" : "text-danger"}>
                  {inStock ? "Yes" : "No"}
                </span>
              </div>
              {selectedProduct?.featured && (
                <div className="featured">🔥 Featured Product</div>
              )}
            </div>
            <div className="pricing info mb-2">
              <span className="price">
                ₦{selectedProduct?.price?.toFixed(2)}
              </span>
              {selectedProduct?.oldPrice && (
                <span className="old-price ms-2 text-muted">
                  <del>₦{selectedProduct.oldPrice?.toFixed(2)}</del>
                </span>
              )}
              {selectedProduct?.discount && (
                <span className="discount ms-2 text-success">
                  -{selectedProduct.discount}%
                </span>
              )}
            </div>
            {selectedProduct?.shortDesc && (
              <p className="short-desc">{selectedProduct.shortDesc}</p>
            )}
            
            {selectedProduct?.warranty && (
              <div className="warranty">
                <h6>Warranty</h6>
                <p>{selectedProduct.warranty}</p>
              </div>
            )}
            <div className="d-flex align-items-center my-3">
              <input
                className="qty-input me-3"
                type="number"
                min={1}
                value={quantity}
                onChange={handleQuantityChange}
                disabled={!inStock}
              />
              <button
                aria-label="Add"
                type="submit"
                className="add"
                onClick={handleAdd}
                disabled={!inStock}
              >
                Add To Cart
              </button>
            </div>
            {!inStock && (
              <div className="text-danger mb-3">
                Sorry, this product is currently out of stock.
              </div>
            )}
            {selectedProduct?.reviews?.length > 0 && (
              <div className="reviews mt-4">
                <h5>Reviews</h5>
                {selectedProduct.reviews.map((review, idx) => (
                  <div key={idx} className="review mb-2">
                    <span className="me-2">⭐ {review.rating}</span>
                    <span>{review.text}</span>
                  </div>
                ))}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductDetails;