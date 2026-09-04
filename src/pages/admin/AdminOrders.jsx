import { useEffect, useState } from "react";
import { Badge, Button, Spinner, Alert, Form, Table } from "react-bootstrap";
import { FaSync } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const STATUS_OPTIONS = [
  "processing",
  "shipped",
  "outForDelivery",
  "delivered",
  "cancelRequested",
  "returnRequested",
];

const statusVariant = {
  processing: "primary",
  shipped: "info",
  outForDelivery: "warning",
  delivered: "success",
  cancelRequested: "danger",
  returnRequested: "warning",
};

const AdminOrders = () => {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const fetchOrders = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError("");

      const token = await user.getIdToken();
      const params = new URLSearchParams();
      if (filterStatus) params.set("status", filterStatus);

      const response = await fetch(
        `${API_BASE_URL}/admin/orders?${params.toString()}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to load orders.");
      }

      setOrders(data.orders || []);
    } catch (err) {
      setError(err.message || "Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, filterStatus]);

  const updateStatus = async (orderId, status) => {
    try {
      setActionLoadingId(orderId);

      const token = await user.getIdToken();
      const isDeliver = status === "delivered";

      // /orders/:id/deliver also applies referral rewards, so use it
      // specifically for the "delivered" transition. Everything else
      // goes through the generic status PATCH.
      const response = await fetch(
        isDeliver
          ? `${API_BASE_URL}/orders/${orderId}/deliver`
          : `${API_BASE_URL}/order/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: isDeliver ? undefined : JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || data.message || "Failed to update order."
        );
      }

      await fetchOrders();
    } catch (err) {
      alert(err.message || "Failed to update order.");
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <h3 className="fw-bold mb-0">All Orders</h3>

        <div className="d-flex gap-2 align-items-center">
          <Form.Select
            size="sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ width: 200 }}
          >
            <option value="">All statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Form.Select>

          <Button size="sm" variant="outline-dark" onClick={fetchOrders}>
            <FaSync />
          </Button>
        </div>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : orders.length === 0 ? (
        <Alert variant="info">No orders found.</Alert>
      ) : (
        <div className="table-responsive">
          <Table hover className="bg-white">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Change Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>
                    {order.userName || "—"}
                    <div className="text-muted small">
                      {order.userEmail}
                    </div>
                  </td>
                  <td>
                    ₦{Number(order.orderTotal || 0).toLocaleString()}
                  </td>
                  <td>
                    <Badge bg={statusVariant[order.status] || "secondary"}>
                      {order.status}
                    </Badge>
                  </td>
                  <td>
                    <Form.Select
                      size="sm"
                      value=""
                      disabled={actionLoadingId === order.id}
                      onChange={(e) => {
                        if (e.target.value) {
                          updateStatus(order.id, e.target.value);
                        }
                      }}
                      style={{ width: 180 }}
                    >
                      <option value="">
                        {actionLoadingId === order.id
                          ? "Updating..."
                          : "Set status..."}
                      </option>
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;