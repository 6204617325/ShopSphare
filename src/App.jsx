import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import OrderSuccess from "./pages/OrderSuccess";
import Dashboard from "./pages/Dashboard";
import OrderDetails from "./pages/OrderDetails";
import Profile from "./pages/Profile";
import AdminRoute from "./components/AdminRoute";
import { auth, db } from "./firebase";

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(true);

  // --------------------------------------------------
  // Firebase Auth Listener
  // --------------------------------------------------

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        setCurrentUser(user);

        if (!user) {
          // No user logged in
          setCart([]);
          setCartLoading(false);
          setAuthLoading(false);
          return;
        }

        try {
          setCartLoading(true);

          // User-specific cart document
          const cartRef = doc(
            db,
            "users",
            user.uid,
            "data",
            "cart"
          );

          const cartSnapshot = await getDoc(cartRef);

          if (cartSnapshot.exists()) {
            const firebaseCart =
              cartSnapshot.data().items || [];

            setCart(firebaseCart);

            // Backup in localStorage
            localStorage.setItem(
              "cart",
              JSON.stringify(firebaseCart)
            );
          } else {
            // If Firebase cart doesn't exist,
            // use old localStorage cart if available.
            const localCart =
              JSON.parse(
                localStorage.getItem("cart")
              ) || [];

            setCart(localCart);

            // Create Firebase cart
            await setDoc(cartRef, {
              items: localCart,
            });
          }
        } catch (error) {
          console.error(
            "Error loading cart from Firebase:",
            error
          );

          // Fallback to localStorage
          const localCart =
            JSON.parse(
              localStorage.getItem("cart")
            ) || [];

          setCart(localCart);
        } finally {
          setCartLoading(false);
          setAuthLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  // --------------------------------------------------
  // Save Cart to Firebase
  // --------------------------------------------------

  useEffect(() => {
    // Don't save before Firebase has finished loading
    if (cartLoading) {
      return;
    }

    // Always keep localStorage backup
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    // Cart total
    const total = cart.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );

    localStorage.setItem(
      "cartTotal",
      total.toString()
    );

    // If no user is logged in,
    // don't save to Firestore.
    if (!currentUser) {
      return;
    }

    const saveCart = async () => {
      try {
        const cartRef = doc(
          db,
          "users",
          currentUser.uid,
          "data",
          "cart"
        );

        await setDoc(
          cartRef,
          {
            items: cart,
            updatedAt: new Date(),
          },
          {
            merge: true,
          }
        );

        console.log(
          "Cart saved to Firebase ✅"
        );
      } catch (error) {
        console.error(
          "Error saving cart to Firebase:",
          error
        );
      }
    };

    saveCart();
  }, [cart, currentUser, cartLoading]);

  // --------------------------------------------------
  // Wishlist Local Storage
  // --------------------------------------------------

  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // --------------------------------------------------
  // Loading Screen
  // --------------------------------------------------

  if (authLoading || cartLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
        }}
      >
        <div className="text-center">
          <h3>🛍️ ShopSphere</h3>

          <p className="text-muted">
            Loading your account...
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // Routes
  // --------------------------------------------------

  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* Home */}
        <Route
          path="/home"
          element={
            <Home
              cart={cart}
              setCart={setCart}
              wishlist={wishlist}
              setWishlist={setWishlist}
            />
          }
        />

        {/* Cart */}
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
            />
          }
        />

        {/* Wishlist */}
        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              setWishlist={setWishlist}
              cart={cart}
              setCart={setCart}
            />
          }
        />

        {/* Checkout */}
        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              setCart={setCart}
            />
          }
        />

        {/* Payment */}
        <Route
          path="/payment"
          element={<Payment />}
        />

        {/* Orders */}
        <Route
          path="/orders"
          element={<Orders />}
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* Order Details */}
        <Route
          path="/order-details/:orderId"
          element={<OrderDetails />}
        />

        {/* Order Success */}
        <Route
          path="/order-success"
          element={<OrderSuccess />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
        path="/admin"
        element={
        <AdminRoute>
          <AdminDashboard/>
        </AdminRoute>
        }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;