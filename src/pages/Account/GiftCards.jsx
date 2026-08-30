
import { useState } from "react";
import {
  FaGift,
  FaPaperPlane,
  FaWallet,
  FaHistory,
  FaArrowRight,
} from "react-icons/fa";
import "./GiftCards.css";

const giftAmounts = [10000, 25000, 50000, 100000];

const GiftCards = () => {
  const [selectedAmount, setSelectedAmount] = useState(50000);
  const [customAmount, setCustomAmount] = useState("");
  const [recipientType, setRecipientType] = useState("email");

  const amount =
    customAmount && Number(customAmount) > 0
      ? Number(customAmount)
      : selectedAmount;

  return (
    <div className="gift-card-page">
      {/* Header */}
      <div className="gift-card-heading">
        <div>
          <h2>Gift Cards</h2>
          <p>
            Send an iProEdge gift card to someone special.
          </p>
        </div>

        <div className="gift-card-balance">
          <FaWallet />
          <div>
            <small>My Gift Card Balance</small>
            <strong>₦0</strong>
          </div>
        </div>
      </div>

      {/* Main Purchase Area */}
      <div className="gift-card-grid">
        {/* Left */}
        <div className="gift-card-form-card">
          <div className="gift-card-section-title">
            <span>1</span>
            <div>
              <h4>Choose an amount</h4>
              <p>Select how much you want to send.</p>
            </div>
          </div>

          <div className="gift-amount-grid">
            {giftAmounts.map((value) => (
              <button
                type="button"
                key={value}
                className={
                  selectedAmount === value &&
                  !customAmount
                    ? "gift-amount active"
                    : "gift-amount"
                }
                onClick={() => {
                  setSelectedAmount(value);
                  setCustomAmount("");
                }}
              >
                <FaGift />
                <strong>
                  ₦{value.toLocaleString()}
                </strong>
              </button>
            ))}
          </div>

          <div className="custom-amount">
            <label>Custom amount</label>

            <div className="custom-amount-input">
              <span>₦</span>
              <input
                type="number"
                min="1000"
                placeholder="Enter amount"
                value={customAmount}
                onChange={(e) =>
                  setCustomAmount(e.target.value)
                }
              />
            </div>

            <small>
              Minimum gift card value is ₦1,000.
            </small>
          </div>

          {/* Recipient */}
          <div className="gift-card-section-title recipient-title">
            <span>2</span>
            <div>
              <h4>Who are you sending it to?</h4>
              <p>
                Enter the recipient's delivery details.
              </p>
            </div>
          </div>

          <div className="recipient-switch">
            <button
              type="button"
              className={
                recipientType === "email"
                  ? "active"
                  : ""
              }
              onClick={() => setRecipientType("email")}
            >
              Email
            </button>

            <button
              type="button"
              className={
                recipientType === "phone"
                  ? "active"
                  : ""
              }
              onClick={() => setRecipientType("phone")}
            >
              Phone
            </button>
          </div>

          <div className="gift-form-group">
            <label>Recipient name</label>
            <input
              type="text"
              placeholder="Enter recipient's name"
            />
          </div>

          <div className="gift-form-group">
            <label>
              Recipient{" "}
              {recipientType === "email"
                ? "email"
                : "phone number"}
            </label>

            <input
              type={
                recipientType === "email"
                  ? "email"
                  : "tel"
              }
              placeholder={
                recipientType === "email"
                  ? "example@email.com"
                  : "0801 234 5678"
              }
            />
          </div>

          {/* Message */}
          <div className="gift-card-section-title recipient-title">
            <span>3</span>
            <div>
              <h4>Add a message</h4>
              <p>
                Make your gift a little more personal.
              </p>
            </div>
          </div>

          <div className="gift-form-group">
            <label>Personal message</label>

            <textarea
              rows="4"
              maxLength="200"
              placeholder="Happy Birthday! Enjoy your gift..."
            />

            <small>
              Optional · Maximum 200 characters
            </small>
          </div>

          <button
            type="button"
            className="gift-buy-button"
          >
            <FaPaperPlane />
            Buy & Send Gift Card
            <FaArrowRight />
          </button>
        </div>

        {/* Right Preview */}
        <div className="gift-card-preview-column">
          <div className="gift-preview-label">
            Gift Card Preview
          </div>

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

              <strong>
                ₦{Number(amount || 0).toLocaleString()}
              </strong>

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

          {/* Summary */}
          <div className="gift-summary">
            <h4>Gift Card Summary</h4>

            <div className="summary-row">
              <span>Gift card value</span>
              <strong>
                ₦{Number(amount || 0).toLocaleString()}
              </strong>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <strong>Free</strong>
            </div>

            <div className="summary-divider" />

            <div className="summary-total">
              <span>Total</span>
              <strong>
                ₦{Number(amount || 0).toLocaleString()}
              </strong>
            </div>
          </div>

          {/* Info */}
          <div className="gift-info">
            <FaGift />

            <div>
              <strong>How it works</strong>

              <p>
                Choose an amount, enter the recipient's
                details and complete your purchase. The
                recipient can redeem the gift card on
                iProEdge and use its balance toward their
                purchase.
              </p>
            </div>
          </div>

          {/* History */}
          <button
            type="button"
            className="gift-history-button"
          >
            <FaHistory />
            View Gift Card History
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GiftCards;
