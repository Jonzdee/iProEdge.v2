import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { FaEnvelope } from "react-icons/fa";

const EmailNewsletter = () => {
  const [enabled, setEnabled] = useState(() => {
    return (
      localStorage.getItem(
        "iproedge_newsletter"
      ) === "true"
    );
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem(
      "iproedge_newsletter",
      String(enabled)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div>
      <h2 className="fw-bold mb-1">
        Email Newsletter
      </h2>

      <p className="text-muted mb-4">
        Manage your email communication preferences.
      </p>

      {saved && (
        <Alert variant="success">
          Newsletter preference saved.
        </Alert>
      )}

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <FaEnvelope size={30} />

          <h5 className="fw-bold mt-3">
            iProEdge Newsletter
          </h5>

          <p className="text-muted">
            Receive product updates, offers and important
            store information.
          </p>

          <Form.Check
            type="switch"
            id="newsletter-switch"
            label="Subscribe to the iProEdge newsletter"
            checked={enabled}
            onChange={(e) =>
              setEnabled(e.target.checked)
            }
          />

          <Button
            variant="dark"
            className="mt-4"
            onClick={handleSave}
          >
            Save Preference
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailNewsletter;