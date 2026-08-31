import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Badge, Button, Spinner } from "react-bootstrap";
import {
  FaArrowLeft,
  FaFilePdf,
  FaHeadset,
  FaTimesCircle,
  FaUndo,
} from "react-icons/fa";
import jsPDF from "jspdf";

import { useAuth } from "../../context/AuthContext";
import OrderTimeline from "../../components/OrderTimeline";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const statuses = [
  {
    key: "processing",
    label: "Processing",
  },
  {
    key: "shipped",
    label: "Shipped",
  },
  {
    key: "outForDelivery",
    label: "Out for Delivery",
  },
  {
    key: "delivered",
    label: "Delivered",
  },
];

const getTimelineIndex = (status) => {
  const index = statuses.findIndex((item) => item.key === status);

  return index >= 0 ? index : 0;
};

const formatDate = (timestamp) => {
  if (!timestamp) return "N/A";

  let date;

  if (
    typeof timestamp === "object" &&
    (timestamp.seconds || timestamp._seconds)
  ) {
    date = new Date((timestamp.seconds || timestamp._seconds) * 1000);
  } else {
    date = new Date(timestamp);
  }

  return Number.isNaN(date.getTime()) ? "N/A" : date.toLocaleString();
};

const OrderDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrder = async () => {
      if (!user || !id) return;

      try {
        setLoading(true);
        setError("");

        const token = await user.getIdToken();

        const response = await fetch(
          `${API_BASE_URL}/orders?userEmail=${encodeURIComponent(user.email)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || "Failed to load order.");
        }

        const foundOrder = data.orders?.find(
          (item) => String(item.id) === String(id),
        );

        if (!foundOrder) {
          throw new Error("Order not found.");
        }

        setOrder(foundOrder);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load order.");
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [user, id]);

  const updateOrder = async (status) => {
    if (!user || !order) return;

    try {
      setActionLoading(true);

      const token = await user.getIdToken();

      const response = await fetch(`${API_BASE_URL}/order/${order.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unable to update order.");
      }

      setOrder((current) => ({
        ...current,
        status,
      }));
    } catch (err) {
      alert(err.message || "Unable to update order.");
    } finally {
      setActionLoading(false);
    }
  };

  const downloadInvoice = () => {
    if (!order) return;

    const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.text("iProEdge Order Invoice", 14, 20);

    pdf.setFontSize(11);

    pdf.text(`Order ID: ${order.id}`, 14, 32);
    pdf.text(`Customer: ${user?.displayName || user?.email || ""}`, 14, 40);
    pdf.text(
      `Total: ₦${Number(order.orderTotal || 0).toLocaleString()}`,
      14,
      48,
    );
    pdf.text(`Payment: ${order.paymentMethod || "N/A"}`, 14, 56);
    pdf.text(`Status: ${order.status || "N/A"}`, 14, 64);
    pdf.text(`Date: ${formatDate(order.timestamp)}`, 14, 72);

    pdf.text("Items:", 14, 86);

    let y = 96;

    order.items?.forEach((item, index) => {
      pdf.text(
        `${index + 1}. ${item.name || "Item"} | Qty: ${
          item.qty || 1
        } | Price: ₦${Number(item.price || 0).toLocaleString()}`,
        16,
        y,
      );

      y += 8;
    });

    pdf.save(`invoice-${order.id}.pdf`);
  };

  const contactSupport = () => {
    if (!order) return;

    window.open(
      `mailto:support@yoursite.com?subject=${encodeURIComponent(
        `Order Support for #${order.id}`,
      )}`,
      "_blank",
    );
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Button
          variant="light"
          onClick={() => navigate("/account/orders")}
          className="mb-3"
        >
          <FaArrowLeft className="me-2" />
          Back to Orders
        </Button>

        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div>
      <Button
        variant="light"
        onClick={() => navigate("/account/orders")}
        className="mb-4"
      >
        <FaArrowLeft className="me-2" />
        Back to Orders
      </Button>

      <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">Order #{order.id}</h2>

          <p className="text-muted mb-0">{formatDate(order.timestamp)}</p>
        </div>

        <Badge bg="dark">{order.status}</Badge>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5 className="fw-bold mb-4">Order Status</h5>

          <OrderTimeline
            statuses={statuses.map((item) => ({
              ...item,
              icon: null,
            }))}
            currentIdx={getTimelineIndex(order.status)}
          />
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h5 className="fw-bold mb-3">Order Items</h5>

          {order.items?.map((item, index) => (
            <div
              key={index}
              className="d-flex justify-content-between border-bottom py-3"
            >
              <div>
                <strong>{item.name || "Product"}</strong>

                <div className="text-muted small">
                  Quantity: {item.qty || 1}
                </div>
              </div>

              <strong>₦{Number(item.price || 0).toLocaleString()}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <small className="text-muted d-block">Total</small>
              <strong>₦{Number(order.orderTotal || 0).toLocaleString()}</strong>
            </div>

            <div className="col-md-4">
              <small className="text-muted d-block">Payment Method</small>
              <strong>{order.paymentMethod || "N/A"}</strong>
            </div>

            <div className="col-md-4">
              <small className="text-muted d-block">Order Date</small>
              <strong>{formatDate(order.timestamp)}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex flex-wrap gap-2">
        <Button variant="dark" onClick={downloadInvoice}>
          <FaFilePdf className="me-2" />
          Download Invoice
        </Button>

        <Button variant="outline-info" onClick={contactSupport}>
          <FaHeadset className="me-2" />
          Contact Support
        </Button>

        {order.status === "processing" && (
          <Button
            variant="outline-danger"
            disabled={actionLoading}
            onClick={() => updateOrder("cancelRequested")}
          >
            <FaTimesCircle className="me-2" />
            Request Cancellation
          </Button>
        )}

        {order.status === "delivered" && (
          <Button
            variant="outline-warning"
            disabled={actionLoading}
            onClick={() => updateOrder("returnRequested")}
          >
            <FaUndo className="me-2" />
            Request Return
          </Button>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
