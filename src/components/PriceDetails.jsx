import {Link } from "react-router-dom";

function PriceDetails({ cart, totalPrice }) {

  return (

    <div className="card shadow-sm p-4 sticky-top">

      <h4 className="fw-bold mb-4">
        Price Details
      </h4>

      <div className="d-flex justify-content-between">

        <span>Items</span>

        <span>{cart.length}</span>

      </div>

      <div className="d-flex justify-content-between mt-3">

        <span>Subtotal</span>

        <span>₹{totalPrice}</span>

      </div>

      <div className="d-flex justify-content-between mt-3 text-success">

        <span>Discount</span>

        <span>- ₹500</span>

      </div>

      <div className="d-flex justify-content-between mt-3">

        <span>Delivery</span>

        <span className="text-success">
          FREE
        </span>

      </div>

      <hr />

      <div className="d-flex justify-content-between fw-bold fs-5">

        <span>Grand Total</span>

        <span>₹{totalPrice - 500}</span>

      </div>
      
      <Link
         to="/checkout"
         className="btn btn-success w-100 mt-4"
           >
           Proceed to Checkout
      </Link>

    </div>

  );
}

export default PriceDetails;