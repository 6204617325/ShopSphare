import { useState } from "react";
import { Link } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("orders")) || []
  );

  // =========================
  // Update Order Status
  // =========================
  const updateStatus = (orderId) => {
    const updatedOrders = orders.map((order) => {
      if (order.orderId !== orderId) {
        return order;
      }

      let newStatus = order.status;

      if (order.status === "Confirmed") {
        newStatus = "Shipped";
      } else if (order.status === "Shipped") {
        newStatus = "Delivered";
      }

      return {
        ...order,
        status: newStatus,
      };
    });

    setOrders(updatedOrders);

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );
  };

  // =========================
  // Cancel Order
  // =========================
  const cancelOrder = (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) {
      return;
    }

    const updatedOrders = orders.map((order) => {
      if (order.orderId === orderId) {
        return {
          ...order,
          status: "Cancelled",
        };
      }

      return order;
    });

    setOrders(updatedOrders);

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );
  };

  // =========================
  // Status Button Text
  // =========================
  const getNextStatus = (status) => {
    if (status === "Confirmed") {
      return "Mark as Shipped";
    }

    if (status === "Shipped") {
      return "Mark as Delivered";
    }

    return "";
  };

  return (
    <div className="container my-5">

      {/* ================= HEADER ================= */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold text-primary">
            🛍 ShopSphere
          </h2>

          <Link
            to="/home"
            className="text-decoration-none"
          >
            ← Continue Shopping
          </Link>
        </div>

        <h2 className="fw-bold">
          📦 My Orders
        </h2>

      </div>


      {/* ================= NO ORDERS ================= */}

      {orders.length === 0 ? (

        <div className="text-center mt-5">

          <h3>
            📦 No Orders Yet
          </h3>

          <p className="text-muted">
            You haven't placed any order yet.
          </p>

          <Link
            to="/home"
            className="btn btn-primary mt-3"
          >
            Start Shopping
          </Link>

        </div>

      ) : (

        /* ================= ORDERS ================= */

        orders.map((order) => (

          <div
            className="card shadow-sm mb-4"
            key={order.orderId}
          >

            {/* ================= ORDER HEADER ================= */}

            <div className="card-header d-flex justify-content-between align-items-center">

              <div>

                <strong>
                  Order ID:
                </strong>

                <span className="text-primary ms-2">
                  #{order.orderId}
                </span>

            </div>
            <div className="d-flex align-items-center gap-3">

                <span className="text-success fw-bold">
                   {order.status}
                </span>
           
                <Link
                   to={`/order-details/${order.orderId}`}
                   className="btn btn-primary btn-sm"
                >
                   View Details
                </Link>
           
            </div>


              {/* STATUS */}

              <span
                className={
                  order.status === "Confirmed"
                    ? "badge bg-success"
                    : order.status === "Shipped"
                    ? "badge bg-primary"
                    : order.status === "Delivered"
                    ? "badge bg-success"
                    : "badge bg-danger"
                }
              >
                {order.status}
              </span>

            </div>


            {/* ================= ORDER BODY ================= */}

            <div className="card-body">

              <div className="row">


                {/* ================= PRODUCTS ================= */}

                <div className="col-md-8">

                  <h5 className="mb-3">
                    Products
                  </h5>


                  {order.items.map((item) => (

                    <div
                      key={item.id}
                      className="d-flex align-items-center border-bottom pb-3 mb-3"
                    >

                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "contain",
                        }}
                        className="me-3"
                      />


                      <div>

                        <h6>
                          {item.title}
                        </h6>

                        <p className="mb-1">
                          ₹{item.price} × {item.quantity}
                        </p>

                        <strong>
                          ₹{item.price * item.quantity}
                        </strong>

                      </div>

                    </div>

                  ))}

                </div>


                {/* ================= ORDER DETAILS ================= */}

                <div className="col-md-4">

                  <div className="card bg-light p-3">

                    <h5>
                      Order Details
                    </h5>

                    <hr />


                    <p>
                      <strong>Date:</strong>
                      <br />
                      {order.date}
                    </p>


                    <p>
                      <strong>Payment:</strong>
                      <br />
                      {order.paymentMethod}
                    </p>


                    <p>
                      <strong>Customer:</strong>
                      <br />
                      {order.customerName}
                    </p>


                    <hr />


                    <h5 className="text-success">
                      Total: ₹{order.total}
                    </h5>

                  </div>

                </div>

              </div>


              {/* ================= ORDER STATUS ================= */}

              <hr />

              <div className="mt-3">

                <h5>
                  Order Status
                </h5>


                {/* STATUS STEPS */}

                <div className="d-flex justify-content-between text-center mt-4">

                  <div>

                    <div
                      className={
                        order.status === "Confirmed" ||
                        order.status === "Shipped" ||
                        order.status === "Delivered"
                          ? "fs-2"
                          : "fs-2 opacity-50"
                      }
                    >
                      ✅
                    </div>

                    <small>
                      Confirmed
                    </small>

                  </div>


                  <div>

                    <div
                      className={
                        order.status === "Shipped" ||
                        order.status === "Delivered"
                          ? "fs-2"
                          : "fs-2 opacity-50"
                      }
                    >
                      🚚
                    </div>

                    <small>
                      Shipped
                    </small>

                  </div>


                  <div>

                    <div
                      className={
                        order.status === "Delivered"
                          ? "fs-2"
                          : "fs-2 opacity-50"
                      }
                    >
                      📦
                    </div>

                    <small>
                      Delivered
                    </small>

                  </div>

                </div>


                {/* ================= BUTTONS ================= */}

                <div className="d-flex gap-2 mt-4">

                  {/* NEXT STATUS */}

                  {order.status !== "Delivered" &&
                    order.status !== "Cancelled" && (

                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          updateStatus(order.orderId)
                        }
                      >
                        {getNextStatus(order.status)}
                      </button>

                    )}


                  {/* CANCEL */}

                  {order.status !== "Delivered" &&
                    order.status !== "Cancelled" && (

                      <button
                        className="btn btn-outline-danger"
                        onClick={() =>
                          cancelOrder(order.orderId)
                        }
                      >
                        ❌ Cancel Order
                      </button>

                    )}

                </div>


                {/* CANCELLED MESSAGE */}

                {order.status === "Cancelled" && (

                  <div className="alert alert-danger mt-3 mb-0">

                    ❌ This order has been cancelled.

                  </div>

                )}


                {/* DELIVERED MESSAGE */}

                {order.status === "Delivered" && (

                  <div className="alert alert-success mt-3 mb-0">

                    🎉 Your order has been delivered successfully!

                  </div>

                )}

              </div>

            </div>

          </div>

        ))

      )}

    </div>
  );
}

export default Orders;