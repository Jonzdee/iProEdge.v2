import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ReferralAd = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "2rem 1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem",
          background: "linear-gradient(135deg, #1a1a1a, #444)",
          borderRadius: "20px",
          color: "#fff",
          boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
          padding: "1.5rem",
          maxWidth: "800px",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {/* Text section */}
        <div style={{ flex: "1 1 250px", minWidth: 0 }}>
          <h2
            style={{
              fontWeight: "900",
              fontSize: "clamp(1.3rem, 2.5vw, 2rem)",
              marginBottom: "0.8rem",
              lineHeight: 1.3,
            }}
          >
            🎁 Earn ₦500 For Every Friend You Refer!
          </h2>
          <p
            style={{
              fontSize: "0.95rem",
              opacity: 0.9,
              marginBottom: "1.2rem",
              lineHeight: 1.6,
            }}
          >
            Share iProEdge with your friends today. They get ₦500 off, and you
            earn ₦500 for every successful referral. It’s that simple!
          </p>
          <Button
            onClick={() => navigate("/refer")}
            style={{
              background: "linear-gradient(45deg, #ffd700, #ff7e5f)",
              border: "none",
              padding: "0.6rem 1.6rem",
              borderRadius: "50px",
              fontWeight: "700",
              fontSize: "0.95rem",
              color: "#222",
              boxShadow: "0 6px 15px rgba(255,215,0,0.4)",
            }}
          >
            Start Referring Now
          </Button>
        </div>

        {/* ₦500 badge section (hidden on small screens) */}
        <div
          className="d-none d-md-flex"
          style={{
            flexShrink: 0,
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "15px",
            height: "140px",
            width: "140px",
            fontSize: "2.2rem",
            fontWeight: "bold",
            color: "#ffd700",
            border: "3px dashed rgba(255,255,255,0.3)",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "0.5rem",
          }}
        >
          ₦500
        </div>
      </div>
    </div>
  );
};

export default ReferralAd;
