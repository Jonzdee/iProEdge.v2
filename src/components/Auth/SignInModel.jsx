import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import { auth } from "../../firebase"; // Adjust path if needed
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const SignInModal = ({ show, onHide }) => {
  // State for email/password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // State for phone
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Google login
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

  // Email login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onHide();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Phone login
  const handlePhoneLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Setup reCAPTCHA only once
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          { size: "invisible" },
          auth
        );
      }
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        appVerifier
      );
      setConfirmation(confirmationResult);
      setError("OTP sent! Enter OTP below.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // OTP verification
  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await confirmation.confirm(otp);
      onHide();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body className="p-4" style={{ maxHeight: "80vh", overflowY: "auto" }}>
        <div className="signin-container text-center" style={{ maxWidth: "400px", margin: "0 auto" }}>
          <h2 className="mb-4 fw-bold" style={{ color: "#1a73e8" }}>Welcome Back!</h2>
          <p className="text-muted mb-4" style={{ fontSize: "1.1rem" }}>
            Log in to continue and explore amazing features tailored just for you.
          </p>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          {/* Google Login */}
          <Button
            variant="outline-primary"
            className="d-flex align-items-center justify-content-center w-100 mb-4"
            style={{ borderRadius: "25px", padding: "10px 0" }}
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <FaGoogle className="me-2" size={20} />
            Log in with Google
          </Button>

          {/* Divider */}
          <div className="divider-or my-4" style={{ display: "flex", alignItems: "center" }}>
            <hr className="flex-grow-1" style={{ border: "none", height: "1px", background: "#d1d1d1" }} />
            <span style={{ padding: "0 15px", color: "#757575", fontWeight: "500" }}>or</span>
            <hr className="flex-grow-1" style={{ border: "none", height: "1px", background: "#d1d1d1" }} />
          </div>

          {/* Email and Password Login */}
          <Form className="mb-4" onSubmit={handleEmailLogin}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                style={{ borderRadius: "10px" }}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                style={{ borderRadius: "10px" }}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button
              variant="primary"
              className="w-100"
              style={{ borderRadius: "25px", padding: "10px 0", fontSize: "1.1rem" }}
              type="submit"
              disabled={loading}
            >
              Log in with Email
            </Button>
          </Form>

          {/* Phone Login */}
          {!confirmation ? (
            <Form onSubmit={handlePhoneLogin}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your phone number"
                  style={{ borderRadius: "10px" }}
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                />
              </Form.Group>
              <div id="recaptcha-container"></div>
              <Button
                variant="success"
                className="w-100"
                style={{ borderRadius: "25px", padding: "10px 0", fontSize: "1.1rem" }}
                type="submit"
                disabled={loading}
              >
                Log in with Phone
              </Button>
            </Form>
          ) : (
            <Form onSubmit={handleOtpVerify}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Enter OTP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the OTP sent to your phone"
                  style={{ borderRadius: "10px" }}
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  required
                />
              </Form.Group>
              <Button
                variant="success"
                className="w-100"
                style={{ borderRadius: "25px", padding: "10px 0", fontSize: "1.1rem" }}
                type="submit"
                disabled={loading}
              >
                Verify OTP
              </Button>
            </Form>
          )}

          {/* Footer */}
          <p className="mt-4 text-muted" style={{ fontSize: "0.9rem" }}>
            Need help? <a href="#" className="text-primary fw-bold">Contact Support</a>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SignInModal;