import { Col } from "react-bootstrap";
import "./product-card.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";

// Map backend values to user-friendly text
const labelMap = {
  bestSales: "Best Sales",
  newArrivals: "New Arrivals",
  bigDiscount: "Big Discount",
};

const ProductCard = ({ title, productItem }) => {
  const dispatch = useDispatch();
  const router = useNavigate();

  const handleClick = () => {
    // Use Sanity id for navigation
    router(`/shop/${productItem.id}`);
  };

  const handleAdd = () => {
    dispatch(addToCart({ product: productItem, num: 1 }));
    toast.success("Product has been added to cart!");
  };

  return (
    <Col md={3} sm={5} xs={10} className="product mtop">
      {/* Product labels */}
      {Array.isArray(productItem.labels) && productItem.labels.length > 0 && (
        <div className="product-labels">
          {productItem.labels.map(label => (
            <span key={label} className={`label label-${label}`}>
              {labelMap[label] || label}
            </span>
          ))}
        </div>
      )}

      {title === "Big Discount" && (
        <span className="discount">{productItem.discount}% Off</span>
      )}
      <img
        loading="lazy"
        onClick={handleClick}
        src={productItem.imgUrl}
        alt={productItem.productName}
      />
      <div className="product-like">
        <ion-icon name="heart-outline"></ion-icon>
      </div>
      <div className="product-details">
        <h3 onClick={handleClick}>{productItem.productName}</h3>
        <div className="rate">
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
        </div>
        <div className="price">
          <h4>₦{productItem.price}</h4>
          <button
            aria-label="Add"
            type="submit"
            className="add"
            onClick={handleAdd}
          >
            <ion-icon name="add"></ion-icon>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;