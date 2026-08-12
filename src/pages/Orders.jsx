import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  onSnapshot,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // LOAD USER ORDERS FROM FIRESTORE
  // =========================
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        setOrders([]);
        setLoading(false);
        return;
      }

      const ordersQuery = query(
        collection(db, "orders"),
        where("userId", "==", currentUser.uid)
      );

      const unsubscribeOrders = onSnapshot(
        ordersQuery,
        (snapshot) => {
          const firebaseOrders = snapshot.docs.map((orderDoc) => ({
            orderId: orderDoc.id,
            ...orderDoc.data(),
          }));

          // Latest orders first
          firebaseOrders.sort((a, b) => {
            const dateA = a.createdAt?.toMillis
              ? a.createdAt.toMillis()
              : 0;

            const dateB = b.createdAt?.toMillis
              ? b.createdAt.toMillis()
              : 0;

            return dateB - dateA;
          });

          setOrders(firebaseOrders);
          setLoading(false);
        },
        (error) => {
          console.error("Error loading orders from Firebase:", error);
          setLoading(false);
        }
      );

      return unsubscribeOrders;
    });

    return () => unsubscribeAuth();
  }, []);

  // =========================
  // CANCEL ORDER
  // =========================
  const cancelOrder = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) {
      return;
    }

    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        alert("Please login first 🔐");
        return;
      }

      await updateDoc(doc(db, "orders", orderId), {
        status: "Cancelled",
      });

      alert("Order cancelled successfully ❌");
    } catch (error) {
      console.error("Cancel Order Error:", error);
      alert("Order cancel nahi ho paya ❌");
    }
  };

  // =========================
  // STATUS TEXT
  // =========================
  const getStatusClass = (status) => {
    if (status === "Confirmed") {
      return "badge bg-success";
    }

    if (status === "Shipped") {
      return "badge bg-primary";
    }

    if (status === "Delivered") {
      return "badge bg-success";
    }

    if (status === "Cancelled") {
      return "badge bg-danger";
    }

    return "badge bg-secondary";
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" />
        <p className="mt-3">Loading your orders...</p>
      </div>
    );
  }

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
            <div className="card-header">

              <div className="d-flex justify-content-between align-items-center">

                <div>
                  <strong>
                    Order ID:
                  </strong>

                  <span className="text-primary ms-2">
                    #{order.orderId}
                  </span>
                </div>

                <div className="d-flex align-items-center gap-2">

                  <span className={getStatusClass(order.status)}>
                    {order.status || "Pending"}
                  </span>

                  <Link
                    to={`/order-details/${order.orderId}`}
                    className="btn btn-primary btn-sm"
                  >
                    View Details
                  </Link>

                </div>

              </div>

            </div>

            {/* ================= ORDER BODY ================= */}
            <div className="card-body">

              <div className="row">

                {/* ================= PRODUCTS ================= */}
                <div className="col-md-8">

                  <h5 className="mb-3">
                    Products
                  </h5>

                  {order.items?.map((item) => (

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
                      {order.date || "N/A"}
                    </p>

                    <p>
                      <strong>Payment:</strong>
                      <br />
                      {order.paymentMethod || "N/A"}
                    </p>

                    <p>
                      <strong>Customer:</strong>
                      <br />
                      {order.customerName || "N/A"}
                    </p>

                    <hr />

                    <h5 className="text-success">
                      Total: ₹{order.total || 0}
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

                <div className="d-flex justify-content-between text-center mt-4">

                  {/* CONFIRMED */}
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

                  {/* SHIPPED */}
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

                  {/* DELIVERED */}
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

                {/* ================= CANCEL BUTTON ================= */}
                {order.status !== "Delivered" &&
                  order.status !== "Cancelled" && (

                    <div className="mt-4">

                      <button
                        className="btn btn-outline-danger"
                        onClick={() =>
                          cancelOrder(order.orderId)
                        }
                      >
                        ❌ Cancel Order
                      </button>

                    </div>

                  )}

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