import { useEffect, useState } from "react";
import { Outlet, Navigate, Link, useLocation } from "react-router-dom";
import { Spinner, Nav } from "react-bootstrap";
import { FaBoxOpen, FaWallet, FaUsers } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const AdminLayout = () => {
  const { user } = useAuth();
  const location = useLocation();

  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        setChecking(false);
        return;
      }

      try {
        // forceRefresh so a just-granted claim takes effect
        // without needing a manual logout/login.
        const tokenResult = await user.getIdTokenResult(true);
        setIsAdmin(!!tokenResult.claims.admin);
      } catch (err) {
        console.error("Admin check failed:", err);
        setIsAdmin(false);
      } finally {
        setChecking(false);
      }
    };

    checkAdmin();
  }, [user]);

  if (checking) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  const navItems = [
    { to: "/admin/orders", label: "Orders", icon: <FaBoxOpen /> },
    { to: "/admin/withdrawals", label: "Withdrawals", icon: <FaWallet /> },
    { to: "/admin/users", label: "Users", icon: <FaUsers /> },
  ];

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <div
        className="bg-dark text-white p-3"
        style={{ width: 220, flexShrink: 0 }}
      >
        <h5 className="fw-bold mb-4">iProEdge Admin</h5>

        <Nav className="flex-column gap-1">
          {navItems.map((item) => (
            <Nav.Link
              key={item.to}
              as={Link}
              to={item.to}
              className={`text-white d-flex align-items-center gap-2 rounded px-2 py-2 ${
                location.pathname === item.to ? "bg-secondary" : ""
              }`}
            >
              {item.icon}
              {item.label}
            </Nav.Link>
          ))}
        </Nav>
      </div>

      <div className="flex-grow-1 p-4" style={{ background: "#f6f9fc" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
