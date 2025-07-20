import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import bannerImage from "../Images/banner new.jpg"; // Adjust path as needed
const ReferralPage = () => {
  const [referralCode, setReferralCode] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(async (u) => {
      if (u) {
        setUser(u);
        try {
          const docRef = doc(db, "users", u.uid);
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            setReferralCode(snap.data().referralCode || "");
          }
        } catch {
          // error silently
        }
      } else {
        setUser(null);
        setReferralCode("");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

const handleCopyCode = async () => {
  if (!referralCode) return;

  // ✅ build a homepage referral link
  const referralLink = `https://iproedge.store/?ref=${referralCode}`;

  try {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = referralLink;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
};


 const handleWhatsAppShare = () => {
  if (!referralCode) return;

  const referralLink = `https://iproedge.store/?ref=${referralCode}`;
  const message = `Hey! Shop gadgets at iProEdge and use my referral code ${referralCode} to get ₦500 off your first order: ${referralLink}`;

  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
};


  // card hover styles
  const cardStyle = {
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    height: "100%",
  };
  const cardHoverStyle = {
    transform: "translateY(-5px)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  };

  return (
    <div>
      {/* Hero Section */}
      <div
  style={{
    position: "relative",
     backgroundImage: `url(${bannerImage})`, // ✅ if placed in public/images
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    color: "white",
    padding: "6rem 1rem",
    textAlign: "center",
    overflow: "hidden",
  }}
>
  {/* Overlay */}
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.67)", // darker overlay for contrast
      zIndex: 1,
    }}
  ></div>

  {/* Text container with zIndex above overlay */}
  <div style={{ position: "relative", zIndex: 2, maxWidth: "800px", margin: "0 auto" }}>
    <h1
      style={{
        fontWeight: 800,
        fontSize: "clamp(2rem, 5vw, 3.5rem)", // responsive font
        marginBottom: "1.5rem",
        textShadow: "2px 2px 6px rgba(0,0,0,0.7)", // makes text pop
      }}
    >
      Refer & Earn with iProEdge!
    </h1>
    <p
      style={{
        fontSize: "clamp(1rem, 2vw, 1.3rem)",
        lineHeight: 1.6,
        marginBottom: "2rem",
        textShadow: "1px 1px 4px rgba(0,0,0,0.6)",
      }}
    >
      Share iProEdge with your friends and earn rewards together!
    </p>

    <div
      style={{
        display: "inline-block",
        background: "linear-gradient(45deg, #ff6b6b, #ffa500)",
        padding: "0.8rem 1.8rem",
        borderRadius: "50px",
        fontWeight: 600,
        fontSize: "1rem",
        boxShadow: "0 4px 15px rgba(255, 107, 107, 0.3)",
      }}
    >
      🎁 Earn ₦500 for every successful referral
    </div>
  </div>
</div>


      {/* How It Works */}
      <Container className="py-5">
        <h2 className="text-center mb-3" style={{ fontWeight: "700" }}>
          How It Works
        </h2>
        <p className="text-center mb-5 text-muted">
          Just three simple steps to start earning rewards
        </p>
        <Row className="g-4">
          {[
            {
              icon: "📤",
              title: "Share Your Code",
              text: "Get your unique referral code and send it to your friends.",
            },
            {
              icon: "🛍️",
              title: "Friend Shops",
              text: "Your friend uses your code and gets ₦500 off their first order.",
            },
            {
              icon: "💰",
              title: "You Get Rewarded",
              text: "You get ₦500 off your next order for each successful referral.",
            },
          ].map((item, idx) => (
            <Col md={4} key={idx}>
              <div
                style={cardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = cardHoverStyle.transform;
                  e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = cardStyle.transform || "";
                  e.currentTarget.style.boxShadow = cardStyle.boxShadow;
                }}
              >
                <Card className="h-100 text-center" style={{ borderRadius: "20px", border: "none", background: "#f8f9fa" }}>
                  <Card.Body>
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{item.icon}</div>
                    <Card.Title style={{ fontWeight: "700", color: "#4a5568" }}>{item.title}</Card.Title>
                    <Card.Text style={{ color: "#6c757d" }}>{item.text}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Referral Code Section */}
      <Container className="py-5">
        {user ? (
          <div
            style={{
              background: "linear-gradient(145deg, #f7fafc 0%, #edf2f7 100%)",
              borderRadius: "25px",
              padding: "3rem 2rem",
              boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <h3 className="mb-4" style={{ fontWeight: "700", color: "#4a5568" }}>
              Your Personal Referral Code
            </h3>
            {loading ? (
              <div>
                <Spinner animation="border" variant="primary" />
                <p className="mt-3 text-muted">Loading your referral code…</p>
              </div>
            ) : (
              <>
                <div
                  style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    padding: "1.2rem 2rem",
                    borderRadius: "15px",
                    fontSize: "1.8rem",
                    fontWeight: "800",
                    letterSpacing: "2px",
                    display: "inline-block",
                    boxShadow: "0 8px 25px rgba(102,126,234,0.3)",
                    marginBottom: "1.5rem",
                  }}
                >
                  {referralCode}
                </div>
                <div className="d-flex justify-content-center flex-wrap gap-3">
                  <Button variant="success" onClick={handleCopyCode}>
                    {copied ? "✓ Copied!" : "📋 Copy Code"}
                  </Button>
                  <Button variant="outline-success" onClick={handleWhatsAppShare}>
                    💬 Share on WhatsApp
                  </Button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div
            className="text-center"
            style={{
              background: "linear-gradient(145deg, #fed7d7 0%, #feb2b2 100%)",
              borderRadius: "20px",
              padding: "2rem",
              color: "#c53030",
              fontWeight: "600",
            }}
          >
            🔐 Please log in to access your referral code and start earning rewards!
          </div>
        )}
      </Container>

      {/* Stats Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a365d 0%, #2d3748 100%)",
          color: "white",
          padding: "3rem 0",
          marginTop: "2rem",
        }}
      >
        <Container>
          <Row className="text-center">
            {[
              { number: "₦500", label: "Per Referral" },
              { number: "₦500", label: "Friend Discount" },
              { number: "∞", label: "Unlimited Referrals" },
            ].map((stat, i) => (
              <Col md={4} key={i} className="mb-4">
                <h3 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#ffd700" }}>
                  {stat.number}
                </h3>
                <p className="text-uppercase text-light">{stat.label}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ReferralPage;
