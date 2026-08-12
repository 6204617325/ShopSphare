import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

function ForgetPassword({ email }) {
  async function handleForgotPassword(e) {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email first.");
      return;
    }

    try {
      await sendPasswordResetEmail(
        auth,
        email.trim()
      );

      alert(
        "Password reset link sent! 📧 Check your email."
      );
    } catch (error) {
      console.error(
        "Password Reset Error:",
        error
      );

      if (error.code === "auth/invalid-email") {
        alert("Please enter a valid email address.");
      } else if (
        error.code === "auth/user-not-found"
      ) {
        alert("No account found with this email.");
      } else {
        alert(
          "Unable to send reset link. Please try again."
        );
      }
    }
  }

  return (
    <div className="forgot-password">
      <a
        href="#"
        onClick={handleForgotPassword}
      >
        Forget Password?
      </a>
    </div>
  );
}

export default ForgetPassword;