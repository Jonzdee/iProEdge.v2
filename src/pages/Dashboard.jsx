import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import Loader from "../components/Loader";
import { collection, query, where, orderBy, getDocs, doc, updateDoc } from "firebase/firestore";
import { Container, Row, Col, Card, Badge, ListGroup, Alert, Button, ProgressBar, Modal } from "react-bootstrap";
import { FaCheckCircle, FaMoneyBillWave, FaCreditCard, FaRegClock, FaTruck, FaHome, FaFilePdf, FaTimesCircle, FaUndo, FaHeadset } from "react-icons/fa";
import jsPDF from "jspdf";

const ORDER_STATUSES = [
  { key: "processing", label: "Processing", icon: <FaRegClock color="#888" /> },
  { key: "shipped", label: "Shipped", icon: <FaTruck color="#007bff" /> },
  { key: "outForDelivery", label: "Out for Delivery", icon: <FaHome color="#ffc107" /> },
  { key: "delivered", label: "Delivered", icon: <FaCheckCircle color="green" /> },
  { key: "cancelRequested", label: "Cancel Requested", icon: <FaTimesCircle color="red" /> },
  { key: "returnRequested", label: "Return Requested", icon: <FaUndo color="#ff9800" /> },
];

function getStatusIndex(status) {
  return ORDER_STATUSES.findIndex(s => s.key === status);
}

const Dashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ show: false, type: "", orderId: null });

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      const q = query(
        collection(db, "orders"),
        where("userId", "==", user.uid),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      setOrders(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };

    fetchOrders();
  }, [user, modal]); // refetch after action

  const handleAction = async (orderId, type) => {
    setModal({ show: false, type: "", orderId: null });
    if (!orderId) return;
    const orderRef = doc(db, "orders", orderId);
    let statusUpdate = {};
    if (type === "cancel") statusUpdate = { status: "cancelRequested" };
    if (type === "return") statusUpdate = { status: "returnRequested" };
    await updateDoc(orderRef, statusUpdate);
    // Optionally, send a notification or email here!
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
    docPdf.text(`Order Date: ${
      order.timestamp && order.timestamp.seconds
        ? new Date(order.timestamp.seconds * 1000).toLocaleString()
        : ""
    }`, 14, 68);
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
            {user.displayName ? `Hi, ${user.displayName.split(" ")[0]}!` : "Your Dashboard"}
          </h2>
          <div className="mb-3" style={{ color: "#888" }}>
            Here are your recent orders:
          </div>
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
                const statusIdx = getStatusIndex(order.status) >= 0 ? getStatusIndex(order.status) : 0;
                // Only allow cancel if processing; allow return if delivered
                const allowCancel =
                  order.status === "processing";
                const allowReturn =
                  order.status === "delivered";
                return (
                  <Card
                    key={order.id}
                    className="mb-4 shadow-sm"
                    style={{ borderRadius: 14 }}
                  >
                    <Card.Body>
                      <Row>
                        <Col xs={2} md={1} className="d-flex align-items-center justify-content-center">
                          {ORDER_STATUSES[statusIdx]?.icon}
                        </Col>
                        <Col xs={10} md={11}>
                          <Card.Title style={{ fontSize: "1.15rem", fontWeight: 600 }}>
                            Order Total: <span style={{ color: "#06a" }}>{order.orderTotal}</span>
                            {" "}
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

                          {/* Status Timeline */}
                          <div className="mb-2">
                            <div style={{ display: "flex", alignItems: "center" }}>
                              {ORDER_STATUSES.slice(0, 4).map((s, idx) => (
                                <div
                                  key={s.key}
                                  style={{
                                    flex: 1,
                                    textAlign: "center",
                                    color: statusIdx >= idx ? "#06a" : "#bbb",
                                    fontWeight: statusIdx === idx ? 700 : 400,
                                    fontSize: 13,
                                  }}
                                >
                                  <div>
                                    {s.icon}
                                  </div>
                                  <div>{s.label}</div>
                                  {idx < 3 && (
                                    <div
                                      style={{
                                        width: "100%",
                                        height: 2,
                                        background:
                                          statusIdx > idx ? "#06a" : "#eee",
                                        margin: "4px 0 0 0",
                                      }}
                                    />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div style={{ color: "#222", marginBottom: 6, fontSize: "1rem" }}>
                            <strong>Status:</strong>{" "}
                            <span style={{
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
                                  : "#888"
                            }}>
                              {ORDER_STATUSES.find(st => st.key === order.status)?.label || order.status}
                            </span>
                          </div>
                          <div style={{ fontSize: "0.98rem", color: "#444" }}>
                            <span>
                              Placed:{" "}
                              <span style={{ color: "#333" }}>
                                {order.timestamp && order.timestamp.seconds
                                  ? new Date(order.timestamp.seconds * 1000).toLocaleString()
                                  : ""}
                              </span>
                            </span>
                          </div>
                          {order.items && Array.isArray(order.items) && order.items.length > 0 && (
                            <div className="mt-3">
                              <strong>Items:</strong>
                              <ListGroup variant="flush">
                                {order.items.map((item, idx) => (
                                  <ListGroup.Item key={idx} style={{ background: "transparent", paddingLeft: 0 }}>
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
                              disabled={!allowCancel}
                              onClick={() => setModal({ show: true, type: "cancel", orderId: order.id })}
                            >
                              <FaTimesCircle className="mb-1" /> Cancel Order
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-warning"
                              disabled={!allowReturn}
                              onClick={() => setModal({ show: true, type: "return", orderId: order.id })}
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
      {/* Modal for Cancel/Return */}
      <Modal show={modal.show} onHide={() => setModal({ show: false, type: "", orderId: null })} centered>
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
          <Button variant="secondary" onClick={() => setModal({ show: false, type: "", orderId: null })}>
            Close
          </Button>
          <Button
            variant={modal.type === "cancel" ? "danger" : "warning"}
            onClick={() => handleAction(modal.orderId, modal.type)}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Dashboard;