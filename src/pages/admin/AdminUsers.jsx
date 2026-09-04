import { useEffect, useState } from "react";
import { Badge, Button, Spinner, Alert, Table, Form } from "react-bootstrap";
import { FaSync, FaUserShield, FaBan, FaCheckCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminUsers = () => {
  const { user } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [actionLoadingUid, setActionLoadingUid] = useState(null);

  const fetchUsers = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError("");

      const token = await user.getIdToken();

      const response = await fetch(`${API_BASE_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to load users.");
      }

      setUsers(data.users || []);
    } catch (err) {
      setError(err.message || "Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const toggleAdmin = async (uid, makeAdmin) => {
    if (uid === user.uid && !makeAdmin) {
      const confirmed = window.confirm(
        "You're about to remove your own admin access. Continue?",
      );
      if (!confirmed) return;
    }

    try {
      setActionLoadingUid(uid);

      const token = await user.getIdToken();

      const response = await fetch(`${API_BASE_URL}/admin/users/${uid}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ admin: makeAdmin }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to update role.");
      }

      await fetchUsers();
    } catch (err) {
      alert(err.message || "Failed to update role.");
    } finally {
      setActionLoadingUid(null);
    }
  };

  const toggleBan = async (uid, disable) => {
    const confirmed = window.confirm(
      disable ? "Ban this user?" : "Unban this user?",
    );
    if (!confirmed) return;

    try {
      setActionLoadingUid(uid);

      const token = await user.getIdToken();

      const response = await fetch(
        `${API_BASE_URL}/admin/users/${uid}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ disabled: disable }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to update user status.");
      }

      await fetchUsers();
    } catch (err) {
      alert(err.message || "Failed to update user status.");
    } finally {
      setActionLoadingUid(null);
    }
  };

  const filteredUsers = users.filter((u) => {
    const term = search.toLowerCase();
    return (
      u.email?.toLowerCase().includes(term) ||
      u.displayName?.toLowerCase().includes(term)
    );
  });

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <h3 className="fw-bold mb-0">Users</h3>

        <div className="d-flex gap-2">
          <Form.Control
            size="sm"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 240 }}
          />

          <Button size="sm" variant="outline-dark" onClick={fetchUsers}>
            <FaSync />
          </Button>
        </div>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : filteredUsers.length === 0 ? (
        <Alert variant="info">No users found.</Alert>
      ) : (
        <div className="table-responsive">
          <Table hover className="bg-white">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Wallet</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.uid}>
                  <td>{u.displayName || "—"}</td>
                  <td>{u.email}</td>
                  <td>₦{Number(u.walletBalance || 0).toLocaleString()}</td>
                  <td>
                    {u.isAdmin ? (
                      <Badge bg="dark">Admin</Badge>
                    ) : (
                      <Badge bg="secondary">User</Badge>
                    )}
                  </td>
                  <td>
                    {u.disabled ? (
                      <Badge bg="danger">Banned</Badge>
                    ) : (
                      <Badge bg="success">Active</Badge>
                    )}
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        size="sm"
                        variant={u.isAdmin ? "outline-dark" : "dark"}
                        disabled={actionLoadingUid === u.uid}
                        onClick={() => toggleAdmin(u.uid, !u.isAdmin)}
                        title={u.isAdmin ? "Remove admin" : "Make admin"}
                      >
                        <FaUserShield />
                      </Button>

                      <Button
                        size="sm"
                        variant={
                          u.disabled ? "outline-success" : "outline-danger"
                        }
                        disabled={actionLoadingUid === u.uid}
                        onClick={() => toggleBan(u.uid, !u.disabled)}
                        title={u.disabled ? "Unban" : "Ban"}
                      >
                        {u.disabled ? <FaCheckCircle /> : <FaBan />}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
