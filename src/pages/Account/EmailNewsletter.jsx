import { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { FaEnvelope } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const EmailNewsletter = () => {
  const { user } = useAuth();

  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const loadPreference = async () => {
      try {
        const snap = await getDoc(doc(db, "users", user.uid));

        if (snap.exists()) {
          const data = snap.data();
          setEnabled(Boolean(data.newsletterOptIn));
        }
      } catch (err) {
        console.error("Unable to load newsletter preference:", err);
        setError("Could not load your preference. Please refresh.");
      } finally {
        setLoading(false);
      }
    };

    loadPreference();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setError(null);

    try {
      await setDoc(
        doc(db, "users", user.uid),
        { newsletterOptIn: enabled, updatedAt: new Date().toISOString() },
        { merge: true },
      );

      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error("Unable to save newsletter preference:", err);
      setError("Could not save your preference. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5 text-muted">
        Loading your preferences...
      </div>
    );
  }

  return (
    <div>
      <h2 className="fw-bold mb-1">Email Newsletter</h2>

      <p className="text-muted mb-4">
        Manage your email communication preferences.
      </p>

      {error && <Alert variant="danger">{error}</Alert>}

      {saved && <Alert variant="success">Newsletter preference saved.</Alert>}

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <FaEnvelope size={30} />

          <h5 className="fw-bold mt-3">iProEdge Newsletter</h5>

          <p className="text-muted">
            Receive product updates, offers and important store information.
          </p>

          <Form.Check
            type="switch"
            id="newsletter-switch"
            label="Subscribe to the iProEdge newsletter"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
          />

          <Button
            variant="dark"
            className="mt-4"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Preference"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailNewsletter;
