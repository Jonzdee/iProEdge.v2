import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

const Addresses = () => {
  const [addresses, setAddresses] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("iproedge_addresses")
      ) || [];
    } catch {
      return [];
    }
  });

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAddress = {
      id: Date.now(),
      ...form,
    };

    const updated = [...addresses, newAddress];

    setAddresses(updated);

    localStorage.setItem(
      "iproedge_addresses",
      JSON.stringify(updated)
    );

    setForm({
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
    });

    setShowModal(false);
  };

  const removeAddress = (id) => {
    const updated = addresses.filter(
      (address) => address.id !== id
    );

    setAddresses(updated);

    localStorage.setItem(
      "iproedge_addresses",
      JSON.stringify(updated)
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-start gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1">My Addresses</h2>
          <p className="text-muted mb-0">
            Manage your delivery addresses.
          </p>
        </div>

        <Button
          variant="dark"
          onClick={() => setShowModal(true)}
        >
          <FaPlus className="me-2" />
          Add Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-5 border rounded">
          <FaMapMarkerAlt
            size={42}
            className="text-muted"
          />

          <h4 className="mt-3">
            No saved addresses
          </h4>

          <p className="text-muted">
            Add an address to make checkout faster.
          </p>
        </div>
      ) : (
        <div className="row g-3">
          {addresses.map((address) => (
            <div
              className="col-md-6"
              key={address.id}
            >
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="fw-bold">
                      {address.name}
                    </h5>

                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() =>
                        removeAddress(address.id)
                      }
                    >
                      <FaTrash />
                    </button>
                  </div>

                  <p className="mb-1">
                    {address.phone}
                  </p>

                  <p className="text-muted mb-0">
                    {address.address}
                    <br />
                    {address.city}, {address.state}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
      >
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
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>

            <Button type="submit" variant="dark">
              Save Address
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Addresses;