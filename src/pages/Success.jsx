import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, Button, Modal, Form, Alert } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaPhoneAlt, FaCreditCard, FaMoneyBillWave } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { v4 as uuidv4 } from "uuid";

export default function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Prefer cart/order info from route state, fallback to localStorage ("cartList" key for consistency)
  const [cartItems] = useState(
    location.state?.cartItems ||
      JSON.parse(localStorage.getItem("cartList")) ||
      []
  );
  const [orderTotal] = useState(
    location.state?.orderTotal ||
      cartItems.reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0) ||
      "₦12,500"
  );
  const [paymentMethod] = useState(
    location.state?.paymentMethod || "cod"
  );
  const customer = {
    name: user?.displayName || "Johnson Olayemi",
    phone: "08063856166",
    palmpay: "08063856166 ogunyankin johnson olayemi",
  };

  // For payment modals
  const [showPaystack, setShowPaystack] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [cardSuccess, setCardSuccess] = useState(false);

  // Order submission states
  const [orderId, setOrderId] = useState(null);
  const [orderError, setOrderError] = useState("");
  const [orderLoading, setOrderLoading] = useState(false);

  // Prevent duplicate order submission
  const hasPostedOrder = useRef(false);

  // Redirect if cart is empty
  useEffect(() => {
    if (!cartItems.length) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  // Send order to backend (prevents double POST)
  useEffect(() => {
    // Debug log
    console.log("user:", user, "cartItems:", cartItems, "orderId:", orderId, "orderLoading:", orderLoading);

    if (!user || !cartItems.length || orderId || orderLoading || hasPostedOrder.current) return;

    hasPostedOrder.current = true; // Prevent double submit

    const submitOrder = async () => {
      setOrderLoading(true);
      setOrderError("");
      try {
        if (!user.getIdToken) {
          setOrderError("User not authenticated.");
          setOrderLoading(false);
          return;
        }
        const token = await user.getIdToken();
        console.log("Firebase token:", token); // Debugging

        const orderData = {
          userId: user.uid,
          userName: user.displayName || user.email,
          userEmail: user.email,
          orderTotal,
          paymentMethod,
          cartItems,  // Use 'items' for backend consistency
          status: "success",
          clientOrderId: uuidv4(), 
        };
        console.log("Order data to be sent:", orderData); // Debugging

        const res = await fetch("https://iproedgeback.onrender.com/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        });

        // Debug response
        const data = await res.json();
        console.log("Order response:", data);

        setOrderLoading(false);
        if (data.success) {
          setOrderId(data.orderId);
          // Clear cart after successful order
          localStorage.removeItem("cartList");
        } else {
          setOrderError(data.error || "Order failed");
        }
      } catch (err) {
        setOrderLoading(false);
        setOrderError(err.message || "Network error");
        console.error("Order submission error:", err);
      }
    };

    submitOrder();
    // eslint-disable-next-line
  }, [user, cartItems, orderTotal, paymentMethod, orderId, orderLoading]);

  useEffect(() => {
    if (paymentMethod === "paystack") setShowPaystack(true);
    if (paymentMethod === "debitcard") setShowCard(true);
  }, [paymentMethod]);

  // Simulate Paystack payment (replace with real integration)
  const handlePaystackPay = () => {
    setShowPaystack(false);
    setTimeout(() => {
      alert("Payment Successful!");
    }, 700);
  };

  // Simulate Card payment
  const handleCardPay = (e) => {
    e.preventDefault();
    setCardSuccess(true);
    setTimeout(() => {
      setShowCard(false);
    }, 1200);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f6f9fc", paddingTop: 40, paddingBottom: 40 }}>
      {/* Payment Modals */}
      <Modal show={showPaystack} onHide={() => setShowPaystack(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Pay with Paystack</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-3">
            <FaCheckCircle color="#06a" size={48} className="mb-2" />
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 10 }}>Almost done!</div>
            <div>Click the button below to pay <b>{orderTotal}</b> with Paystack.</div>
          </div>
          <Button style={{ background: "#06a", border: 0 }} className="w-100" onClick={handlePaystackPay}>
            Pay Now
          </Button>
        </Modal.Body>
      </Modal>
      <Modal show={showCard} onHide={() => setShowCard(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Pay with Debit Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!cardSuccess ? (
            <Form onSubmit={handleCardPay}>
              <Form.Group className="mb-2">
                <Form.Label>Card Number</Form.Label>
                <Form.Control required maxLength={19} placeholder="1234 5678 9012 3456" />
              </Form.Group>
              <Row>
                <Col xs={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>Expiry</Form.Label>
                    <Form.Control required maxLength={5} placeholder="MM/YY" />
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>CVV</Form.Label>
                    <Form.Control required maxLength={4} placeholder="123" />
                  </Form.Group>
                </Col>
              </Row>
              <Button className="w-100 mt-2" style={{ background: "#06a", border: 0 }} type="submit">
                Pay {orderTotal}
              </Button>
            </Form>
          ) : (
            <div className="text-center py-5">
              <FaCheckCircle color="green" size={48} className="mb-2" />
              <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 10 }}>Payment Successful!</div>
              <div>Thank you for your order.</div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="shadow-sm" style={{ borderRadius: 16 }}>
              <Card.Body className="text-center" style={{ padding: "2.5rem 1.5rem" }}>
                <FaCheckCircle color="green" size={44} className="mb-3" />
                <h3 style={{ fontWeight: 700, marginBottom: 12, color: "#1a1a1a" }}>
                  {paymentMethod === "cod" ? "Order Placed!" : paymentMethod === "palmpay" ? "Complete Your Palmpay Payment" : "Order Placed!"}
                </h3>
                <div className="mb-3" style={{ fontSize: "1.15rem", color: "#222" }}>
                  Thank you for shopping with us, {customer.name.split(" ")[0]}!
                </div>
                <div className="mb-4" style={{ color: "#444" }}>
                  Your order total: <b style={{ color: "#06a" }}>{orderTotal}</b>
                </div>

                {orderLoading && <Alert variant="info">Placing your order...</Alert>}
                {orderError && <Alert variant="danger">{orderError}</Alert>}
                {orderId && (
                  <Alert variant="success">
                    Order ID: <b>{orderId}</b><br />
                    A confirmation email has been sent to you!
                  </Alert>
                )}

                {/* Payment instructions */}
                {paymentMethod === "cod" && (
                  <div>
                    <FaMoneyBillWave size={28} color="#ffbb00" className="mb-3" />
                    <div className="mb-2" style={{ fontSize: "1.05rem" }}>
                      Pay on delivery. Our agent will contact you soon.
                    </div>
                    <Alert variant="info" className="mb-2">
                      <FaPhoneAlt /> <b>{customer.phone}</b>
                      <br />
                      <span style={{ fontSize: 15 }}>Call this number to track your package.</span>
                    </Alert>
                    <div className="text-muted" style={{ fontSize: "0.95rem" }}>
                      Please keep your phone available for delivery updates.
                    </div>
                  </div>
                )}

                {paymentMethod === "palmpay" && (
                  <div>
                    <div className="mb-2">
                      <img src="https://techlifewithugo.com.ng/wp-content/uploads/2024/05/PalmPay-logo-1.jpg.jpeg" width={38} alt="Palmpay" />
                    </div>
                    <div className="mb-2" style={{ fontSize: "1.08rem" }}>
                      Please transfer <b>{orderTotal}</b> to:
                    </div>
                    <Alert variant="success" className="mb-2" style={{ fontSize: "1.05rem" }}>
                      <b>{customer.palmpay}</b>
                    </Alert>
                    <div style={{ fontSize: "0.98rem", marginBottom: 8 }}>
                      After payment, call <b>{customer.phone}</b> to confirm and track your order.
                    </div>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => window.open(`tel:${customer.phone}`)}
                    >
                      <FaPhoneAlt /> Call Now
                    </Button>
                  </div>
                )}

                {paymentMethod === "paystack" && (
                  <div>
                    <img src="https://seeklogo.com/images/P/paystack-logo-F1577E4C8B-seeklogo.com.png" width={44} alt="Paystack" className="mb-2" />
                    <div style={{ fontSize: "1.08rem" }}>
                      Paystack payment in progress. <br />
                      If the payment popup is closed,{" "}
                      <Button
                        variant="link"
                        style={{ padding: 0, fontSize: "1rem" }}
                        onClick={() => setShowPaystack(true)}
                      >
                        click here to pay again.
                      </Button>
                    </div>
                  </div>
                )}

                {paymentMethod === "debitcard" && (
                  <div>
                    <FaCreditCard size={30} color="#06a" className="mb-2" />
                    <div style={{ fontSize: "1.08rem" }}>
                      Debit card payment. <br />
                      {cardSuccess ? (
                        <span style={{ color: "green" }}>Payment Successful!</span>
                      ) : (
                        <span>
                          If you did not complete card payment,{" "}
                          <Button
                            variant="link"
                            style={{ padding: 0, fontSize: "1rem" }}
                            onClick={() => setShowCard(true)}
                          >
                            click here to pay.
                          </Button>
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <Button
                  className="mt-4"
                  style={{
                    background: "#ffbb00",
                    border: 0,
                    color: "#1a1a1a",
                    fontWeight: 600,
                    width: "100%",
                    fontSize: "1.07rem",
                  }}
                  onClick={() => navigate("/shop")}
                >
                  Continue Shopping
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}