import { useAuth } from "../../context/AuthContext";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaShoppingBag,
  FaHeart,
  FaWallet,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();

  const name =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "Customer";

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Profile</h2>
        <p className="text-muted mb-0">
          Manage your personal account information.
        </p>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="d-flex align-items-center gap-3 mb-4">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={name}
                style={{
                  width: 75,
                  height: 75,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                className="d-flex align-items-center justify-content-center bg-dark text-white"
                style={{
                  width: 75,
                  height: 75,
                  borderRadius: "50%",
                  fontSize: 28,
                  fontWeight: 600,
                }}
              >
                {name.charAt(0).toUpperCase()}
              </div>
            )}

            <div>
              <h4 className="mb-1">{name}</h4>
              <p className="text-muted mb-0">
                iProEdge Customer
              </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <div className="border rounded p-3">
                <small className="text-muted d-block mb-1">
                  <FaUser className="me-2" />
                  Name
                </small>
                <strong>{name}</strong>
              </div>
            </div>

            <div className="col-md-6">
              <div className="border rounded p-3">
                <small className="text-muted d-block mb-1">
                  <FaEnvelope className="me-2" />
                  Email
                </small>
                <strong>{user?.email || "Not available"}</strong>
              </div>
            </div>

            <div className="col-md-6">
              <div className="border rounded p-3">
                <small className="text-muted d-block mb-1">
                  <FaPhone className="me-2" />
                  Phone
                </small>
                <strong>Not available</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-4">
          <Link
            to="/account/orders"
            className="text-decoration-none text-dark"
          >
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <FaShoppingBag size={24} />
                <h5 className="mt-3">My Orders</h5>
                <p className="text-muted mb-0">
                  View and track your orders.
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link
            to="/account/wishlist"
            className="text-decoration-none text-dark"
          >
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <FaHeart size={24} />
                <h5 className="mt-3">Wishlist</h5>
                <p className="text-muted mb-0">
                  View products you've saved.
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-4">
          <Link
            to="/account/wallet"
            className="text-decoration-none text-dark"
          >
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <FaWallet size={24} />
                <h5 className="mt-3">My Wallet</h5>
                <p className="text-muted mb-0">
                  View your referral earnings.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;