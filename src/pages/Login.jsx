import EmailLogin from "../components/Auth/EmailLogin";
import GoogleLogin from "../components/Auth/GoogleLogin";
import PhoneLogin from "../components/Auth/PhoneLogin";

export default function Login() {
  return (
    <div>
      <h2>Login</h2>
      <EmailLogin />
      <GoogleLogin />
      <PhoneLogin />
    </div>
  );
}