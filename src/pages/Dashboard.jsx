import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  ListGroup,
  Alert,
  Button,
  Modal,
} from "react-bootstrap";
import {
  FaCheckCircle,
  FaMoneyBillWave,
  FaCreditCard,
  FaRegClock,
  FaTruck,
  FaHome,
  FaFilePdf,
  FaTimesCircle,
  FaUndo,
  FaHeadset,
} from "react-icons/fa";
import jsPDF from "jspdf";

const TIMELINE_STATUSES = [
  { key: "processing", label: "Processing", icon: <FaRegClock color="#888" /> },
  { key: "shipped", label: "Shipped", icon: <FaTruck color="#007bff" /> },
  { key: "outForDelivery", label: "Out for Delivery", icon: <FaHome color="#ffc107" /> },
  { key: "delivered", label: "Delivered", icon: <FaCheckCircle color="green" /> },
];

const EXTRA_STATUSES = [
  {
    key: "cancelRequested",
    label: "Cancel Requested",
    icon: <FaTimesCircle color="red" />,
    badgeBg: "danger",
  },
  {
    key: "returnRequested",
    label: "Return Requested",
    icon: <FaUndo color="#ff9800" />,
    badgeBg: "warning",
  },
];

function getTimelineStatusIndex(status) {
  const keys = TIMELINE_STATUSES.map((s) => s.key);
  if (keys.includes(status)) return keys.indexOf(status);
  return keys.length - 1;
}

function getExtraStatus(status) {
  return EXTRA_STATUSES.find((s) => s.key === status);
}

const Dashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ show: false, type: "", orderId: null });
  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState({
    show: false,
    variant: "",
    message: "",
  });

  // Fetch orders from backend API with authentication
  const fetchOrders = () => {
    if (!user) return;
    setLoading(true);
    user.getIdToken().then((token) => {
      fetch(
        `http://localhost:3001/orders?userEmail=${encodeURIComponent(
          user.email
        )}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setOrders(data.success ? data.orders : []);
          setLoading(false);
          if (!data.success) {
            setFeedback({
              show: true,
              variant: "danger",
              message: data.error || "Failed to load orders.",
            });
          }
        })
        .catch((error) => {
          setFeedback({
            show: true,
            variant: "danger",
            message: "Failed to load orders: " + error.message,
          });
          setLoading(false);
        });
    });
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const handleAction = async (orderId, type) => {
    setActionLoading(true);
    setFeedback({ show: false, variant: "", message: "" });
    if (!orderId) {
      setModal({ show: false, type: "", orderId: null });
      setActionLoading(false);
      alert("No orderId provided!");
      return;
    }
    let statusUpdate = {};
    if (type === "cancel") statusUpdate = { status: "cancelRequested" };
    if (type === "return") statusUpdate = { status: "returnRequested" };
    try {
      const token = await user.getIdToken();
      const res = await fetch(`http://localhost:3001/order/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(statusUpdate),
      });
      const data = await res.json();
      if (data.success) {
        setFeedback({
          show: true,
          variant: "success",
          message:
            type === "cancel"
              ? "Cancel request submitted successfully."
              : "Return request submitted successfully.",
        });
        fetchOrders();
      } else {
        setFeedback({
          show: true,
          variant: "danger",
          message: data.error || "Error updating order.",
        });
      }
    } catch (err) {
      setFeedback({
        show: true,
        variant: "danger",
        message: "Error updating order: " + err.message,
      });
    }
    setModal({ show: false, type: "", orderId: null });
    setActionLoading(false);
  };

  const handleDownloadInvoice = (order) => {
    const docPdf = new jsPDF();
    docPdf.setFontSize(18);
    docPdf.text("Order Invoice", 14, 18);
    docPdf.setFontSize(12);
    docPdf.text(`Order ID: ${order.id}`, 14, 28);
    docPdf.text(`Customer: ${user.displayName || user.email}`, 14, 36);
    docPdf.text(`Order Total: ${order.orderTotal}`, 14, 44);
    docPdf.text(`Payment Method: ${order.paymentMethod}`, 14, 52);
    docPdf.text(`Status: ${order.status}`, 14, 60);
    docPdf.text(
      `Order Date: ${
        order.timestamp
          ? new Date(
              typeof order.timestamp === "object" && order.timestamp.seconds
                ? order.timestamp.seconds * 1000
                : order.timestamp
            ).toLocaleString()
          : ""
      }`,
      14,
      68
    );
    docPdf.text("Items:", 14, 76);
    let y = 84;
    if (order.items && order.items.length > 0) {
      order.items.forEach((item, idx) => {
        docPdf.text(
          `${idx + 1}. ${item.name || "Item"}  Qty: ${item.qty || 1}  Price: ${item.price || ""}`,
          16,
          y
        );
        y += 8;
      });
    }
    docPdf.save(`invoice-${order.id}.pdf`);
  };

  if (!user)
    return (
      <Container className="py-5">
        <Alert variant="warning" className="text-center">
          Please log in to see your dashboard.
        </Alert>
      </Container>
    );

  if (loading) return <Loader text="Loading your orders..." />;

  return (
    <Container className="py-5">
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={10} lg={8}>
          <h2 className="mb-2" style={{ fontWeight: 700 }}>
            {user.displayName
              ? `Hi, ${user.displayName.split(" ")[0]}!`
              : "Your Dashboard"}
          </h2>
          <div className="mb-3" style={{ color: "#888" }}>
            Here are your recent orders:
          </div>
          {feedback.show && (
            <Alert
              variant={feedback.variant}
              onClose={() => setFeedback({ show: false })}
              dismissible
            >
              {feedback.message}
            </Alert>
          )}
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          {orders.length === 0 ? (
            <Alert variant="info" className="text-center">
              No orders found.
            </Alert>
          ) : (
            <ListGroup>
              {orders.map((order) => {
                const timelineIdx = getTimelineStatusIndex(order.status);
                const extraStatus = getExtraStatus(order.status);
                const allowCancel = order.status === "processing";
                const allowReturn = order.status === "delivered";

                // Placed date fix for Firestore and string timestamps
                let placedDate = "";
                if (order.timestamp) {
                  const d =
                    typeof order.timestamp === "object" &&
                    order.timestamp.seconds
                      ? new Date(order.timestamp.seconds * 1000)
                      : new Date(order.timestamp);
                  placedDate = isNaN(d.getTime()) ? "" : d.toLocaleString();
                }

                return (
                  <Card
                    key={order.id}
                    className="mb-4 shadow-sm"
                    style={{ borderRadius: 14 }}
                  >
                    <Card.Body>
                      <Row>
                        <Col
                          xs={2}
                          md={1}
                          className="d-flex align-items-center justify-content-center"
                        >
                          {TIMELINE_STATUSES[timelineIdx]?.icon}
                        </Col>
                        <Col xs={10} md={11}>
                          <Card.Title style={{ fontSize: "1.15rem", fontWeight: 600 }}>
                            Order Total:{" "}
                            <span style={{ color: "#06a" }}>
                              {order.orderTotal?.toLocaleString()}
                            </span>{" "}
                            <Badge
                              pill
                              bg={
                                order.paymentMethod === "cod"
                                  ? "warning"
                                  : order.paymentMethod === "palmpay"
                                  ? "success"
                                  : "primary"
                              }
                              className="ms-2"
                            >
                              {order.paymentMethod === "cod" && (
                                <>
                                  <FaMoneyBillWave /> Cash on Delivery
                                </>
                              )}
                              {order.paymentMethod === "palmpay" && <>Palmpay</>}
                              {order.paymentMethod === "paystack" && <>Paystack</>}
                              {order.paymentMethod === "debitcard" && (
                                <>
                                  <FaCreditCard /> Debit Card
                                </>
                              )}
                            </Badge>
                          </Card.Title>
                          {/* Timeline Bar */}
                          <div className="mb-2" style={{ borderBottom: "2px solid #1976d2", display: "flex", alignItems: "flex-end", marginLeft: 1 }}>
                            {TIMELINE_STATUSES.map((s, idx) => (
                              <div
                                key={s.key}
                                className="text-center flex-grow-1"
                                style={{
                                  color:
                                    idx < timelineIdx
                                      ? "#1976d2"
                                      : idx === timelineIdx
                                      ? "#1976d2"
                                      : "#bbb",
                                  fontWeight: idx === timelineIdx ? 700 : 400,
                                  position: "relative",
                                  paddingBottom: 6,
                                }}
                              >
                                <div style={{ fontSize: 20, display: "flex", justifyContent: "center" }}>
                                  {/* Show check on delivered */}
                                  {idx === timelineIdx && s.key === "delivered" ? (
                                    <FaCheckCircle color="green" />
                                  ) : (
                                    s.icon
                                  )}
                                </div>
                                <div style={{ fontSize: 13 }}>{s.label}</div>
                                {/* Progress underline for completed steps */}
                                {idx < timelineIdx && (
                                  <div
                                    style={{
                                      position: "absolute",
                                      bottom: -2,
                                      left: 0,
                                      right: 0,
                                      height: 3,
                                      background: "#1976d2",
                                    }}
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                          {extraStatus && (
                            <Badge bg={extraStatus.badgeBg} className="ms-2">
                              {extraStatus.label}
                            </Badge>
                          )}
                          <div
                            style={{
                              color: "#222",
                              marginBottom: 6,
                              fontSize: "1rem",
                            }}
                          >
                            <strong>Status:</strong>{" "}
                            <span
                              style={{
                                color:
                                  order.status === "delivered"
                                    ? "green"
                                    : order.status === "processing"
                                    ? "#007bff"
                                    : order.status === "shipped"
                                    ? "#ff9800"
                                    : order.status === "outForDelivery"
                                    ? "#ffc107"
                                    : order.status === "cancelRequested"
                                    ? "red"
                                    : order.status === "returnRequested"
                                    ? "#ff9800"
                                    : "#888",
                              }}
                            >
                              {TIMELINE_STATUSES.concat(EXTRA_STATUSES).find(
                                (st) => st.key === order.status
                              )?.label || order.status}
                            </span>
                          </div>
                          <div style={{ fontSize: "0.98rem", color: "#444" }}>
                            <span>
                              Placed: <span style={{ color: "#333" }}>{placedDate || "N/A"}</span>
                            </span>
                          </div>
                          {order.items &&
                            Array.isArray(order.items) &&
                            order.items.length > 0 && (
                              <div className="mt-3">
                                <strong>Items:</strong>
                                <ListGroup variant="flush">
                                  {order.items.map((item, idx) => (
                                    <ListGroup.Item
                                      key={idx}
                                      style={{
                                        background: "transparent",
                                        paddingLeft: 0,
                                      }}
                                    >
                                      {item.name ? item.name : "Item"}{" "}
                                      {item.qty && (
                                        <Badge bg="secondary" pill className="ms-1">
                                          x{item.qty}
                                        </Badge>
                                      )}
                                      {item.price && (
                                        <span className="ms-2" style={{ color: "#06a" }}>
                                          {item.price}
                                        </span>
                                      )}
                                    </ListGroup.Item>
                                  ))}
                                </ListGroup>
                              </div>
                            )}
                          <div className="mt-3 d-flex flex-wrap gap-2">
                            <Button
                              size="sm"
                              variant="outline-danger"
                              disabled={!allowCancel || actionLoading}
                              onClick={() =>
                                setModal({ show: true, type: "cancel", orderId: order.id })
                              }
                            >
                              <FaTimesCircle className="mb-1" /> Cancel Order
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-warning"
                              disabled={
                                !allowReturn ||
                                actionLoading ||
                                order.status === "returnRequested" ||
                                order.status === "cancelRequested"
                              }
                              onClick={() =>
                                setModal({ show: true, type: "return", orderId: order.id })
                              }
                            >
                              <FaUndo className="mb-1" /> Request Return
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-info"
                              onClick={() =>
                                window.open(
                                  `mailto:support@yoursite.com?subject=Order%20Support%20for%20${order.id}`
                                )
                              }
                            >
                              <FaHeadset className="mb-1" /> Contact Support
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-secondary"
                              onClick={() => handleDownloadInvoice(order)}
                            >
                              <FaFilePdf className="mb-1" /> Download Invoice
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                );
              })}
            </ListGroup>
          )}
        </Col>
      </Row>
      <Modal
        show={modal.show}
        onHide={() => setModal({ show: false, type: "", orderId: null })}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modal.type === "cancel" ? "Cancel Order" : "Request Return"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modal.type === "cancel"
            ? "Are you sure you want to cancel this order? This action cannot be undone."
            : "Are you sure you want to request a return for this order?"}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setModal({ show: false, type: "", orderId: null })}
          >
            Close
          </Button>
          <Button
            variant={modal.type === "cancel" ? "danger" : "warning"}
            onClick={() => handleAction(modal.orderId, modal.type)}
            disabled={actionLoading}
          >
            {actionLoading ? "Processing..." : "Confirm"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Dashboard;