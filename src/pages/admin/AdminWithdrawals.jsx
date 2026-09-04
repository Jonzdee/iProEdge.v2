import { useEffect, useState } from "react";
import { Badge, Button, Spinner, Alert, Table } from "react-bootstrap";
import { FaCheck, FaTimes, FaSync } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const statusVariant = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
};

const formatDate = (timestamp) => {
  if (!timestamp) return "N/A";

  const seconds = timestamp.seconds || timestamp._seconds;
  const date = seconds ? new Date(seconds * 1000) : new Date(timestamp);

  return Number.isNaN(date.getTime()) ? "N/A" : date.toLocaleString();
};

const AdminWithdrawals = () => {
  const { user } = useAuth();

  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const fetchWithdrawals = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError("");

      const token = await user.getIdToken();

      const response = await fetch(`${API_BASE_URL}/admin/withdrawals`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to load withdrawals.");
      }

      setWithdrawals(data.withdrawals || []);
    } catch (err) {
      setError(err.message || "Failed to load withdrawals.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const resolve = async (id, action) => {
    const confirmed = window.confirm(
      action === "approve"
        ? "Confirm this withdrawal has been paid out?"
        : "Reject this request and refund the balance?",
    );

    if (!confirmed) return;

    try {
      setActionLoadingId(id);

      const token = await user.getIdToken();

      const response = await fetch(`${API_BASE_URL}/admin/withdrawals/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to update withdrawal.");
      }

      await fetchWithdrawals();
    } catch (err) {
      alert(err.message || "Failed to update withdrawal.");
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0">Withdrawal Requests</h3>

        <Button size="sm" variant="outline-dark" onClick={fetchWithdrawals}>
          <FaSync />
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : withdrawals.length === 0 ? (
        <Alert variant="info">No withdrawal requests.</Alert>
      ) : (
        <div className="table-responsive">
          <Table hover className="bg-white">
            <thead>
              <tr>
                <th>User</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Requested</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((w) => (
                <tr key={w.id}>
                  <td>
                    {w.userName || "—"}
                    <div className="text-muted small">
                      {w.userEmail || w.uid}
                    </div>
                  </td>
                  <td>₦{Number(w.amount || 0).toLocaleString()}</td>
                  <td>
                    <Badge bg={statusVariant[w.status] || "secondary"}>
                      {w.status}
                    </Badge>
                  </td>
                  <td>{formatDate(w.timestamp)}</td>
                  <td>
                    {w.status === "pending" ? (
                      <div className="d-flex gap-2">
                        <Button
                          size="sm"
                          variant="success"
                          disabled={actionLoadingId === w.id}
                          onClick={() => resolve(w.id, "approve")}
                        >
                          <FaCheck />
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          disabled={actionLoadingId === w.id}
                          onClick={() => resolve(w.id, "reject")}
                        >
                          <FaTimes />
                        </Button>
                      </div>
                    ) : (
                      <span className="text-muted small">Resolved</span>
                    )}
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

export default AdminWithdrawals;
