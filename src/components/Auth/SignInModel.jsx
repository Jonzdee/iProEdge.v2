import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const SignInModal = ({ show, onHide }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle Google login
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onHide();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body
        className="p-4"
        style={{
          maxWidth: 380,
          margin: "0 auto",
          borderRadius: 14,
          boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
          background: "#fff",
        }}
      >
        <div className="text-center">
          {/* Replace with your own iProedge logo if available */}
          <img
            src="/iproedge-logo.png"
            alt="iProedge Logo"
            style={{ width: 110, marginBottom: 18 }}
            onError={e => (e.target.style.display = "none")}
          />
          <h4 className="fw-bold mb-3" style={{ color: "#14274e" }}>
            Welcome to iProedge
          </h4>
          <p className="mb-4" style={{ color: "#222", fontSize: "1.04rem" }}>
            Log in to your account to continue!
          </p>

          {error && (
            <div className="alert alert-danger py-2" style={{ fontSize: 14 }}>
              {error}
            </div>
          )}

          <Button
            variant="primary"
            className="d-flex align-items-center justify-content-center w-100 mb-3"
            style={{
              borderRadius: 24,
              padding: "12px 0",
              fontWeight: 600,
              fontSize: 17,
              color: "#fff",
              background: "#14274e",
              border: "none",
              boxShadow: "0 2px 6px rgba(20,39,78,0.10)",
            }}
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <FaGoogle className="me-2" size={22} />
            Continue with Google
          </Button>

          <div className="my-4" style={{ color: "#b0b7c3", fontSize: 14 }}>
            — OR —
          </div>

          <div className="mb-2" style={{ fontSize: 15, color: "#666" }}>
            Don’t have an account?
            <a
              href="#"
              style={{
                color: "#14274e",
                marginLeft: 4,
                fontWeight: 500,
                textDecoration: "none",
              }}
              onClick={e => {
                e.preventDefault();
                // You can trigger a register modal here if you have one
              }}
            >
              Create an account
            </a>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SignInModal;