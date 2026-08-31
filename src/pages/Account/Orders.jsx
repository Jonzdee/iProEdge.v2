import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Spinner, Alert, Badge, Button } from "react-bootstrap";
import {
  FaShoppingBag,
  FaEye,
  FaMoneyBillWave,
  FaCreditCard,
} from "react-icons/fa";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getStatusLabel = (status) => {
  const labels = {
    processing: "Processing",
    shipped: "Shipped",
    outForDelivery: "Out for Delivery",
    delivered: "Delivered",
    cancelRequested: "Cancel Requested",
    returnRequested: "Return Requested",
  };

  return labels[status] || status || "Unknown";
};

const getStatusVariant = (status) => {
  switch (status) {
    case "delivered":
      return "success";
    case "processing":
      return "primary";
    case "shipped":
      return "info";
    case "outForDelivery":
      return "warning";
    case "cancelRequested":
      return "danger";
    case "returnRequested":
      return "warning";
    default:
      return "secondary";
  }
};

const PaymentBadge = ({ paymentMethod }) => {
  switch (paymentMethod) {
    case "cod":
      return (
        <Badge pill bg="warning" aria-label="Cash on Delivery">
          <FaMoneyBillWave className="me-1" />
          Cash on Delivery
        </Badge>
      );
    case "palmpay":
      return (
        <Badge pill bg="success" aria-label="Palmpay">
          Palmpay
        </Badge>
      );
    case "paystack":
      return (
        <Badge pill bg="primary" aria-label="Paystack">
          Paystack
        </Badge>
      );
    case "debitcard":
      return (
        <Badge pill bg="primary" aria-label="Debit Card">
          <FaCreditCard className="me-1" />
          Debit Card
        </Badge>
      );
    default:
      return <span className="text-muted">N/A</span>;
  }
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

  if (Number.isNaN(date.getTime())) return "N/A";

  return date.toLocaleString();
};

const Orders = () => {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

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
          throw new Error(data.error || "Failed to load orders.");
        }

        if (!cancelled) {
          setOrders(Array.isArray(data.orders) ? data.orders : []);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Orders error:", err);
          setError(err.message || "Failed to load orders.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchOrders();

    return () => {
      cancelled = true;
    };
  }, [user]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
        <p className="mt-3 text-muted">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold mb-1">My Orders</h2>
        <p className="text-muted mb-0">
          Track and manage your iProEdge orders.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-5 border rounded">
          <FaShoppingBag size={45} className="text-muted" />

          <h4 className="mt-3">No orders yet</h4>

          <p className="text-muted">
            Your orders will appear here after you make a purchase.
          </p>

          <Link to="/shop" className="btn btn-dark">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {orders.map((order) => (
            <div className="card border-0 shadow-sm" key={order.id}>
              <div className="card-body">
                <div className="d-flex flex-wrap justify-content-between gap-3">
                  <div>
                    <small className="text-muted">Order ID</small>

                    <h5 className="mb-1">#{order.id}</h5>

                    <small className="text-muted">
                      {formatDate(order.timestamp)}
                    </small>
                  </div>

                  <Badge
                    bg={getStatusVariant(order.status)}
                    className="align-self-start"
                  >
                    {getStatusLabel(order.status)}
                  </Badge>
                </div>

                <hr />

                <div className="row g-3">
                  <div className="col-md-4">
                    <small className="text-muted d-block">Total</small>

                    <strong>
                      ₦{Number(order.orderTotal || 0).toLocaleString()}
                    </strong>
                  </div>

                  <div className="col-md-4">
                    <small className="text-muted d-block">Payment</small>

                    <PaymentBadge paymentMethod={order.paymentMethod} />
                  </div>

                  <div className="col-md-4">
                    <small className="text-muted d-block">Items</small>

                    <strong>
                      {Array.isArray(order.items) ? order.items.length : 0}
                    </strong>
                  </div>
                </div>

                <div className="mt-3">
                  <Button
                    as={Link}
                    to={`/account/orders/details/${order.id}`}
                    variant="dark"
                  >
                    <FaEye className="me-2" />
                    View Order
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
