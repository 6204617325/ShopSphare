import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaMoneyBillWave,
  FaCreditCard,
  FaMobileAlt,
} from "react-icons/fa";

import upi from "../assets/products/upi.png";

import { auth, db } from "../firebase";
import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

function Payment() {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [seconds, setSeconds] = useState(300);
  const [loading, setLoading] = useState(false);

  // ================================
  // CART
  // ================================

  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      Number(item.price) *
        Number(item.quantity || 1),
    0
  );

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // ================================
  // UPI TIMER
  // ================================

  useEffect(() => {
    if (paymentMethod !== "UPI") return;
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, paymentMethod]);

  // ================================
  // PLACE ORDER
  // ================================

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Check login
      const currentUser = auth.currentUser;

      if (!currentUser) {
        alert("Please login first 🔐");
        navigate("/");
        return;
      }

      // Check cart
      const cartItems =
        JSON.parse(localStorage.getItem("cart")) || [];

      if (cartItems.length === 0) {
        alert("Your cart is empty 🛒");
        navigate("/cart");
        return;
      }

      // Order ID
      const orderId =
        localStorage.getItem("orderId") ||
        "SP" +
          Date.now()
            .toString()
            .slice(-8);

      // Customer name
      const savedUser =
        JSON.parse(
          localStorage.getItem("user")
        ) || {};

      const customerName =
        savedUser.fullName ||
        currentUser.displayName ||
        "Customer";

      // Total
      const cartTotal = cartItems.reduce(
        (total, item) =>
          total +
          Number(item.price) *
            Number(item.quantity || 1),
        0
      );

      // ================================
      // IMPORTANT:
      // NEW ORDER = PENDING
      // Admin will confirm it.
      // ================================

      const newOrder = {
        orderId: orderId,

        userId: currentUser.uid,

        customerName: customerName,

        customerEmail:
          currentUser.email || "",

        paymentMethod: paymentMethod,

        items: cartItems,

        total: cartTotal,

        status: "Pending",

        createdAt: serverTimestamp(),

        updatedAt: serverTimestamp(),
      };

      // ================================
      // SAVE TO FIRESTORE
      // ================================

      await setDoc(
        doc(db, "orders", orderId),
        newOrder
      );

      console.log(
        "Order saved to Firebase ✅",
        newOrder
      );

      // ================================
      // LOCAL STORAGE BACKUP
      // ================================

      const existingOrders =
        JSON.parse(
          localStorage.getItem("orders")
        ) || [];

      localStorage.setItem(
        "orders",
        JSON.stringify([
          ...existingOrders,
          {
            ...newOrder,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ])
      );

      // Save order ID
      localStorage.setItem(
        "orderId",
        orderId
      );

      // ================================
      // CLEAR CART
      // ================================

      localStorage.removeItem("cart");

      localStorage.removeItem(
        "cartTotal"
      );

      // ================================
      // SUCCESS
      // ================================

      alert(
        "Order Placed Successfully 🎉\n\nStatus: Pending"
      );

      navigate("/order-success");
    } catch (error) {
      console.error(
        "Order Save Error:",
        error
      );

      alert(
        "Order place nahi ho paya ❌\n\n" +
          error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">

      {/* HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold text-primary">
            🛍 ShopSphere
          </h2>

          <Link
            to="/checkout"
            className="text-decoration-none"
          >
            ← Back to Checkout
          </Link>
        </div>

        <h2 className="fw-bold">
          Payment
        </h2>

      </div>

      <div className="row">

        {/* LEFT */}

        <div className="col-lg-8">

          <div className="card shadow p-4">

            <h4 className="mb-4">
              Select Payment Method
            </h4>

            {/* COD */}

            <div className="border rounded p-3 mb-3">

              <div className="form-check">

                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={
                    paymentMethod === "COD"
                  }
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value
                    )
                  }
                />

                <label className="form-check-label ms-2">

                  <FaMoneyBillWave className="me-2 text-success" />

                  Cash On Delivery

                </label>

              </div>

            </div>

            {/* UPI */}

            <div className="border rounded p-3 mb-3">

              <div className="form-check">

                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  value="UPI"
                  checked={
                    paymentMethod === "UPI"
                  }
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value
                    )
                  }
                />

                <label className="form-check-label ms-2">

                  <FaMobileAlt className="me-2 text-primary" />

                  UPI / Google Pay /
                  PhonePe / Paytm

                </label>

              </div>

            </div>

            {/* CARD */}

            <div className="border rounded p-3">

              <div className="form-check">

                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  value="CARD"
                  checked={
                    paymentMethod === "CARD"
                  }
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value
                    )
                  }
                />

                <label className="form-check-label ms-2">

                  <FaCreditCard className="me-2" />

                  Debit / Credit Card

                </label>

              </div>

            </div>

            {/* CARD FORM */}

            {paymentMethod === "CARD" && (
              <div className="mt-4">

                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Card Number"
                />

                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Card Holder Name"
                />

                <div className="row">

                  <div className="col">

                    <input
                      type="text"
                      className="form-control"
                      placeholder="MM/YY"
                    />

                  </div>

                  <div className="col">

                    <input
                      type="password"
                      className="form-control"
                      placeholder="CVV"
                    />

                  </div>

                </div>

              </div>
            )}

            {/* UPI */}

            {paymentMethod === "UPI" && (
              <div className="text-center mt-4">

                <h4>
                  📱 Scan & Pay
                </h4>

                <img
                  src={upi}
                  alt="UPI QR Code"
                  className="img-fluid shadow rounded"
                  style={{
                    width: "250px",
                    height: "250px",
                    objectFit: "contain",
                  }}
                />

                <h5 className="text-primary mt-3">
                  6204617325@ybl
                </h5>

                <h3 className="text-success mt-3">
                  ₹
                  {totalPrice.toLocaleString(
                    "en-IN"
                  )}
                </h3>

                <div className="alert alert-warning mt-4">

                  <h5>
                    ⏳ Payment Time Remaining
                  </h5>

                  <h3>
                    {minutes}:
                    {remainingSeconds
                      .toString()
                      .padStart(2, "0")}
                  </h3>

                </div>

              </div>
            )}

          </div>

        </div>

        {/* RIGHT */}

        <div className="col-lg-4">

          <div className="card shadow p-4 sticky-top">

            <h4 className="fw-bold">
              Order Summary
            </h4>

            <hr />

            <div className="d-flex justify-content-between">

              <span>Items</span>

              <span>
                {cart.length}
              </span>

            </div>

            <div className="d-flex justify-content-between mt-3">

              <span>Total</span>

              <strong>
                ₹
                {totalPrice.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>

            <hr />

            <div className="d-flex justify-content-between fs-5 fw-bold">

              <span>
                Grand Total
              </span>

              <span className="text-success">
                ₹
                {totalPrice.toLocaleString(
                  "en-IN"
                )}
              </span>

            </div>

            {/* PLACE ORDER */}

            <button
              className="btn btn-success w-100 mt-4"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading
                ? "Placing Order..."
                : paymentMethod === "COD"
                ? "Place Order"
                : "I Have Paid"}
            </button>

            {/* STATUS INFO */}

            <div className="alert alert-info mt-3 mb-0">

              <small>
                ℹ️ Your order will first be
                marked as <strong>Pending</strong>.
                Admin will confirm your order.
              </small>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Payment;