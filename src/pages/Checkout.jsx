import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Checkout({cart}) {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    payment: "Cash on Delivery",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const totalPrice = cart.reduce(
  (total, item) => total + item.price * item.quantity,0
);

  const handlePlaceOrder = () => {
   const checkoutData = {
    customerName: formData.fullName,
    phone: formData.phone,
    email: formData.email,
    address: formData.address,
    city: formData.city,
    state: formData.state,
    pincode: formData.pincode,
    paymentMethod: formData.payment,
  };

  localStorage.setItem(
    "checkoutData",
    JSON.stringify(checkoutData)
  );

    // Generate Order ID
    const orderId ="SP" +
      Date.now().toString().slice(-6) +
      Math.floor(Math.random() * 100);

    localStorage.setItem("orderId", orderId);
    localStorage.setItem("customerName", formData.fullName);
    localStorage.setItem("paymentMethod", formData.payment);

    navigate("/payment", { state: { cart: cart, totalPrice: totalPrice } });
  };

  return (
    <div className="container my-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="text-primary fw-bold">
            🛍 ShopSphere
          </h2>

          <Link
            to="/cart"
            className="text-decoration-none"
          >
            ← Back to Cart
          </Link>

        </div>

        <h2 className="fw-bold">
          Checkout
        </h2>

      </div>

      <div className="card shadow p-4">

        <h4 className="mb-4">
          Delivery Details
        </h4>

        <div className="row">

          <div className="col-md-6 mb-3">
            <label className="form-label">
              Full Name
            </label>

            <input
              type="text"
              className="form-control"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">
              Phone Number
            </label>

            <input
              type="text"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">
              City
            </label>

            <input
              type="text"
              className="form-control"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">
              Address
            </label>

            <textarea
              rows="3"
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">
              State
            </label>

            <input
              type="text"
              className="form-control"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">
              Pincode
            </label>

            <input
              type="text"
              className="form-control"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
            />
          </div>

        </div>

        <hr />

        <h4 className="mb-3">
          Payment Method
        </h4>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="payment"
            value="Cash on Delivery"
            checked={formData.payment === "Cash on Delivery"}
            onChange={handleChange}
          />

          <label className="form-check-label">
            Cash on Delivery
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="payment"
            value="UPI"
            checked={formData.payment === "UPI"}
            onChange={handleChange}
          />

          <label className="form-check-label">
            UPI
          </label>
        </div>

        <div className="form-check mb-4">
          <input
            className="form-check-input"
            type="radio"
            name="payment"
            value="Card"
            checked={formData.payment === "Card"}
            onChange={handleChange}
          />

          <label className="form-check-label">
            Debit / Credit Card
          </label>
        </div>

        <button
          className="btn btn-success w-100"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>

      </div>

    </div>
  );
}

export default Checkout;