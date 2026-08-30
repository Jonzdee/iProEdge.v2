import { Link } from "react-router-dom";
import { FaHeart, FaShoppingBag } from "react-icons/fa";

const Wishlist = () => {
  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold mb-1">My Wishlist</h2>
        <p className="text-muted mb-0">
          Products you save for later will appear here.
        </p>
      </div>

      <div className="text-center py-5 border rounded">
        <FaHeart size={45} className="text-muted" />

        <h4 className="mt-3">Your wishlist is empty</h4>

        <p className="text-muted">
          Save products you love and come back to them later.
        </p>

        <Link to="/shop" className="btn btn-dark">
          <FaShoppingBag className="me-2" />
          Browse Products
        </Link>
      </div>
    </div>
  );
};

export default Wishlist;