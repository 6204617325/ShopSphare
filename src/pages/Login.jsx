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
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";

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

  async function handleLogin() {
    let valid = true;

    setEmailError("");
    setPasswordError("");

    // Email validation
    if (email.trim() === "") {
      setEmailError("Email is required");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email address");
      valid = false;
    }

    // Password validation
    if (password.trim() === "") {
      setPasswordError("Password is required");
      valid = false;
    }

    if (!valid) {
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      if (rememberMe) {
        localStorage.setItem("email", email.trim());
      } else {
        localStorage.removeItem("email");
      }

      alert("Login Successful 🎉");

      navigate("/home");
    } catch (error) {
      console.error("Firebase Login Error:", error);

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setPasswordError("Invalid email or password");
      } else {
        setPasswordError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }
async function handleGoogleLogin() {
  try {
    setLoading(true);

    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);

    const user = result.user;
    await setDoc(
  doc(db, "users", user.uid),
  {
    uid: user.uid,
    name: user.displayName || "",
    email: user.email || "",
    photoURL: user.photoURL || "",
    provider: "google",
    updatedAt: serverTimestamp(),
  },
  { merge: true }
);

navigate("/home");

    console.log("Google User:", user);
    console.log("Name:", user.displayName);
    console.log("Email:", user.email);
    console.log("Photo:", user.photoURL);

    alert(`Welcome ${user.displayName} 🎉`);

    navigate("/home");
  } catch (error) {
    console.error("Google Login Error:", error);

    alert(error.message);
  } finally {
    setLoading(false);
  }
}
async function handleGithubLogin() {
  try {
    setLoading(true);

    const provider = new GithubAuthProvider();

    const result = await signInWithPopup(auth, provider);

    const user = result.user;
    await setDoc(
  doc(db, "users", user.uid),
  {
    uid: user.uid,
    name: user.displayName || "",
    email: user.email || "",
    photoURL: user.photoURL || "",
    provider: "github",
    updatedAt: serverTimestamp(),
  },
  { merge: true }
);

    console.log("GitHub User:", user);
    console.log("Name:", user.displayName);
    console.log("Email:", user.email);
    console.log("Photo:", user.photoURL);

    alert(`Welcome ${user.displayName || "User"} 🎉`);

    navigate("/home");
  } catch (error) {
    console.error("GitHub Login Error:", error);

    alert(error.message);
  } finally {
    setLoading(false);
  }
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
        disabled={!email || !password || loading}
      />

      <Divider />

      <SocialButton
        text={loading ? "Signing in..." : "Continue with Google"}
        icon={<FcGoogle />}
        onClick={handleGoogleLogin}
      />

      <SocialButton
        text="Continue with GitHub"
        icon={<FaGithub />}
        onClick={handleGithubLogin}
      />

      <SocialButton
        text="Continue with LinkedIn"
        icon={<FaLinkedin />}
      />
    </div>
  );
}

export default Login;