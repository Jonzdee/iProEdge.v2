import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ReferralAd = () => {
  const navigate = useNavigate();

  return (
    <Container
      fluid
      className="my-5 py-5"
      style={{
        background: "linear-gradient(135deg, #1a1a1a, #444)", // dark classic gradient
        borderRadius: "20px",
        color: "#fff",
        boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
        maxWidth: "1200px",
      }}
    >
      <Row className="align-items-center justify-content-center text-center text-md-start px-3 px-md-5">
        <Col md={8}>
          <h1
            style={{
              fontWeight: "900",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-1px",
              marginBottom: "1rem",
            }}
          >
            🎁 Earn ₦500 For Every Friend You Refer!
          </h1>
          <p
            style={{
              fontSize: "1.2rem",
              opacity: 0.9,
              marginBottom: "2rem",
              lineHeight: 1.6,
            }}
          >
            Share iproedge with your friends today. They get ₦500 off, and you
            earn ₦500 for every successful referral. It’s that simple!
          </p>
          <Button
            onClick={() => navigate("/refer")}
            style={{
              background: "linear-gradient(45deg, #ffd700, #ff7e5f)",
              border: "none",
              padding: "0.9rem 2rem",
              borderRadius: "50px",
              fontWeight: "700",
              fontSize: "1rem",
              color: "#222",
              boxShadow: "0 6px 15px rgba(255,215,0,0.4)",
            }}
          >
            Start Referring Now
          </Button>
        </Col>
        <Col md={4} className="d-none d-md-block">
          <div
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: "15px",
              height: "220px",
              width: "100%",
              maxWidth: "220px",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "4rem",
              fontWeight: "bold",
              color: "#ffd700",
              border: "3px dashed rgba(255,255,255,0.3)",
            }}
          >
            ₦500
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ReferralAd;
