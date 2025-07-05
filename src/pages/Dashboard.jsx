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
  {
    key: "outForDelivery",
    label: "Out for Delivery",
    icon: <FaHome color="#ffc107" />,
  },
  {
    key: "delivered",
    label: "Delivered",
    icon: <FaCheckCircle color="green" />,
  },
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
// 3. Extract payment badge to a component
const PaymentBadge = ({ paymentMethod }) => {
  switch (paymentMethod) {
    case "cod":
      return (
        <Badge pill bg="warning" className="ms-2" aria-label="Cash on Delivery">
          <FaMoneyBillWave /> Cash on Delivery
        </Badge>
      );
    case "palmpay":
      return (
        <Badge pill bg="success" className="ms-2" aria-label="Palmpay">
          Palmpay
        </Badge>
      );
    case "paystack":
      return (
        <Badge pill bg="primary" className="ms-2" aria-label="Paystack">
          Paystack
        </Badge>
      );
    case "debitcard":
      return (
        <Badge pill bg="primary" className="ms-2" aria-label="Debit Card">
          <FaCreditCard /> Debit Card
        </Badge>
      );
    default:
      return null;
  }
};
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
  // 5. Feedback auto-dismiss
  useEffect(() => {
    if (feedback.show) {
      const timer = setTimeout(
        () => setFeedback((f) => ({ ...f, show: false })),
        4000
      );
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  // Fetch orders from backend API with authentication
  const fetchOrders = () => {
    if (!user) return;
    setLoading(true);
    user.getIdToken().then((token) => {
      fetch(
        `https://iproedgeback.onrender.com/orders?userEmail=${encodeURIComponent(
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

  // user becomes null (user logs out), so you clear orders and feedback immediately.
  useEffect(() => {
    if (!user) {
      setOrders([]);
      setFeedback({ show: false, variant: "", message: "" });
      setLoading(false);
      return;
    }
    fetchOrders();
  }, [user]);

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
      const res = await fetch(
        `https://iproedgeback.onrender.com/order/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(statusUpdate),
        }
      );
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

    // Debug line:
    console.log("order.timestamp", order.timestamp, typeof order.timestamp);

    // Robust timestamp handling
    let orderDateStr = "N/A";
    if (order.timestamp) {
      let dateObj = null;
      if (
        typeof order.timestamp === "object" &&
        (order.timestamp.seconds || order.timestamp._seconds)
      ) {
        // Support both Firestore keys
        const seconds = order.timestamp.seconds || order.timestamp._seconds;
        dateObj = new Date(seconds * 1000);
      } else if (typeof order.timestamp === "string") {
        dateObj = new Date(order.timestamp);
      } else if (typeof order.timestamp === "number") {
        dateObj = new Date(order.timestamp);
      }
      if (dateObj && !isNaN(dateObj.getTime())) {
        orderDateStr = dateObj.toLocaleString();
      }
    }
    docPdf.text(`Order Date: ${orderDateStr}`, 14, 68);

    docPdf.text("Items:", 14, 76);
    let y = 84;
    if (order.items && order.items.length > 0) {
      order.items.forEach((item, idx) => {
        docPdf.text(
          `${idx + 1}. ${item.name || "Item"}  Qty: ${item.qty || 1}  Price: ${
            item.price || ""
          }`,
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
                  let d = null;
                  if (
                    typeof order.timestamp === "object" &&
                    (order.timestamp.seconds || order.timestamp._seconds)
                  ) {
                    const seconds =
                      order.timestamp.seconds || order.timestamp._seconds;
                    d = new Date(seconds * 1000);
                  } else if (
                    typeof order.timestamp === "string" ||
                    typeof order.timestamp === "number"
                  ) {
                    d = new Date(order.timestamp);
                  }
                  placedDate =
                    d && !isNaN(d.getTime()) ? d.toLocaleString() : "";
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
                          <Card.Title
                            style={{ fontSize: "1.15rem", fontWeight: 600 }}
                          >
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
                              {order.paymentMethod === "palmpay" && (
                                <>Palmpay</>
                              )}
                              {order.paymentMethod === "paystack" && (
                                <>Paystack</>
                              )}
                              {order.paymentMethod === "debitcard" && (
                                <>
                                  <FaCreditCard /> Debit Card
                                </>
                              )}
                            </Badge>
                          </Card.Title>
                          {/* Timeline Bar */}
                          <div
                            className="mb-2"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              marginLeft: 1,
                              minHeight: 56,
                            }}
                          >
                            {TIMELINE_STATUSES.map((s, idx) => {
                              // Determine the step state
                              let icon;
                              let color;
                              if (idx < timelineIdx) {
                                // Completed
                                icon = <FaCheckCircle color="#1976d2" />;
                                color = "#1976d2";
                              } else if (idx === timelineIdx) {
                                // Current
                                icon =
                                  s.key === "delivered" ? (
                                    <FaCheckCircle color="green" />
                                  ) : (
                                    // Use a filled dot or colored icon for current step
                                    <span
                                      style={{
                                        display: "inline-block",
                                        width: 16,
                                        height: 16,
                                        borderRadius: "50%",
                                        background: "#1976d2",
                                        border: "2px solid #1976d2",
                                        marginBottom: 2,
                                      }}
                                    ></span>
                                  );
                                color = "#1976d2";
                              } else {
                                // Future
                                icon = (
                                  <span
                                    style={{
                                      display: "inline-block",
                                      width: 16,
                                      height: 16,
                                      borderRadius: "50%",
                                      background: "#eee",
                                      border: "2px solid #bbb",
                                      marginBottom: 2,
                                    }}
                                  ></span>
                                );
                                color = "#bbb";
                              }
                              return (
                                <div
                                  key={s.key}
                                  className="text-center flex-grow-1"
                                  style={{
                                    color,
                                    fontWeight: idx === timelineIdx ? 700 : 400,
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    {icon}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: 13,
                                      fontWeight:
                                        idx === timelineIdx ? "bold" : "normal",
                                      marginTop: 2,
                                    }}
                                  >
                                    {s.label}
                                  </div>
                                </div>
                              );
                            })}
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
                              Placed:{" "}
                              <span style={{ color: "#333" }}>
                                {placedDate || "N/A"}
                              </span>
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
                                        <Badge
                                          bg="secondary"
                                          pill
                                          className="ms-1"
                                        >
                                          x{item.qty}
                                        </Badge>
                                      )}
                                      {item.price && (
                                        <span
                                          className="ms-2"
                                          style={{ color: "#06a" }}
                                        >
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
                                setModal({
                                  show: true,
                                  type: "cancel",
                                  orderId: order.id,
                                })
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
                                setModal({
                                  show: true,
                                  type: "return",
                                  orderId: order.id,
                                })
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
            aria-label="Confirm Action"
          >
            {/* 11. Spinner in Confirm button */}
            {actionLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Processing...
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Dashboard;
