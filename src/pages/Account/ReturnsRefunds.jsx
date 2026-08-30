import { Link } from "react-router-dom";
import { FaUndo, FaShoppingBag } from "react-icons/fa";

const ReturnsRefunds = () => {
  return (
    <div>
      <h2 className="fw-bold mb-1">
        Returns & Refunds
      </h2>

      <p className="text-muted mb-4">
        View and manage your return and refund requests.
      </p>

      <div className="text-center py-5 border rounded">
        <FaUndo size={45} className="text-muted" />

        <h4 className="mt-3">
          No return requests
        </h4>

        <p className="text-muted">
          Delivered orders that are eligible for returns can
          be requested from the order details page.
        </p>

        <Link
          to="/account/orders"
          className="btn btn-dark"
        >
          <FaShoppingBag className="me-2" />
          View Orders
        </Link>
      </div>
    </div>
  );
};

export default ReturnsRefunds;