import { FaCreditCard, FaShieldAlt } from "react-icons/fa";

const Payments = () => {
  return (
    <div>
      <h2 className="fw-bold mb-1">Payment</h2>

      <p className="text-muted mb-4">
        Manage your payment preferences.
      </p>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <FaCreditCard size={30} />

          <h5 className="fw-bold mt-3">
            Secure Payments
          </h5>

          <p className="text-muted">
            iProEdge supports secure checkout and payment
            methods including Paystack, debit card and other
            available payment options.
          </p>

          <div className="alert alert-light border mb-0">
            <FaShieldAlt className="me-2" />
            Your card information should never be stored
            directly in this account page.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;