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

      <SocialButton text="Continue with LinkedIn" icon={<FaLinkedin />} />
    </div>
  );
}

export default Login;
