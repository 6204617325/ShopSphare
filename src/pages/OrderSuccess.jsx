import { Link } from "react-router-dom";

function OrderSuccess() {
    // Order Details
const orderId = localStorage.getItem("orderId");

const customerName = localStorage.getItem("customerName");

const paymentMethod = localStorage.getItem("paymentMethod");

  return (

    <div className="container text-center mt-5">

      <div
        className="card shadow-lg p-5 mx-auto"
        style={{ maxWidth: "600px" }}
      >

        <h1 className="text-success display-1">
          ✅
        </h1>

        <h2 className="fw-bold mt-3">
          Order Placed Successfully
        </h2>

        <p className="text-muted mt-3">
          Thank You
          <strong> {customerName}</strong>
          <br />
          for shopping with
          <strong> ShopSphere</strong>.
        </p>

        <hr />

        <h5>
          Order ID
        </h5>

        <h3 className="text-primary">
          #{orderId}
        </h3>

        <hr />

        <h5>
          Estimated Delivery
        </h5>
        <hr />

        <h5>
          Payment Method
        </h5>
        
        <p className="fw-bold text-primary">
          {paymentMethod}
        </p>

        <p className="text-success fw-bold">
          Within 2-3 Days 🚚
        </p>

        <Link
          to="/home"
          className="btn btn-primary btn-lg mt-4"
        >
          Continue Shopping
        </Link>

      </div>

    </div>

  );
}

export default OrderSuccess;