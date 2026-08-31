import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Badge, Button, Spinner } from "react-bootstrap";
import { FaBoxOpen, FaTimesCircle, FaUndo } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const RETURN_STATUSES = ["cancelRequested", "returnRequested"];

const statusMeta = {
  cancelRequested: {
    label: "Cancellation Requested",
    variant: "danger",
    icon: FaTimesCircle,
  },
  returnRequested: {
    label: "Return Requested",
    variant: "warning",
    icon: FaUndo,
  },
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

const getTimestampValue = (timestamp) => {
  if (!timestamp) return 0;

  if (
    typeof timestamp === "object" &&
    (timestamp.seconds || timestamp._seconds)
  ) {
    return (timestamp.seconds || timestamp._seconds) * 1000;
  }

  const value = new Date(timestamp).getTime();

  return Number.isNaN(value) ? 0 : value;
};

const ReturnsRefunds = () => {
  const { user } = useAuth();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRequests = async () => {
      if (!user) return;

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
          throw new Error(data.error || "Failed to load return requests.");
        }

        const filtered = (data.orders || [])
          .filter((order) => RETURN_STATUSES.includes(order.status))
          .sort(
            (a, b) =>
              getTimestampValue(b.timestamp) - getTimestampValue(a.timestamp),
          );

        setRequests(filtered);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load return requests.");
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, [user]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-5 text-muted">
        <FaBoxOpen size={40} className="mb-3" />
        <p className="mb-0">No return requests.</p>
      </div>
    );
  }

  return (
    <div>
      <h4 className="fw-bold mb-4">Returns & Refunds</h4>

      {requests.map((order) => {
        const meta = statusMeta[order.status];
        const Icon = meta?.icon;

        return (
          <div key={order.id} className="card border-0 shadow-sm mb-3">
            <div className="card-body d-flex flex-wrap justify-content-between align-items-center gap-3">
              <div>
                <h6 className="fw-bold mb-1">Order #{order.id}</h6>

                <p className="text-muted small mb-0">
                  {formatDate(order.timestamp)}
                </p>

                <p className="mb-0">
                  ₦{Number(order.orderTotal || 0).toLocaleString()}
                </p>
              </div>

              <div className="d-flex align-items-center gap-3">
                <Badge bg={meta?.variant || "secondary"}>
                  {Icon && <Icon className="me-1" />}
                  {meta?.label || order.status}
                </Badge>

                <Button
                  as={Link}
                  to={`/account/orders/details/${order.id}`}
                  variant="outline-dark"
                  size="sm"
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReturnsRefunds;
