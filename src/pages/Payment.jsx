import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaMoneyBillWave,
  FaCreditCard,
  FaMobileAlt,
} from "react-icons/fa";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../firebase";

import upi from "../assets/products/upi.png";

function Payment() {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [seconds, setSeconds] = useState(300);

  // Cart se total lena
  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const totalPrice = cart.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity || 1),
    0
  );

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // 5 minute timer
  useEffect(() => {
    if (paymentMethod !== "UPI") return;
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, paymentMethod]);

  // Payment complete
const handlePayment = async () => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      alert("Please login first 🔐");
      navigate("/");
      return;
    }

    const cartItems =
      JSON.parse(localStorage.getItem("cart")) || [];

    if (cartItems.length === 0) {
      alert("Your cart is empty 🛒");
      navigate("/cart");
      return;
    }

    const customerName =
      localStorage.getItem("customerName") ||
      currentUser.displayName ||
      "Customer";

    const savedPaymentMethod =
      localStorage.getItem("paymentMethod") ||
      paymentMethod;

    const orderData = {
      userId: currentUser.uid,

      customerName: customerName,

      email: currentUser.email || "",

      paymentMethod: savedPaymentMethod,

      items: cartItems,

      total: totalPrice,

      status: "Confirmed",

      date: new Date().toLocaleDateString("en-IN"),

      createdAt: serverTimestamp(),
    };

    // 🔥 Save order to Firestore
    const orderRef = await addDoc(
      collection(db, "orders"),
      orderData
    );

    console.log(
      "Order saved to Firebase:",
      orderRef.id
    );

    // LocalStorage orderId for Order Success page
    localStorage.setItem(
      "orderId",
      orderRef.id
    );

    // Optional local copy
    localStorage.setItem(
      "lastOrder",
      JSON.stringify({
        ...orderData,
        orderId: orderRef.id,
      })
    );

    // Cart clear
    localStorage.removeItem("cart");
    localStorage.removeItem("cartTotal");

    alert("Payment Successful 🎉");

    navigate("/order-success");

  } catch (error) {
    console.error(
      "Firebase Order Save Error:",
      error
    );

    alert(
      `Order save nahi ho paya ❌\n${error.code || ""}`
    );
  }
};

  return (
    <div className="container my-5">

      {/* Header */}
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

        {/* LEFT SIDE */}
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
                  checked={paymentMethod === "COD"}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
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
                  checked={paymentMethod === "UPI"}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                />

                <label className="form-check-label ms-2">

                  <FaMobileAlt className="me-2 text-primary" />

                  UPI / Google Pay / PhonePe / Paytm

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
                  checked={paymentMethod === "CARD"}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
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

            {/* UPI QR */}
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
                  ₹{totalPrice.toLocaleString("en-IN")}
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

                <button
                  className="btn btn-success btn-lg w-100"
                  onClick={handlePayment}
                >
                  Place Order
                </button>

              </div>
            )}

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="col-lg-4">

          <div className="card shadow p-4 sticky-top">

            <h4 className="fw-bold">
              Order Summary
            </h4>

            <hr />

            <div className="d-flex justify-content-between">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <span>Total</span>

              <strong>
                ₹{totalPrice.toLocaleString("en-IN")}
              </strong>
            </div>

            <hr />

            <div className="d-flex justify-content-between fs-5 fw-bold">
              <span>Grand Total</span>

              <span className="text-success">
                ₹{totalPrice.toLocaleString("en-IN")}
              </span>
            </div>

            <button
              className="btn btn-success w-100 mt-4"
              onClick={handlePayment}
            >
              {paymentMethod === "COD"
                ? "Place Order"
                : "Pay Now"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Payment;