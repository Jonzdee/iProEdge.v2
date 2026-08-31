import { useEffect, useState } from "react";
import { Button, Form, Modal, Alert } from "react-bootstrap";
import { FaMapMarkerAlt, FaPlus, FaTrash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";

// Kept in sync with the list in Checkout.jsx — consider moving this to a
// shared constants file (e.g. src/constants/pickupStations.js) so the two
// never drift apart.
const PICKUP_STATIONS = [
  { name: "Ikorodu Garage", fee: 300 },
  { name: "First Gate LasusTech", fee: 100 },
  { name: "Odogunyan", fee: 0 },
  { name: "Itaoluwo", fee: 100 },
  { name: "Ogijo", fee: 300 },
  { name: "Agric", fee: 500 },
  { name: "Itamaga", fee: 400 },
  { name: "Sabo", fee: 300 },
  { name: "Ebute", fee: 500 },
  { name: "Ijede Garage", fee: 1100 },
  { name: "Ipakodo", fee: 800 },
  { name: "Owutu", fee: 700 },
  { name: "Igbogbo", fee: 900 },
  { name: "Isawo", fee: 1200 },
  { name: "Gbaga", fee: 700 },
  { name: "Majidun", fee: 900 },
  { name: "Ogolonto", fee: 700 },
  { name: "Bayeku", fee: 1500 },
  { name: "Agbede", fee: 1100 },
  { name: "Solomade", fee: 800 },
  { name: "Itokin", fee: 1500 },
  { name: "Adamo", fee: 800 },
  { name: "Gberigbe", fee: 1500 },
  { name: "Ishawo Agric", fee: 850 },
  { name: "Ota Ona", fee: 800 },
  { name: "Oreyo", fee: 700 },
  { name: "Erunwen", fee: 650 },
  { name: "Abule Eko", fee: 650 },
  { name: "Itunmaja", fee: 500 },
  { name: "Lucky Fibre", fee: 800 },
  { name: "Oba's Palace (Ikorodu Central)", fee: 500 },
  { name: "Mile 12", fee: 900 },
  { name: "Ketu", fee: 900 },
  { name: "Ojota", fee: 900 },
  { name: "MaryLand", fee: 900 },
  { name: "Fakale", fee: 700 },
];

const initialForm = {
  name: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  landmark: "",
  busStop: "",
};

const Addresses = () => {
  const { user } = useAuth();

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [removingId, setRemovingId] = useState(null);

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (!user) return;

    const loadAddresses = async () => {
      try {
        const addressesRef = collection(db, "users", user.uid, "addresses");
        const q = query(addressesRef, orderBy("createdAt", "desc"));
        const snap = await getDocs(q);

        setAddresses(
          snap.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })),
        );
      } catch (err) {
        console.error("Unable to load saved addresses:", err);
        setError("Could not load your saved addresses. Please refresh.");
      } finally {
        setLoading(false);
      }
    };

    loadAddresses();
  }, [user]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setError(null);

    const newAddress = {
      ...form,
      createdAt: new Date().toISOString(),
    };

    try {
      const addressesRef = collection(db, "users", user.uid, "addresses");
      const docRef = await addDoc(addressesRef, newAddress);

      setAddresses((prev) => [{ id: docRef.id, ...newAddress }, ...prev]);
      setForm(initialForm);
      setShowModal(false);
    } catch (err) {
      console.error("Unable to save address:", err);
      setError("Could not save this address. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const removeAddress = async (id) => {
    if (!user) return;
    setRemovingId(id);
    setError(null);

    try {
      await deleteDoc(doc(db, "users", user.uid, "addresses", id));
      setAddresses((prev) => prev.filter((address) => address.id !== id));
    } catch (err) {
      console.error("Unable to remove address:", err);
      setError("Could not remove this address. Please try again.");
    } finally {
      setRemovingId(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5 text-muted">
        Loading your addresses...
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-start gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">My Addresses</h2>
          <p className="text-muted mb-0">Manage your delivery addresses.</p>
        </div>

        <Button variant="dark" onClick={() => setShowModal(true)}>
          <FaPlus className="me-2" />
          Add Address
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {addresses.length === 0 ? (
        <div className="text-center py-5 border rounded">
          <FaMapMarkerAlt size={42} className="text-muted" />

          <h4 className="mt-3">No saved addresses</h4>

          <p className="text-muted">Add an address to make checkout faster.</p>
        </div>
      ) : (
        <div className="row g-3">
          {addresses.map((address) => (
            <div className="col-md-6" key={address.id}>
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="fw-bold">{address.name}</h5>

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeAddress(address.id)}
                      disabled={removingId === address.id}
                    >
                      <FaTrash />
                    </button>
                  </div>

                  <p className="mb-1">{address.phone}</p>

                  <p className="text-muted mb-1">
                    {address.address}
                    <br />
                    {address.city}, {address.state}
                  </p>

                  {(address.busStop || address.landmark) && (
                    <p className="text-muted small mb-0">
                      {address.busStop && <>Bus stop: {address.busStop}</>}
                      {address.busStop && address.landmark && " · "}
                      {address.landmark && <>Landmark: {address.landmark}</>}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Delivery Address</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="address"
                value={form.address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="row">
              <div className="col-6">
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </div>

              <div className="col-6">
                <Form.Group className="mb-3">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Landmark (Optional)</Form.Label>
              <Form.Control
                name="landmark"
                value={form.landmark}
                onChange={handleChange}
                placeholder="e.g. Opposite Total Filling Station"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nearest Bus Stop</Form.Label>
              <Form.Select
                name="busStop"
                value={form.busStop}
                onChange={handleChange}
              >
                <option value="">-- Select Bus Stop --</option>
                {PICKUP_STATIONS.map((station) => (
                  <option key={station.name} value={station.name}>
                    {station.name} (₦{station.fee})
                  </option>
                ))}
              </Form.Select>
              <Form.Text className="text-muted">
                Used to prefill door-delivery fees at checkout.
              </Form.Text>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowModal(false)}
              disabled={saving}
            >
              Cancel
            </Button>

            <Button type="submit" variant="dark" disabled={saving}>
              {saving ? "Saving..." : "Save Address"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Addresses;
