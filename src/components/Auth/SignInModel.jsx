import { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Spinner,
  Form,
  InputGroup,
  FormControl,
  Row,
  Col,
} from "react-bootstrap";
import { FaGoogle, FaApple, FaXTwitter } from "react-icons/fa6";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createUserProfile } from "../../utils/createUserProfile";
import { useSearchParams } from "react-router-dom";

const SignInModal = ({ show, onHide }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Capture ?ref= from URL
  const [searchParams] = useSearchParams();
  const referredBy = searchParams.get("ref"); // 👈 this is the referral code if present

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();

      // ✅ Sign in with Google
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // ✅ Create profile in Firestore and save referredBy if present
      await createUserProfile(user.uid, {
        name: user.displayName,
        email: user.email,
        referredBy: referredBy || null, // 👈 store referral info
      });

      onHide();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      keyboard={true}
      dialogClassName="border-0"
      contentClassName="border-0"
    >
      <Modal.Body
        className="p-4"
        style={{
          width: "100%",
          margin: "0 auto",
          borderRadius: "20px",
          background: "#fff",
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
        }}
      >
        <div className="text-center">
          <h4 className="fw-bold mb-1">Welcome</h4>
          <p className="text-muted mb-4" style={{ fontSize: 14 }}>
            Please enter your details to sign in
          </p>

          {error && (
            <div className="alert alert-danger py-2 small mb-3">{error}</div>
          )}

          {/* Social icons */}
          <div className="d-flex justify-content-center gap-3 mb-4">
            <Button
              variant="outline-secondary"
              className="border-0 shadow-sm px-3 py-2"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              {loading ? <Spinner animation="border" size="sm" /> : <FaGoogle size={18} />}
            </Button>
            <Button
              variant="outline-secondary"
              className="border-0 shadow-sm px-3 py-2"
            >
              <FaApple size={18} />
            </Button>
            <Button
              variant="outline-secondary"
              className="border-0 shadow-sm px-3 py-2"
            >
              <FaXTwitter size={18} />
            </Button>
          </div>

          <div className="text-muted my-3" style={{ fontSize: 13 }}>
            — OR —
          </div>

          <Form>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label className="text-muted small">
                Your Email Address
              </Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label className="text-muted small">Password</Form.Label>
              <InputGroup>
                <FormControl
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                />
                <Button
                  variant="outline-light"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </Button>
              </InputGroup>
            </Form.Group>

            <Row className="align-items-center mb-3">
              <Col xs="6">
                <Form.Check label="Remember me" />
              </Col>
              <Col xs="6" className="text-end">
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{ fontSize: 13 }}
                >
                  Forgot password?
                </a>
              </Col>
            </Row>

            <Button
              variant="dark"
              type="submit"
              className="w-100 rounded-pill py-2 fw-semibold"
            >
              Sign in
            </Button>
          </Form>

          <div className="text-center mt-4" style={{ fontSize: 14 }}>
            Don’t have an account?{" "}
            <a href="#" className="fw-semibold text-dark text-decoration-none">
              Sign up
            </a>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SignInModal;
