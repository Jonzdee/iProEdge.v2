import { FaGift, FaEnvelope, FaWallet, FaCheckCircle } from "react-icons/fa";
import "./GiftCards.css";

const upcomingFeatures = [
  {
    icon: <FaGift />,
    text: "Buy in any amount, starting from ₦1,000",
  },
  {
    icon: <FaEnvelope />,
    text: "Send instantly by email or phone number",
  },
  {
    icon: <FaWallet />,
    text: "Recipient redeems it straight to their iProEdge balance",
  },
  {
    icon: <FaCheckCircle />,
    text: "Balance applies automatically at checkout — no codes to remember",
  },
];

const GiftCards = () => {
  return (
    <div className="gift-card-page">
      {/* Header */}
      <div className="gift-card-heading">
        <div>
          <h2>Gift Cards</h2>
          <p>Send an iProEdge gift card to someone special.</p>
        </div>

        <div className="gift-card-balance">
          <FaWallet />
          <div>
            <small>Coming Soon</small>
            <strong>🎁</strong>
          </div>
        </div>
      </div>

      <div className="gift-card-grid">
        {/* Left: coming soon messaging */}
        <div className="gift-card-form-card">
          <div className="gift-card-section-title">
            <span>🎁</span>
            <div>
              <h4>iProEdge Gift Cards — Launching Soon</h4>
              <p>
                Soon you'll be able to buy a gift card and send it straight to
                anyone — a friend, family member, or that person who's
                impossible to shop for. They redeem it in seconds and shop for
                exactly what they want, on us.
              </p>
            </div>
          </div>

          <div className="gift-form-group">
            <label>What to expect</label>

            <ul className="list-unstyled mt-2">
              {upcomingFeatures.map((feature, index) => (
                <li key={index} className="d-flex align-items-start gap-2 mb-3">
                  <span className="text-dark mt-1">{feature.icon}</span>
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <small className="text-muted">
            We're putting the finishing touches on it now. Check back soon.
          </small>
        </div>

        {/* Right: preview card, kept as-is */}
        <div className="gift-card-preview-column">
          <div className="gift-preview-label">Gift Card Preview</div>

          <div className="gift-card-visual">
            <div className="gift-card-pattern pattern-one" />
            <div className="gift-card-pattern pattern-two" />

            <div className="gift-card-logo">
              iPro<span>Edge</span>
            </div>

            <div className="gift-card-icon">
              <FaGift />
            </div>

            <div className="gift-card-visual-text">
              <small>GIFT CARD</small>

              <strong>Coming Soon</strong>

              <p>
                Give them the freedom
                <br />
                to choose what they love.
              </p>
            </div>

            <div className="gift-card-footer">
              <span>iProEdge</span>
              <span>Digital Gift Card</span>
            </div>
          </div>

          {/* Info */}
          <div className="gift-info">
            <FaGift />

            <div>
              <strong>How it will work</strong>

              <p>
                Choose an amount, enter the recipient's details and complete
                your purchase. The recipient can redeem the gift card on
                iProEdge and use its balance toward their purchase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCards;
