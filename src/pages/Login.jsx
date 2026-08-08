import { useState, useEffect } from "react";

import "../App.css";

import Button from "../components/Button";
import Input from "../components/Input";
import PasswordInput from "../components/PasswordInput";
import CheckBox from "../components/CheckBox";
import ForgetPassword from "../components/ForgetPassword";
import Logo from "../components/Logo";
import Divider from "../components/Divider";
import SocialButton from "../components/SocialButton";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");

    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  function handleLogin() {
    let valid = true;

    setEmailError("");
    setPasswordError("");

    // Email Validation
    if (email.trim() === "") {
      setEmailError("Email is required");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email address");
      valid = false;
    }

    // Password Validation
    if (password.trim() === "") {
      setPasswordError("Password is required");
      valid = false;
    }

    if (!valid) return;

    if (rememberMe) {
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("email");
    }

    alert("Login Successful 🎉");
    console.log("Email:", email);
    console.log("Password:", password);
    navigate("/home");
  }

  return (
    <div>
      <Logo />

      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={emailError}
      />

      <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={passwordError}
      />

      <CheckBox
        label="Remember Me"
        checked={rememberMe}
        onChange={(e) => setRememberMe(e.target.checked)}
      />

      <ForgetPassword />

      <Button
        text={loading ? "Loading..." : "Login"}
        onClick={handleLogin}
        disabled={!email || !password}
      />

      <Divider />

      <SocialButton
        text="Continue with Google"
        icon={<FcGoogle />}
      />

      <SocialButton
        text="Continue with GitHub"
        icon={<FaGithub />}
      />

      <SocialButton
        text="Continue with LinkedIn"
        icon={<FaLinkedin />}
      />
    </div>
  );
}

export default Login;