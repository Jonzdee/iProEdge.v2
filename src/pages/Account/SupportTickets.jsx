import { useState } from "react";
import {
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import {
  FaHeadset,
  FaWhatsapp,
} from "react-icons/fa";

const SupportTickets = () => {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    const adminPhone = "2348063856166";

    const whatsappMessage = `Hello iProEdge Support,

I need assistance with:

${message}`;

    window.open(
      `https://wa.me/${adminPhone}?text=${encodeURIComponent(
        whatsappMessage
      )}`,
      "_blank"
    );

    setSent(true);
    setMessage("");
  };

  return (
    <div>
      <h2 className="fw-bold mb-1">
        Support Tickets
      </h2>

      <p className="text-muted mb-4">
        Contact iProEdge support when you need assistance.
      </p>

      {sent && (
        <Alert variant="success">
          Your support request has been opened in WhatsApp.
        </Alert>
      )}

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <FaHeadset size={30} />

          <h5 className="fw-bold mt-3">
            How can we help?
          </h5>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>
                Describe your issue
              </Form.Label>

              <Form.Control
                as="textarea"
                rows={5}
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                placeholder="Tell us what you need help with..."
                required
              />
            </Form.Group>

            <Button
              type="submit"
              variant="success"
            >
              <FaWhatsapp className="me-2" />
              Contact Support
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SupportTickets;