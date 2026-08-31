import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { sendEmailVerification, reload } from "firebase/auth";
import { db, storage } from "../../firebase";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaShoppingBag,
  FaHeart,
  FaWallet,
  FaEdit,
  FaSave,
  FaTimes,
  FaCamera,
  FaLock,
  FaExclamationTriangle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const RESEND_COOLDOWN_SECONDS = 60;

const Profile = () => {
  const { user } = useAuth();

  const name = user?.displayName || user?.email?.split("@")[0] || "Customer";

  const [phone, setPhone] = useState("");
  const [alternativePhone, setAlternativePhone] = useState("");
  const [photoURL, setPhotoURL] = useState(null);

  const [editingPhone, setEditingPhone] = useState(false);
  const [phoneInput, setPhoneInput] = useState("");
  const [alternativePhoneInput, setAlternativePhoneInput] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [error, setError] = useState(null);

  // Email verification
  const [emailVerified, setEmailVerified] = useState(
    user?.emailVerified ?? true,
  );
  const [resending, setResending] = useState(false);
  const [checkingVerification, setCheckingVerification] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationError, setVerificationError] = useState(null);

  const primaryLocked = Boolean(phone);

  useEffect(() => {
    if (!user) return;

    const loadProfile = async () => {
      try {
        const snap = await getDoc(doc(db, "users", user.uid));

        if (snap.exists()) {
          const data = snap.data();
          setPhone(data.phone || "");
          setAlternativePhone(data.alternativePhone || "");
          setPhotoURL(data.photoURL || user.photoURL || null);
        } else {
          setPhotoURL(user.photoURL || null);
        }
      } catch (err) {
        console.error("Unable to load profile information:", err);
        setError("Could not load your profile. Please refresh.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  // Keep verification status in sync with the auth user
  useEffect(() => {
    if (!user) return;
    setEmailVerified(user.emailVerified);
  }, [user]);

  // Resend cooldown ticker
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleEditPhone = () => {
    setPhoneInput(phone);
    setAlternativePhoneInput(alternativePhone);
    setEditingPhone(true);
  };

  const handleCancelPhone = () => {
    setPhoneInput(phone);
    setAlternativePhoneInput(alternativePhone);
    setEditingPhone(false);
  };

  const handleSavePhone = async () => {
    if (!user) return;
    setSaving(true);
    setError(null);

    const profileData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || null,
      ...(primaryLocked ? {} : { phone: phoneInput.trim() }),
      alternativePhone: alternativePhoneInput.trim(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await setDoc(doc(db, "users", user.uid), profileData, { merge: true });

      if (!primaryLocked) {
        setPhone(profileData.phone);
      }
      setAlternativePhone(profileData.alternativePhone);
      setEditingPhone(false);
    } catch (err) {
      console.error("Unable to save profile information:", err);
      setError("Could not save your changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB.");
      return;
    }

    setError(null);
    setUploadingPhoto(true);

    try {
      const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      await setDoc(
        doc(db, "users", user.uid),
        { photoURL: url, updatedAt: new Date().toISOString() },
        { merge: true },
      );

      setPhotoURL(url);
    } catch (err) {
      console.error("Profile picture upload failed:", err);
      setError("Upload failed. Please try again.");
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleResendVerification = async () => {
    if (!user || resendCooldown > 0) return;
    setResending(true);
    setVerificationError(null);

    try {
      await sendEmailVerification(user);
      setVerificationSent(true);
      setResendCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (err) {
      console.error("Unable to send verification email:", err);
      if (err.code === "auth/too-many-requests") {
        setVerificationError(
          "Too many requests. Please wait a bit before trying again.",
        );
      } else {
        setVerificationError(
          "Could not send verification email. Please try again.",
        );
      }
    } finally {
      setResending(false);
    }
  };

  const handleCheckVerification = async () => {
    if (!user) return;
    setCheckingVerification(true);
    setVerificationError(null);

    try {
      await reload(user);
      setEmailVerified(user.emailVerified);
      if (!user.emailVerified) {
        setVerificationError(
          "Still not verified — check your inbox (and spam folder).",
        );
      }
    } catch (err) {
      console.error("Unable to check verification status:", err);
      setVerificationError("Could not check verification status right now.");
    } finally {
      setCheckingVerification(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5 text-muted">Loading your profile...</div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Profile</h2>
        <p className="text-muted mb-0">
          Manage your personal account information.
        </p>
      </div>

      {!emailVerified && (
        <div className="alert alert-warning py-2 mb-3">
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
            <div className="d-flex align-items-center gap-2">
              <FaExclamationTriangle />
              <span>
                Your email address isn&apos;t verified yet.
                {verificationSent &&
                  " A new verification link has been sent — check your inbox."}
              </span>
            </div>

            <div className="d-flex gap-2 flex-shrink-0">
              <button
                type="button"
                className="btn btn-sm btn-outline-dark"
                onClick={handleCheckVerification}
                disabled={checkingVerification}
              >
                {checkingVerification ? "Checking..." : "I've verified"}
              </button>

              <button
                type="button"
                className="btn btn-sm btn-dark"
                onClick={handleResendVerification}
                disabled={resending || resendCooldown > 0}
              >
                {resending
                  ? "Sending..."
                  : resendCooldown > 0
                    ? `Resend in ${resendCooldown}s`
                    : "Resend email"}
              </button>
            </div>
          </div>

          {verificationError && (
            <div className="text-danger small mt-2">{verificationError}</div>
          )}
        </div>
      )}

      {error && (
        <div className="alert alert-danger py-2" role="alert">
          {error}
        </div>
      )}

      {/* Profile Information */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          {/* User Header */}
          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="position-relative">
              {photoURL ? (
                <img
                  src={photoURL}
                  alt={name}
                  style={{
                    width: 75,
                    height: 75,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  className="d-flex align-items-center justify-content-center bg-dark text-white"
                  style={{
                    width: 75,
                    height: 75,
                    borderRadius: "50%",
                    fontSize: 28,
                    fontWeight: 600,
                  }}
                >
                  {name.charAt(0).toUpperCase()}
                </div>
              )}

              <label
                htmlFor="profile-photo-input"
                className="d-flex align-items-center justify-content-center bg-dark text-white"
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  cursor: "pointer",
                  border: "2px solid #fff",
                }}
                title="Change photo"
              >
                <FaCamera size={12} />
              </label>
              <input
                id="profile-photo-input"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                disabled={uploadingPhoto}
                hidden
              />
            </div>

            <div>
              <h4 className="mb-1">{name}</h4>
              <p className="text-muted mb-0">
                {uploadingPhoto ? "Uploading photo..." : "iProEdge Customer"}
              </p>
            </div>
          </div>

          <div className="row g-3">
            {/* Name */}
            <div className="col-md-6">
              <div className="border rounded p-3 h-100">
                <small className="text-muted d-block mb-1">
                  <FaUser className="me-2" />
                  Name
                </small>
                <strong>{name}</strong>
              </div>
            </div>

            {/* Email */}
            <div className="col-md-6">
              <div className="border rounded p-3 h-100">
                <small className="text-muted d-block mb-1 d-flex align-items-center justify-content-between">
                  <span>
                    <FaEnvelope className="me-2" />
                    Email
                  </span>
                  {emailVerified ? (
                    <span
                      className="badge bg-success-subtle text-success"
                      style={{ fontWeight: 500 }}
                    >
                      Verified
                    </span>
                  ) : (
                    <span
                      className="badge bg-warning-subtle text-warning-emphasis"
                      style={{ fontWeight: 500 }}
                    >
                      Unverified
                    </span>
                  )}
                </small>
                <strong>{user?.email || "Not available"}</strong>
              </div>
            </div>

            {/* Phone */}
            <div className="col-md-6">
              <div className="border rounded p-3 h-100">
                <small className="text-muted d-block mb-1 d-flex align-items-center justify-content-between">
                  <span>
                    <FaPhone className="me-2" />
                    Primary Phone
                  </span>
                  {primaryLocked && (
                    <FaLock size={11} className="text-muted" title="Locked" />
                  )}
                </small>
                <strong>{phone || "Not added"}</strong>
              </div>
            </div>

            {/* Alternative Phone */}
            <div className="col-md-6">
              <div className="border rounded p-3 h-100">
                <small className="text-muted d-block mb-1">
                  <FaPhone className="me-2" />
                  Alternative Phone
                </small>
                <strong>{alternativePhone || "Not added"}</strong>
              </div>
            </div>
          </div>

          {/* Edit Phone Button */}
          <div className="mt-4">
            {!editingPhone ? (
              <button
                type="button"
                className="btn btn-dark"
                onClick={handleEditPhone}
              >
                <FaEdit className="me-2" />
                {phone || alternativePhone
                  ? "Edit Phone Numbers"
                  : "Add Phone Numbers"}
              </button>
            ) : (
              <div className="border rounded p-4">
                <h5 className="fw-bold mb-3">Phone Numbers</h5>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Primary Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="e.g. 08012345678"
                    disabled={primaryLocked}
                  />
                  {primaryLocked ? (
                    <small className="text-muted d-flex align-items-center gap-1 mt-1">
                      <FaLock size={11} />
                      Your primary number is locked for security. Contact
                      support to change it.
                    </small>
                  ) : (
                    <small className="text-muted">
                      This will be your main contact number. Once saved, it can
                      only be changed by contacting support.
                    </small>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Alternative Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    value={alternativePhoneInput}
                    onChange={(e) => setAlternativePhoneInput(e.target.value)}
                    placeholder="e.g. 08098765432"
                  />
                  <small className="text-muted">
                    Optional. You can add, edit, or update this number anytime.
                  </small>
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={handleSavePhone}
                    disabled={saving}
                  >
                    <FaSave className="me-2" />
                    {saving ? "Saving..." : "Save"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleCancelPhone}
                    disabled={saving}
                  >
                    <FaTimes className="me-2" />
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Profile;
