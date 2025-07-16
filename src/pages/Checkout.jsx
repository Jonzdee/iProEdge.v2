import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
  Alert,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  FaCheckCircle,
  FaTruck,
  FaStore,
  FaChevronRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../app/features/cart/cartSlice";
import { useAuth } from "../context/AuthContext"; // <-- Make sure this exists and provides user

const PICKUP_STATIONS = [
  { name: "Ikorodu Garage", fee: 600 },
  { name: "First Gate LasusTech", fee: 200 },
  { name: "Odogunyan", fee: 100 },
  { name: "Itaoluwo", fee: 200 },
  { name: "Ogijo", fee: 600 },
  { name: "Agric", fee: 800 },
  { name: "Itamaga", fee: 500 },
  { name: "Sabo", fee: 500 },
  { name: "Ebute", fee: 800 },
  { name: "Ijede Garage", fee: 1100 },
  { name: "Ipakodo", fee: 800 },
  { name: "Owutu", fee: 400 },
  { name: "Igbogbo", fee: 1100 },
  { name: "Isawo", fee: 400 },
  { name: "Gbaga", fee: 500 },
  { name: "Majidun", fee: 1200 },
  { name: "Ogolonto", fee: 700 },
  { name: "Bayeku", fee: 1800 },
  { name: "Agbede", fee: 900 },
  { name: "Solomade", fee: 800 },
  { name: "Itokin", fee: 1500 },
  { name: "Adamo", fee: 500 },
  { name: "Gberigbe", fee: 1500 },
  { name: "Ishawo Agric Axis", fee: 850 },
  { name: "Oke Ota Ona", fee: 800 },
  { name: "Oreyo", fee: 700 },
  { name: "Erunwen", fee: 650 },
  { name: "Abule Eko", fee: 650 },
  { name: "Itunmaja", fee: 500 },
  { name: "Lucky Fibre", fee: 800 },
  { name: "Oba's Palace (Ikorodu Central)", fee: 700 },
];

const PAYMENT_METHODS = [
  { value: "cod", label: "Cash on Delivery" },
  { value: "palmpay", label: "Palmpay" },
  { value: "paystack", label: "Paystack" },
  { value: "debitcard", label: "Debit Card" },
];

const initialUser = {
  name: "",
  address: "",
  phone: "",
  busStop: "",
  landmark: "",
};

const Checkout = () => {
  const { user } = useAuth(); // <-- Auth context for current user
  const [userInfo, setUserInfo] = useState(initialUser);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressForm, setAddressForm] = useState(userInfo);
  const [addressChanged, setAddressChanged] = useState(false);
  const dispatch = useDispatch();
  const { cartList } = useSelector((state) => state.cart);
  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  const promo = 100;

  const [step, setStep] = useState(1);
  const [deliveryType, setDeliveryType] = useState("");
  const [pickupStation, setPickupStation] = useState("");
  const [pickupFee, setPickupFee] = useState(0);
  const [deliveryChanged, setDeliveryChanged] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingChange, setPendingChange] = useState(null);

  // Order POST states
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState("");
  const hasPostedOrder = useRef(false);

  const navigate = useNavigate();

  // Modal handlers...
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({ ...prev, [name]: value }));
    setAddressChanged(true);
  };
  const saveNewAddress = () => {
    setShowAddressModal(false);
    setShowConfirmModal(true);
    setPendingChange("address");
  };
  const confirmAddressChange = () => {
    setUserInfo(addressForm);
    setShowConfirmModal(false);
    setAddressChanged(false);
    setPendingChange(null);
  };
  const handleDeliveryType = (type) => {
    if (type !== deliveryType) {
      setDeliveryChanged(true);
      setShowConfirmModal(true);
      setPendingChange("delivery");
      setDeliveryType(type);
      setPickupStation("");
      setPickupFee(0);
    }
  };
  const handlePickupStation = (e) => {
    const selected = PICKUP_STATIONS.find(
      (station) => station.name === e.target.value
    );
    setPickupStation(selected ? selected.name : "");
    setPickupFee(selected ? selected.fee : 0);
    setDeliveryChanged(true);
    setShowConfirmModal(true);
    setPendingChange("delivery");
  };
  const confirmDeliveryChange = () => {
    setShowConfirmModal(false);
    setDeliveryChanged(false);
    setPendingChange(null);
  };
  const handleModalConfirm = () => {
    if (pendingChange === "address") {
      confirmAddressChange();
    } else if (pendingChange === "delivery") {
      confirmDeliveryChange();
    }
  };
  const handleModalCancel = () => {
    setShowConfirmModal(false);
    setPendingChange(null);
    if (pendingChange === "address") {
      setAddressForm(userInfo);
      setAddressChanged(false);
    } else if (pendingChange === "delivery") {
      setDeliveryType("");
      setPickupStation("");
      setPickupFee(0);
      setDeliveryChanged(false);
    }
  };

  const canConfirmAddress =
    !addressChanged &&
    step === 1 &&
    userInfo.name.trim() &&
    userInfo.address.trim() &&
    userInfo.phone.trim();
  const canConfirmDelivery =
    !deliveryChanged &&
    step === 2 &&
    (deliveryType === "door" || (deliveryType === "pickup" && pickupStation));
  const canConfirmOrder = step === 3 && paymentMethod;

  // Find the station by name (bus stop)
  const selectedBusStop = PICKUP_STATIONS.find(
    (station) => station.name === userInfo.busStop
  );

  const currentDeliveryFee =
    deliveryType === "pickup"
      ? pickupStation
        ? pickupFee
        : 0
      : deliveryType === "door"
      ? selectedBusStop
        ? selectedBusStop.fee + 500 // ADD ₦500 for door delivery
        : 0
      : 0;

  // Order POST logic (robust, secure, no duplicates)
  const handleConfirmOrder = async () => {
    if (orderLoading || hasPostedOrder.current) return; // Prevent double submit
    setOrderConfirmed(true);
    setOrderLoading(true);
    setOrderError("");
    hasPostedOrder.current = true;

    // Enforce required fields
    if (deliveryType === "pickup" && !pickupStation) {
      setOrderError("Please select a pickup station for pickup delivery.");
      setOrderLoading(false);
      setOrderConfirmed(false);
      hasPostedOrder.current = false;
      return;
    }
    if (deliveryType === "door" && !userInfo.address.trim()) {
      setOrderError("Please enter a delivery address for doorstep delivery.");
      setOrderLoading(false);
      setOrderConfirmed(false);
      hasPostedOrder.current = false;
      return;
    }
    if (deliveryType === "door" && !userInfo.busStop) {
      setOrderError("Please select your nearest bus stop for door delivery.");
      setOrderLoading(false);
      setOrderConfirmed(false);
      hasPostedOrder.current = false;
      return;
    }

    try {
      if (!user || !user.getIdToken) {
        setOrderError("You must be logged in to place an order.");
        setOrderLoading(false);
        setOrderConfirmed(false);
        hasPostedOrder.current = false;
        return;
      }
      const token = await user.getIdToken();
      const orderPayload = {
        userId: user.uid,
        userName: user.displayName || user.email,
        userEmail: user.email,
        items: cartList,
        orderTotal: totalPrice + currentDeliveryFee - promo,
        paymentMethod,
        address: userInfo.address,
        landmark: userInfo.landmark,
        busStop: userInfo.busStop,
        name: userInfo.name,
        phone: userInfo.phone,
        deliveryType,
        pickupStation,
        promo,
        status: "pending",
        clientOrderId: uuidv4(),
      };

      const response = await fetch("https://iproedgeback.onrender.com/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      });
      const data = await response.json();
      setOrderLoading(false);
      if (data.success) {
        dispatch(clearCart());
        localStorage.removeItem("cartList");
        navigate("/checkout/success", {
          state: {
            cartItems: cartList,
            paymentMethod,
            orderTotal: (
              totalPrice +
              currentDeliveryFee -
              promo
            ).toLocaleString(),
            address: userInfo.address,
            name: userInfo.name,
            phone: userInfo.phone,
            deliveryType,
            pickupStation,
            promo,
            orderId: data.orderId,
          },
        });
      } else {
        setOrderError(data.error || "Order failed. Please try again.");
        setOrderConfirmed(false);
        hasPostedOrder.current = false;
      }
    } catch (err) {
      setOrderLoading(false);
      setOrderError(err.message || "Network error. Please try again.");
      setOrderConfirmed(false);
      hasPostedOrder.current = false;
    }
  };

  return (
    <section style={{ background: "#f6f9fc", minHeight: "100vh", padding: 0 }}>
      {/* Change Address Modal */}
      <Modal show={showAddressModal} onHide={() => setShowAddressModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Delivery Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                name="name"
                value={addressForm.name}
                onChange={handleAddressChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                name="phone"
                value={addressForm.phone}
                onChange={handleAddressChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Delivery Address (Street & House No.)</Form.Label>
              <Form.Control
                as="textarea"
                name="address"
                rows={2}
                value={addressForm.address}
                onChange={handleAddressChange}
              />
            </Form.Group>

            {/* NEW: Landmark */}
            <Form.Group className="mb-2">
              <Form.Label>Landmark (Optional)</Form.Label>
              <Form.Control
                name="landmark"
                value={addressForm.landmark}
                onChange={handleAddressChange}
                placeholder="e.g. Opposite Total Filling Station"
              />
            </Form.Group>

            {/* NEW: Bus Stop Dropdown */}
            <Form.Group className="mb-2">
              <Form.Label>Nearest Bus Stop</Form.Label>
              <Form.Select
                name="busStop"
                value={addressForm.busStop}
                onChange={handleAddressChange}
              >
                <option value="">-- Select Bus Stop --</option>
                {PICKUP_STATIONS.map((station) => (
                  <option key={station.name} value={station.name}>
                    {station.name} (₦{station.fee})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button className="w-100 mt-3" onClick={saveNewAddress}>
              Save Address
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Confirm Change Modal */}
      <Modal show={showConfirmModal} onHide={handleModalCancel} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Change</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pendingChange === "address"
            ? "You have changed your address. Please confirm if you want to use this new address."
            : "You have changed your delivery details. Please confirm if you want to use this new delivery method."}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleModalConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <Container fluid="md" style={{ maxWidth: 1200, padding: "32px 0" }}>
        <Row>
          {/* Main Steps */}
          <Col md={8} className="mb-4">
            {/* 1. Customer Address */}
            <Card className="mb-3">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <div
                    className="mb-1"
                    style={{ fontWeight: 600, fontSize: "1.05rem" }}
                  >
                    <FaCheckCircle
                      color={step > 1 ? "green" : "#bbb"}
                      className="me-2"
                    />{" "}
                    1. CUSTOMER ADDRESS
                  </div>
                  <div>{userInfo.name}</div>
                  <div style={{ color: "#666", fontSize: ".97rem" }}>
                    {userInfo.address} | {userInfo.phone}
                  </div>
                </div>
                <Button
                  variant="link"
                  style={{ fontWeight: 500, textDecoration: "none" }}
                  onClick={() => setShowAddressModal(true)}
                >
                  Change <FaChevronRight size={13} />
                </Button>
              </Card.Body>
              <Card.Footer className="bg-white text-end">
                {step === 1 && (
                  <Button
                    onClick={() => setStep(2)}
                    variant="warning"
                    disabled={
                      addressChanged ||
                      !userInfo.name.trim() ||
                      !userInfo.address.trim() ||
                      !userInfo.phone.trim()
                    }
                  >
                    Confirm Address & Continue
                  </Button>
                )}
                {!userInfo.name.trim() ||
                !userInfo.address.trim() ||
                !userInfo.phone.trim() ? (
                  <span
                    className="text-danger"
                    style={{ fontSize: 12, marginLeft: 8 }}
                  >
                    Please fill in all address fields.
                  </span>
                ) : addressChanged ? (
                  <span
                    className="text-danger"
                    style={{ fontSize: 12, marginLeft: 8 }}
                  >
                    Please confirm your address change first.
                  </span>
                ) : null}
              </Card.Footer>
            </Card>

            {/* 2. Delivery Details */}
            <Card
              className="mb-3"
              style={{
                opacity: step < 2 ? 0.5 : 1,
                pointerEvents: step < 2 ? "none" : "auto",
              }}
            >
              <Card.Body>
                <div
                  className="mb-3"
                  style={{ fontWeight: 600, fontSize: "1.05rem" }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: 18,
                      textAlign: "center",
                      opacity: 0.5,
                    }}
                  >
                    2
                  </span>{" "}
                  DELIVERY DETAILS
                </div>
                <div className="d-flex flex-column gap-2">
                  <Form.Check
                    type="radio"
                    id="pickup"
                    checked={deliveryType === "pickup"}
                    onChange={() => handleDeliveryType("pickup")}
                    label={
                      <>
                        <FaStore className="me-2" />
                        Pickup Station{" "}
                        <span style={{ color: "#888" }}>(see fees)</span>
                      </>
                    }
                  />
                  {deliveryType === "pickup" && (
                    <div
                      style={{
                        border: "1px solid #eee",
                        borderRadius: 8,
                        padding: 12,
                        marginBottom: 6,
                        background: "#fafafa",
                      }}
                    >
                      <Form.Group>
                        <Form.Label>Select Pickup Station</Form.Label>
                        <Form.Select
                          value={pickupStation}
                          onChange={handlePickupStation}
                        >
                          <option value="">-- Select Pickup Station --</option>
                          {PICKUP_STATIONS.map((station) => (
                            <option key={station.name} value={station.name}>
                              {station.name} (Delivery fees{" "}
                              {station.fee === 0 ? "Free" : `₦${station.fee}`})
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                      {!pickupStation && (
                        <div
                          className="mt-2"
                          style={{ fontSize: ".93rem", color: "#888" }}
                        >
                          Please select a pickup station to use this option.
                        </div>
                      )}
                      {pickupStation && (
                        <div
                          style={{
                            marginTop: 15,
                            maxHeight: 180,
                            overflowY: "auto",
                            border: "1px solid #ddd",
                            borderRadius: 6,
                            background: "#fff",
                            padding: 8,
                          }}
                        >
                          <div style={{ fontWeight: 500, marginBottom: 6 }}>
                            Your Items
                          </div>
                          {cartList.map((item) => (
                            <div
                              className="d-flex align-items-center mb-2"
                              key={item.id}
                              style={{
                                borderBottom: "1px solid #f0f0f0",
                                paddingBottom: 6,
                              }}
                            >
                              <img
                                src={item.imgUrl}
                                alt=""
                                style={{
                                  width: 36,
                                  height: 36,
                                  objectFit: "cover",
                                  marginRight: 10,
                                  borderRadius: 4,
                                }}
                              />
                              <div>
                                <div style={{ fontSize: ".97rem" }}>
                                  {item.productName}
                                </div>
                                <div
                                  style={{ color: "#999", fontSize: ".9rem" }}
                                >
                                  QTY: {item.qty}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  <Form.Check
                    type="radio"
                    id="door"
                    checked={deliveryType === "door"}
                    onChange={() => handleDeliveryType("door")}
                    label={
                      <>
                        <FaTruck className="me-2" /> Door Delivery{" "}
                        <span style={{ color: "#888" }}>
                          {selectedBusStop
                            ? `(₦${selectedBusStop.fee + 500})`
                            : "(Select bus stop to see fee)"}
                        </span>
                      </>
                    }
                  />

                  {deliveryType === "door" && (
                    <div style={{ marginTop: 10 }}>
                      <Row>
                        <Col sm={12}>
                          <Card style={{ border: "1px solid #eee" }}>
                            <Card.Body>
                              <div style={{ fontWeight: 500, marginBottom: 4 }}>
                                Door Delivery
                              </div>
                              <div
                                style={{ fontSize: ".93rem", color: "#555" }}
                              >
                                Delivery between <b>25 June</b> and{" "}
                                <b>27 June</b>.
                              </div>
                              {cartList.map((item, idx) => (
                                <div
                                  className="d-flex mt-2 align-items-center"
                                  key={item.id}
                                >
                                  <img
                                    src={item.imgUrl}
                                    alt=""
                                    style={{
                                      width: 40,
                                      height: 40,
                                      objectFit: "cover",
                                      marginRight: 8,
                                      borderRadius: 4,
                                    }}
                                  />
                                  <div>
                                    <div style={{ fontSize: ".93rem" }}>
                                      {item.productName}
                                    </div>
                                    <div
                                      style={{
                                        color: "#999",
                                        fontSize: ".9rem",
                                      }}
                                    >
                                      QTY: {item.qty}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  )}
                </div>
              </Card.Body>
              <Card.Footer className="bg-white text-end">
                {step === 2 && (
                  <Button
                    variant="warning"
                    disabled={!canConfirmDelivery}
                    onClick={() => setStep(3)}
                  >
                    Confirm Delivery & Continue
                  </Button>
                )}
                {deliveryChanged && (
                  <span
                    className="text-danger"
                    style={{ fontSize: 12, marginLeft: 8 }}
                  >
                    Please confirm your delivery change first.
                  </span>
                )}
              </Card.Footer>
            </Card>

            {/* 3. Payment Method */}
            <Card
              style={{
                opacity: step < 3 ? 0.5 : 1,
                pointerEvents: step < 3 ? "none" : "auto",
              }}
            >
              <Card.Body>
                <div
                  className="mb-3"
                  style={{ fontWeight: 600, fontSize: "1.05rem" }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: 18,
                      textAlign: "center",
                    }}
                  >
                    3
                  </span>{" "}
                  PAYMENT METHOD
                </div>
                <Form>
                  {PAYMENT_METHODS.map((mtd) => (
                    <Form.Check
                      key={mtd.value}
                      type="radio"
                      id={mtd.value}
                      name="paymentMethod"
                      label={
                        <>
                          {mtd.label}
                          {(mtd.value === "paystack" ||
                            mtd.value === "debitcard") && (
                            <span
                              style={{
                                color: "#c00",
                                marginLeft: 8,
                                fontSize: 12,
                              }}
                            >
                              (Currently unavailable)
                            </span>
                          )}
                        </>
                      }
                      value={mtd.value}
                      checked={paymentMethod === mtd.value}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      style={{ marginBottom: 10 }}
                      disabled={
                        mtd.value === "paystack" || mtd.value === "debitcard"
                      }
                    />
                  ))}
                </Form>
              </Card.Body>
            </Card>
            <div className="mt-3">
              <Button
                variant="link"
                style={{ fontWeight: 500, textDecoration: "none" }}
                onClick={() => navigate("/shop")}
              >
                &larr; Go back &amp; continue shopping
              </Button>
            </div>
            {orderLoading && (
              <Alert className="mt-3" variant="info">
                Placing order...
              </Alert>
            )}
            {orderError && (
              <Alert className="mt-3" variant="danger">
                {orderError}
              </Alert>
            )}
          </Col>

          {/* Order Summary */}
          <Col md={4}>
            <Card>
              <Card.Body>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "1.08rem",
                    marginBottom: 18,
                  }}
                >
                  Order summary
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Item's total ({cartList.length})</span>
                  <span>₦ {totalPrice.toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Delivery fees</span>
                  <span>
                    {deliveryType === "pickup" && pickupStation
                      ? pickupFee === 0
                        ? "Free"
                        : `₦${pickupFee}`
                      : deliveryType === "door"
                      ? selectedBusStop
                        ? `₦${selectedBusStop.fee + 500}`
                        : "--"
                      : "--"}
                  </span>
                </div>
                <div
                  className="d-flex justify-content-between mb-2"
                  style={{ color: "#00b060" }}
                >
                  <span>Promo Discount</span>
                  <span>-₦ {promo.toLocaleString()}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <span style={{ fontWeight: 600, fontSize: "1.08rem" }}>
                    Total
                  </span>
                  <span
                    style={{
                      fontWeight: 700,
                      color: "#0f3460",
                      fontSize: "1.2rem",
                    }}
                  >
                    ₦{" "}
                    {(totalPrice + currentDeliveryFee - promo).toLocaleString()}
                  </span>
                </div>
                <Alert variant="secondary" style={{ fontSize: ".97rem" }}>
                  You will be able to add a voucher when selecting your payment
                  method.
                </Alert>
                <Button
                  className="checkout-btn w-100"
                  variant="success"
                  disabled={!canConfirmOrder || orderLoading}
                  style={{ marginTop: 10 }}
                  onClick={handleConfirmOrder}
                >
                  {orderConfirmed ? "Processing..." : "Confirm order"}
                </Button>
                <div
                  className="small text-center mt-1 text-muted"
                  style={{ fontSize: ".92rem" }}
                >
                  (Complete the steps in order to proceed)
                </div>
                <div
                  className="mt-3 text-center"
                  style={{ fontSize: ".85rem", color: "#888" }}
                >
                  By proceeding, you are automatically accepting the{" "}
                  <a href="/" target="_blank" rel="noopener noreferrer">
                    Terms &amp; Conditions
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Checkout;
