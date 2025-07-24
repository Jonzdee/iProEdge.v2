import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaPhoneAlt,
  FaCreditCard,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

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
      cartItems.reduce((sum, item) => sum + item.price * (item.qty || 1), 0) ||
      "₦12,500"
  );
  const [paymentMethod] = useState(location.state?.paymentMethod || "cod");
  const customer = {
    name: user?.displayName || "Johnson Olayemi",
    phone: "08063856166",
    palmpay: "8063856166 ogunyankin johnson olayemi",
  };

  // For payment modals
  const [showPaystack, setShowPaystack] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [cardSuccess, setCardSuccess] = useState(false);

  // Order submission states
  const [orderId] = useState(location.state?.orderId || null);

  const [orderError, setOrderError] = useState("");
  const [orderLoading, setOrderLoading] = useState(false);

  // Automated payment status
  const [palmpayWaiting, setPalmpayWaiting] = useState(false);
  const [palmpayPaid, setPalmpayPaid] = useState(false);

  // Redirect if cart is empty
  useEffect(() => {
    if (!cartItems.length) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

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
    <div
      style={{
        minHeight: "100vh",
        background: "#f6f9fc",
        paddingTop: 40,
        paddingBottom: 40,
      }}
    >
    

      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="shadow-sm" style={{ borderRadius: 16 }}>
              <Card.Body
                className="text-center"
                style={{ padding: "2.5rem 1.5rem" }}
              >
                <FaCheckCircle color="green" size={44} className="mb-3" />
                <h3
                  style={{
                    fontWeight: 700,
                    marginBottom: 12,
                    color: "#1a1a1a",
                  }}
                >
                  {paymentMethod === "cod"
                    ? "Order Placed!"
                    : paymentMethod === "palmpay"
                    ? palmpayPaid
                      ? "Payment Received!"
                      : "Complete Your Palmpay Payment"
                    : "Order Placed!"}
                </h3>
                <div
                  className="mb-3"
                  style={{ fontSize: "1.15rem", color: "#222" }}
                >
                  Thank you for shopping with us, {customer.name.split(" ")[0]}!
                </div>
                <div className="mb-4" style={{ color: "#444" }}>
                  Your order total:{" "}
                  <b style={{ color: "#06a" }}>{orderTotal}</b>
                </div>

                {orderLoading && (
                  <Alert variant="info">Placing your order...</Alert>
                )}
                {orderError && <Alert variant="danger">{orderError}</Alert>}
                {orderId && (
                  <Alert variant="success">
                    Order ID: <b>{orderId}</b>
                    <br />A confirmation email has been sent to you!
                  </Alert>
                )}

                {/* Payment instructions */}
                {paymentMethod === "cod" && (
                  <div>
                    <FaMoneyBillWave
                      size={28}
                      color="#ffbb00"
                      className="mb-3"
                    />
                    <div className="mb-2" style={{ fontSize: "1.05rem" }}>
                      Pay on delivery. Our agent will contact you soon.
                    </div>
                    <Alert variant="info" className="mb-2">
                      <FaPhoneAlt /> <b>{customer.phone}</b>
                      <br />
                      <span style={{ fontSize: 15 }}>
                        Call this number to track your package.
                      </span>
                    </Alert>
                    <div className="text-muted" style={{ fontSize: "0.95rem" }}>
                      Please keep your phone available for delivery updates.
                    </div>
                  </div>
                )}

                

               {paymentMethod === "paystack" && (
  <div className="text-center">
    <img
      src="https://images.seeklogo.com/logo-png/40/1/paystack-logo-png_seeklogo-409509.png"
      width={44}
      alt="Paystack"
      className="mb-2"
    />
    <div
      style={{
        fontSize: "1.08rem",
        marginTop: 8,
        color: "green",
        fontWeight: 600,
      }}
    >
      ✅ Payment confirmed successfully via Paystack!<br />
      Your order ID is <b>{orderId}</b>.
    </div>
    <div
      style={{
        fontSize: "0.95rem",
        color: "#333",
        marginTop: "10px",
        lineHeight: 1.5,
      }}
    >
      📌 <b>Next Step:</b> You can track your order status anytime in your{" "}
      <Button
        variant="link"
        style={{
          padding: 0,
          fontSize: "0.95rem",
          fontWeight: 600,
          color: "#06a",
        }}
        onClick={() => navigate("/dashboard")}
      >
        Dashboard
      </Button>.
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
