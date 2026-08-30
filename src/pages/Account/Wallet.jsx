import { useEffect, useState } from "react";
import { Alert, Button, Spinner } from "react-bootstrap";
import { FaWallet, FaWhatsapp } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Wallet = () => {
  const { user } = useAuth();

  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchWallet = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const token = await user.getIdToken();

        const response = await fetch(
          `${API_BASE_URL}/wallet?userId=${encodeURIComponent(
            user.uid
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.error || "Failed to load wallet."
          );
        }

        if (!cancelled) {
          setBalance(data.balance || 0);
        }
      } catch (err) {
        console.error("Wallet error:", err);

        if (!cancelled) {
          setError(
            err.message || "Unable to load wallet."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchWallet();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const handleWithdraw = () => {
    if (balance <= 0) {
      alert("You have no balance to withdraw.");
      return;
    }

    setWithdrawLoading(true);

    const adminPhone = "2348063856166";

    const message = `Hello Admin, I would like to request a withdrawal from my wallet.
User: ${user.email}
Amount: ₦${Number(balance).toLocaleString()}`;

    window.open(
      `https://wa.me/${adminPhone}?text=${encodeURIComponent(
        message
      )}`,
      "_blank"
    );

    setWithdrawLoading(false);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
        <p className="text-muted mt-3">
          Loading wallet...
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold mb-1">My Wallet</h2>
        <p className="text-muted mb-0">
          Manage your referral earnings.
        </p>
      </div>

      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <div className="d-flex align-items-center gap-3">
            <div
              className="d-flex align-items-center justify-content-center bg-dark text-white"
              style={{
                width: 55,
                height: 55,
                borderRadius: "50%",
              }}
            >
              <FaWallet size={24} />
            </div>

            <div>
              <small className="text-muted">
                Available Balance
              </small>

              <h2 className="fw-bold mb-0">
                ₦{Number(balance).toLocaleString()}
              </h2>
            </div>
          </div>

          <hr />

          <p className="text-muted">
            Your wallet balance represents earnings from the
            iProEdge referral system.
          </p>

          <Button
            variant="success"
            onClick={handleWithdraw}
            disabled={
              withdrawLoading || balance <= 0
            }
          >
            <FaWhatsapp className="me-2" />

            {withdrawLoading
              ? "Opening WhatsApp..."
              : "Request Withdrawal"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Wallet;