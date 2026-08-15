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

import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

import { auth, db } from "../firebase";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Remember Email
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");

    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  // =========================================
  // CHECK ADMIN
  // =========================================

  async function checkAdmin(user) {
    const userRef = doc(db, "users", user.uid);

    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();

      console.log("Firestore User:", userData);
      console.log("User Role:", userData.role);

      if (userData.role === "admin") {
        return true;
      }
    }

    return false;
  }

  // =========================================
  // EMAIL + PASSWORD LOGIN
  // =========================================

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

      // Firebase Login
      const result = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      const user = result.user;

      console.log("Logged in User:", user);
      console.log("UID:", user.uid);

      // Remember Me
      if (rememberMe) {
        localStorage.setItem("email", email.trim());
      } else {
        localStorage.removeItem("email");
      }

      // Check Admin
      const isAdmin = await checkAdmin(user);

      if (isAdmin) {
        alert("Welcome Admin 👑");

        navigate("/admin");

        return;
      }

      // Normal User
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

  // =========================================
  // GOOGLE LOGIN
  // =========================================

  async function handleGoogleLogin() {
    try {
      setLoading(true);

      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      console.log("Google User:", user);

      // Check existing user
      const userRef = doc(db, "users", user.uid);

      const userSnap = await getDoc(userRef);

      // If user does not exist,
      // create user document
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName || "",
          email: user.email || "",
          photoURL: user.photoURL || "",
          provider: "google",
          role: "user",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } else {
        // Only update basic information.
        // IMPORTANT: role is NOT changed.
        await setDoc(
          userRef,
          {
            uid: user.uid,
            name: user.displayName || "",
            email: user.email || "",
            photoURL: user.photoURL || "",
            provider: "google",
            updatedAt: serverTimestamp(),
          },
          { merge: true },
        );
      }

      // Check Admin
      const isAdmin = await checkAdmin(user);

      if (isAdmin) {
        alert(`Welcome Admin ${user.displayName || ""} 👑`);

        navigate("/admin");

        return;
      }

      // Normal User
      alert(`Welcome ${user.displayName || "User"} 🎉`);

      navigate("/home");
    } catch (error) {
      console.error("Google Login Error:", error);

      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  // =========================================
  // GITHUB LOGIN
  // =========================================

  async function handleGithubLogin() {
    try {
      setLoading(true);

      const provider = new GithubAuthProvider();

      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      console.log("GitHub User:", user);

      const userRef = doc(db, "users", user.uid);

      const userSnap = await getDoc(userRef);

      // New GitHub user
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName || user.email || "User",
          email: user.email || "",
          photoURL: user.photoURL || "",
          provider: "github",
          role: "user",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } else {
        // Do NOT change role
        await setDoc(
          userRef,
          {
            uid: user.uid,
            name: user.displayName || user.email || "User",
            email: user.email || "",
            photoURL: user.photoURL || "",
            provider: "github",
            updatedAt: serverTimestamp(),
          },
          { merge: true },
        );
      }

      // Check Admin
      const isAdmin = await checkAdmin(user);

      if (isAdmin) {
        alert("Welcome Admin 👑");

        navigate("/admin");

        return;
      }

      // Normal User
      alert(`Welcome ${user.displayName || "User"} 🎉`);

      navigate("/home");
    } catch (error) {
      console.error("GitHub Login Error:", error);

      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  // =========================================
  // UI
  // =========================================

  return (
    <div className="login-page-wrapper">

      {/* Animated background orbs */}
      <div className="login-orb login-orb-1" />
      <div className="login-orb login-orb-2" />
      <div className="login-orb login-orb-3" />

      {/* Login Card */}
      <div className="login-card-container">
        <div className="login-card">

          {/* Header */}
          <div className="login-card-header">
            <div className="login-logo-icon">🛍</div>
            <h1 className="login-title">ShopSphere</h1>
            <p className="login-subtitle">Welcome back! Sign in to continue</p>
          </div>

          {/* Form Body */}
          <div className="login-form-body">

            {/* Email Field */}
            <div className="login-field">
              <label className="login-label">Email Address</label>
              <div className="login-input-wrapper">
                <span className="login-input-icon">✉️</span>
                <input
                  type="email"
                  className={`login-input ${emailError ? "login-input-error" : ""}`}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {emailError && <p className="login-error-msg">{emailError}</p>}
            </div>

            {/* Password Field */}
            <div className="login-field">
              <label className="login-label">Password</label>
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
              />
            </div>

            {/* Remember Me + Forgot */}
            <div className="login-row-flex">
              <label className="login-remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="login-checkbox"
                />
                <span>Remember me</span>
              </label>
              <ForgetPassword />
            </div>

            {/* Login Button */}
            <button
              className="login-btn-primary"
              onClick={handleLogin}
              disabled={!email || !password || loading}
            >
              {loading ? (
                <span className="login-spinner" />
              ) : (
                "Sign In →"
              )}
            </button>

            {/* Divider */}
            <div className="login-divider">
              <span className="login-divider-line" />
              <span className="login-divider-text">or continue with</span>
              <span className="login-divider-line" />
            </div>

            {/* Social Buttons */}
            <div className="login-social-grid">
              <button
                className="login-social-btn"
                onClick={handleGoogleLogin}
                disabled={loading}
                title="Continue with Google"
              >
                <FcGoogle size={20} />
                <span>Google</span>
              </button>

              <button
                className="login-social-btn"
                onClick={handleGithubLogin}
                disabled={loading}
                title="Continue with GitHub"
              >
                <FaGithub size={18} />
                <span>GitHub</span>
              </button>

              <button
                className="login-social-btn"
                disabled={true}
                title="LinkedIn (Coming Soon)"
              >
                <FaLinkedin size={18} style={{ color: "#0A66C2" }} />
                <span>LinkedIn</span>
              </button>
            </div>

          </div>

          {/* Footer note */}
          <p className="login-footer-note">
            By signing in, you agree to our{" "}
            <span className="login-link">Terms of Service</span> &{" "}
            <span className="login-link">Privacy Policy</span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;
