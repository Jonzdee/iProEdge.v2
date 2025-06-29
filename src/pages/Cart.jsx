import { useEffect } from "react";
import { Col, Container, Row, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQty,
  deleteProduct,
} from "../app/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

const Cart = () => {
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // STEP 1: Save cartList to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartList', JSON.stringify(cartList));
  }, [cartList]);

  return (
    <section className="cart-items">
      <Container>
        <Row className="justify-content-center flex-wrap-reverse">
          <Col xs={12} md={4}>
            <div className="cart-total p-4 shadow rounded bg-white">
              <h4>Cart Summary</h4>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span>Total Price:</span>
                <span className="fw-bold">₦{totalPrice}</span>
              </div>
              <hr />
              <div className="checkout-section">
                <p className="mb-2" style={{ fontSize: "0.97rem" }}>
                  <strong>Ready to place your order?</strong>
                  <br />
                  Review your cart and click below to proceed to checkout.
                </p>
                <Button
                  size="lg"
                  className="w-100 custom-dark-blue"
                  disabled={cartList.length === 0}
                  onClick={() =>
                    navigate("/checkout", {
                      state: {
                        cartItems: cartList,         // (Optional) Pass cart in navigation state
                        orderTotal: totalPrice,
                      }
                    })
                  }
                >
                  Proceed to Checkout
                </Button>
              </div>
              <div className="mt-3 text-muted" style={{ fontSize: "0.85rem" }}>
                You can remove items from your cart or update quantities before
                checking out.
              </div>
            </div>
          </Col>
          <Col xs={12} md={8}>
            {cartList.length === 0 ? (
              <Alert variant="info" className="no-items product text-center">
                <h1>No Items in Cart</h1>
                <p>Your cart is empty. Browse products and add to cart!</p>
              </Alert>
            ) : (
              cartList.map((item) => {
                const productQty = item.price * item.qty;
                return (
                  <div className="cart-list mb-4" key={item.id}>
                    <Row>
                      <Col
                        xs={12}
                        sm={4}
                        className="image-holder mb-3 mb-sm-0 d-flex justify-content-center align-items-center"
                      >
                        <img
                          src={item.imgUrl}
                          alt={item.productName}
                          style={{
                            width: "100%",
                            borderRadius: 8,
                            maxWidth: 200,
                            objectFit: "contain",
                            background: "#f9f9f9",
                          }}
                        />
                      </Col>
                      <Col xs={12} sm={8}>
                        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between h-100 gap-2">
                          <div className="cart-details text-center text-sm-start mb-3 mb-sm-0">
                            <h5 style={{ fontSize: "1.1rem" }}>
                              {item.productName}
                            </h5>
                            <h6 style={{ fontSize: ".95rem", color: "#555" }}>
                              ₦{item.price} x {item.qty} ={" "}
                              <span
                                className="fw-bold"
                                style={{ color: "#0f3460" }}
                              >
                                ₦{productQty}
                              </span>
                            </h6>
                          </div>
                          <div className="cartControl d-flex align-items-center gap-2 justify-content-center justify-content-sm-end flex-wrap">
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={() =>
                                dispatch(addToCart({ product: item, num: 1 }))
                              }
                              title="Increase quantity"
                              className="d-flex align-items-center justify-content-center"
                              style={{ minWidth: 36, minHeight: 36 }}
                            >
                              <FaPlus />
                            </Button>
                            <span
                              style={{
                                minWidth: 24,
                                display: "inline-block",
                                textAlign: "center",
                              }}
                            >
                              {item.qty}
                            </span>
                            <Button
                              variant="outline-warning"
                              size="sm"
                              onClick={() => dispatch(decreaseQty(item))}
                              title="Decrease quantity"
                              className="d-flex align-items-center justify-content-center"
                              style={{ minWidth: 36, minHeight: 36 }}
                            >
                              <FaMinus />
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="ms-2 d-flex align-items-center justify-content-center"
                              onClick={() => dispatch(deleteProduct(item))}
                              title="Remove from cart"
                              style={{ minWidth: 36, minHeight: 36 }}
                            >
                              <FaTrash />
                            </Button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                );
              })
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Cart;