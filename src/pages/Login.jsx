import EmailLogin from "../components/Auth/EmailLogin";
import GoogleLogin from "../components/Auth/GoogleLogin";

export default function Login() {
  return (
    <div>
      <h2>Login</h2>
      <EmailLogin />
      <GoogleLogin />
    </div>
  );
}