
import { useState } from "react";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { FaBell, FaPaperPlane } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const AdminNotifications = () => {
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !message.trim()) {
      return;
    }

    if (!user) {
      setError("You must be logged in as an admin.");
      return;
    }

    setSending(true);
    setSent(false);
    setError("");

    try {
      // Get Firebase authentication token
      const token = await user.getIdToken();

      // Send notification request to backend
      const response = await fetch(
        "http://localhost:3001/admin/notifications/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: title.trim(),
            message: message.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to send notification."
        );
      }

      console.log("Notification result:", data);

      // Show success message
      setSent(true);

      // Clear form
      setTitle("");
      setMessage("");
    } catch (error) {
      console.error("Notification error:", error);

      setError(
        error.message || "Failed to send notification."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-4">
        <h2 className="fw-bold">
          <FaBell className="me-2" />
          Send Notification
        </h2>

        <p className="text-muted mb-0">
          Send a notification message to your iProEdge customers.
        </p>
      </div>

      {/* Success Message */}
      {sent && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setSent(false)}
        >
          Notification sent successfully!
        </Alert>
      )}

      {/* Error Message */}
      {error && (
        <Alert
          variant="danger"
          dismissible
          onClose={() => setError("")}
        >
          {error}
        </Alert>
      )}

      {/* Notification Form */}
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            {/* Title */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">
                Notification Title
              </Form.Label>

              <Form.Control
                type="text"
                placeholder="e.g. New iPhones Just Arrived!"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={100}
                disabled={sending}
              />

              <Form.Text className="text-muted">
                Keep the title short and attention-grabbing.
              </Form.Text>
            </Form.Group>

            {/* Message */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">
                Notification Message
              </Form.Label>

              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Write your notification message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={500}
                disabled={sending}
              />

              <Form.Text className="text-muted">
                {message.length}/500 characters
              </Form.Text>
            </Form.Group>

            {/* Audience */}
            <div className="bg-light rounded p-3 mb-4">
              <div className="fw-semibold mb-1">
                <FaBell className="me-2" />
                Audience
              </div>

              <div className="text-muted">
                All customers who have enabled notifications.
              </div>
            </div>

            {/* Send Button */}
            <Button
              type="submit"
              variant="dark"
              className="px-4"
              disabled={
                !title.trim() ||
                !message.trim() ||
                sending
              }
            >
              {sending ? (
                <>
                  <Spinner
                    animation="border"
                    size="sm"
                    className="me-2"
                  />
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane className="me-2" />
                  Send Notification
                </>
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminNotifications;

