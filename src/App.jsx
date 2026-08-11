import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import firebase from "firebase/compat/app";

function App() {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    localStorage.setItem("cartTotal", total.toString());
  }, [cart]);
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/home" element={<Home cart={cart} setCart={setCart} />} />

        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />

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

        <Route
          path="/checkout"
          element={<Checkout cart={cart} setCart={setCart} />}
        />

        <Route path="/payment" element={<Payment />} />

        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/order-details/:orderId" element={<OrderDetails />} />
        <Route path="/order-success" element={<OrderSuccess />} />

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      
    </BrowserRouter>
  );
}

export default App;
