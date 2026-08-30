import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import {
  FaUser,
  FaHeart,
  FaShoppingBag,
  FaMapMarkerAlt,
  FaWallet,
  FaCreditCard,
  FaGift,
  FaUndo,
  FaEnvelope,
  FaHeadset,
  FaSignOutAlt,
} from "react-icons/fa";

import "./AccountLayout.css";

const menuItems = [
  {
    label: "Profile",
    path: "/account",
    icon: FaUser,
    end: true,
  },
  {
    label: "My Wishlist",
    path: "/account/wishlist",
    icon: FaHeart,
  },
  {
    label: "My Orders",
    path: "/account/orders",
    icon: FaShoppingBag,
  },
  
  {
    label: "My Addresses",
    path: "/account/addresses",
    icon: FaMapMarkerAlt,
  },
  {
    label: "My Wallet",
    path: "/account/wallet",
    icon: FaWallet,
  },
  {
    label: "Payment",
    path: "/account/payments",
    icon: FaCreditCard,
  },
  {
    label: "Gift Cards",
    path: "/account/gift-cards",
    icon: FaGift,
  },
  {
    label: "Returns & Refund",
    path: "/account/return-refunds",
    icon: FaUndo,
  },
  {
    label: "Email Newsletter",
    path: "/account/email-newsletter",
    icon: FaEnvelope,
  },
  {
    label: "Support Tickets",
    path: "/account/support-ticket",
    icon: FaHeadset,
  },
];

const AccountLayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const displayName =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "Customer";

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <main className="account-page">
      <div className="container">
        <div className="account-heading">
          <h1>My Account</h1>
          <p>
            Manage your profile, orders, wishlist and account settings.
          </p>
        </div>

        <div className="account-layout">
          <aside className="account-sidebar">
            <div className="account-user">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={displayName}
                  className="account-avatar"
                />
              ) : (
                <div className="account-avatar account-avatar-fallback">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}

              <div>
                <strong>{displayName}</strong>
                <small>{user?.email}</small>
              </div>
            </div>

            <nav className="account-nav">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    className={({ isActive }) =>
                      `account-nav-link ${
                        isActive ? "active" : ""
                      }`
                    }
                  >
                    <Icon />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}

              <button
                type="button"
                className="account-nav-link account-logout"
                onClick={handleLogout}
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </nav>
          </aside>

          <section className="account-content">
            <Outlet />
          </section>
        </div>
      </div>
    </main>
  );
};

export default AccountLayout;