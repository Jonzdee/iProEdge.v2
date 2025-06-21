import { useState } from "react";
import { Container } from "react-bootstrap";
import "./product-review.css";

const ProductReviews = ({ selectedProduct }) => {
  const [listSelected, setListSelected] = useState("desc");
  const reviews = selectedProduct?.reviews ?? [];

  return (
    <section className="product-reviews">
      <Container>
        <ul>
          <li
            style={{ color: listSelected === "desc" ? "black" : "#9c9b9b" }}
            onClick={() => setListSelected("desc")}
          >
            Description
          </li>
          <li
            style={{ color: listSelected === "rev" ? "black" : "#9c9b9b" }}
            onClick={() => setListSelected("rev")}
          >
            Reviews ({reviews.length})
          </li>
        </ul>
        {listSelected === "desc" ? (
          <p>{selectedProduct?.description || "No description available."}</p>
        ) : (
          <div className="rates">
            {reviews.length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
              reviews.map((rate, idx) => (
                <div className="rate-comment" key={idx}>
                  <span>{rate.author || "Jhon Doe"}</span>
                  <span>{rate.rating} (rating)</span>
                  <p>{rate.text}</p>
                </div>
              ))
            )}
          </div>
        )}
      </Container>
    </section>
  );
};

export default ProductReviews;