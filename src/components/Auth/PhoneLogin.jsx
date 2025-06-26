import { useState } from "react";
import { auth } from "../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const PhoneLogin = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  const sendCode = async (e) => {
    e.preventDefault();
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {'size': 'invisible'}, auth);
    }
    try {
      const result = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      setConfirmation(result);
      alert("OTP sent!");
    } catch (err) {
      alert(err.message);
    }
  };

  const verifyCode = async (e) => {
    e.preventDefault();
    try {
      await confirmation.confirm(otp);
      alert("Phone number verified!");
    } catch (err) {
      alert("Incorrect OTP.");
    }
  };

  return (
    <div>
      <form onSubmit={sendCode}>
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+1234567890" />
        <button type="submit">Send OTP</button>
      </form>
      <div id="recaptcha-container"></div>
      {confirmation && (
        <form onSubmit={verifyCode}>
          <input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="Enter OTP" />
          <button type="submit">Verify</button>
        </form>
      )}
    </div>
  );
};

export default PhoneLogin;