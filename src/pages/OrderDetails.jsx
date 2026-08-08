import { Link, useParams } from "react-router-dom";

function OrderDetails() {
  const { orderId } = useParams();

  const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

  const order = orders.find(
    (item) => String(item.orderId) === String(orderId)
  );

  // Order nahi mila
  if (!order) {
    return (
      <div className="container text-center mt-5">

        <h2 className="text-danger">
          ❌ Order Not Found
        </h2>

        <p className="text-muted">
          This order does not exist.
        </p>

        <Link
          to="/orders"
          className="btn btn-primary mt-3"
        >
          ← Back to Orders
        </Link>

      </div>
    );
  }

  return (
    <div className="container my-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold text-primary">
            🛍 ShopSphere
          </h2>

          <Link
            to="/orders"
            className="text-decoration-none"
          >
            ← Back to Orders
          </Link>

        </div>

        <h2 className="fw-bold">
          📦 Order Details
        </h2>

      </div>


      {/* Order Header */}
      <div className="card shadow-sm mb-4">

        <div className="card-header d-flex justify-content-between align-items-center">

          <div>

            <strong>
              Order ID:
            </strong>

            <span className="text-primary ms-2">
              #{order.orderId}
            </span>

          </div>

          <span className="text-success fw-bold">
            {order.status || "Confirmed"}
          </span>

        </div>


        {/* Customer + Status */}
        <div className="card-body">

          <div className="row">

            {/* Customer Details */}
            <div className="col-md-6">

              <h5 className="fw-bold">
                👤 Customer Details
              </h5>

              <hr />

              <p>
                <strong>Name:</strong>
                <br />
                {order.customerName || "Customer"}
              </p>

              <p>
                <strong>Payment:</strong>
                <br />
                {order.paymentMethod || "Not Available"}
              </p>

              <p>
                <strong>Order Date:</strong>
                <br />
                {order.date || "Not Available"}
              </p>

            </div>


            {/* Order Status */}
            <div className="col-md-6">

              <h5 className="fw-bold">
                🚚 Order Status
              </h5>

              <hr />

              <h5 className="text-success">
                {order.status || "Confirmed"}
              </h5>

              <p className="text-muted">
                Estimated Delivery
              </p>

              <p className="fw-bold">
                Within 2-3 Days 🚚
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* Products */}
      <div className="card shadow-sm">

        <div className="card-body">

          <h4 className="fw-bold mb-4">
            🛒 Ordered Products
          </h4>


          {order.items && order.items.length > 0 ? (

            order.items.map((item, index) => (

              <div
                key={item.id || index}
                className="row align-items-center border-bottom py-3"
              >

                {/* Product Image */}
                <div className="col-md-2">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="img-fluid"
                    style={{
                      height: "100px",
                      width: "100px",
                      objectFit: "contain",
                    }}
                  />

                </div>


                {/* Product Details */}
                <div className="col-md-6">

                  <h5>
                    {item.title}
                  </h5>

                  <p className="mb-1 text-muted">
                    Price: ₹{item.price}
                  </p>

                  <p className="mb-0">
                    Quantity: {item.quantity}
                  </p>

                </div>


                {/* Product Total */}
                <div className="col-md-4 text-end">

                  <h5 className="text-success">
                    ₹{item.price * item.quantity}
                  </h5>

                </div>

              </div>

            ))

          ) : (

            <p className="text-muted">
              No products found in this order.
            </p>

          )}


          {/* Grand Total */}
          <div className="d-flex justify-content-between mt-4">

            <h4 className="fw-bold">
              Grand Total
            </h4>

            <h4 className="text-success fw-bold">
              ₹{order.total}
            </h4>

          </div>

        </div>

      </div>


      {/* Back Button */}
      <div className="text-center mt-4">

        <Link
          to="/orders"
          className="btn btn-outline-primary"
        >
          ← Back to My Orders
        </Link>

      </div>

    </div>
  );
}

export default OrderDetails;