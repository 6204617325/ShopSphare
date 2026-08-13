import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";

import { auth, db } from "../firebase";

function AdminDashboard() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrder, setUpdatingOrder] =
    useState(null);

  // =========================================
  // LOAD ORDERS
  // =========================================

  useEffect(() => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      navigate("/");
      return;
    }

    const ordersQuery = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      ordersQuery,
      (snapshot) => {
        const orderList =
          snapshot.docs.map((orderDoc) => ({
            id: orderDoc.id,
            ...orderDoc.data(),
          }));

        setOrders(orderList);
        setLoading(false);
      },
      (error) => {
        console.error(
          "Admin Orders Error:",
          error
        );

        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [navigate]);

  // =========================================
  // UPDATE ORDER STATUS
  // =========================================

  const updateOrderStatus = async (
    orderId,
    newStatus
  ) => {
    try {
      setUpdatingOrder(orderId);

      await updateDoc(
        doc(db, "orders", orderId),
        {
          status: newStatus,
          updatedAt: new Date(),
        }
      );

      console.log(
        `Order ${orderId} -> ${newStatus} ✅`
      );

      alert(
        `Order status updated to ${newStatus} ✅`
      );
    } catch (error) {
      console.error(
        "Status Update Error:",
        error
      );

      alert(
        "Order status update nahi hua ❌\n\n" +
          error.message
      );
    } finally {
      setUpdatingOrder(null);
    }
  };

  // =========================================
  // COUNTS
  // =========================================

  const pendingOrders =
    orders.filter(
      (order) =>
        order.status === "Pending"
    ).length;

  const confirmedOrders =
    orders.filter(
      (order) =>
        order.status === "Confirmed"
    ).length;

  const processingOrders =
    orders.filter(
      (order) =>
        order.status === "Processing"
    ).length;

  const shippedOrders =
    orders.filter(
      (order) =>
        order.status === "Shipped"
    ).length;

  const deliveredOrders =
    orders.filter(
      (order) =>
        order.status === "Delivered"
    ).length;

  const totalSales =
    orders.reduce(
      (total, order) =>
        total +
        Number(order.total || 0),
      0
    );

  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = async () => {
    await auth.signOut();

    navigate("/");
  };

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className="container text-center mt-5">

        <div className="spinner-border text-primary" />

        <h4 className="mt-3">
          Loading Admin Dashboard...
        </h4>

      </div>
    );
  }

  // =========================================
  // UI
  // =========================================

  return (
    <div className="container-fluid p-4">

      {/* HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h1 className="fw-bold text-primary">
            👑 ShopSphere Admin
          </h1>

          <p className="text-muted mb-0">
            Manage your ShopSphere store
          </p>

        </div>

        <button
          className="btn btn-danger"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>

      </div>

      <hr />

      {/* STATISTICS */}

      <div className="row g-4 mb-5">

        {/* TOTAL */}

        <div className="col-md-6 col-lg-3">

          <div className="card shadow-sm border-0 h-100">

            <div className="card-body">

              <h6 className="text-muted">
                Total Orders
              </h6>

              <h2 className="fw-bold">
                📦 {orders.length}
              </h2>

            </div>

          </div>

        </div>

        {/* PENDING */}

        <div className="col-md-6 col-lg-3">

          <div className="card shadow-sm border-0 h-100">

            <div className="card-body">

              <h6 className="text-muted">
                Pending
              </h6>

              <h2 className="fw-bold text-warning">
                ⏳ {pendingOrders}
              </h2>

            </div>

          </div>

        </div>

        {/* CONFIRMED */}

        <div className="col-md-6 col-lg-3">

          <div className="card shadow-sm border-0 h-100">

            <div className="card-body">

              <h6 className="text-muted">
                Confirmed
              </h6>

              <h2 className="fw-bold text-success">
                ✅ {confirmedOrders}
              </h2>

            </div>

          </div>

        </div>

        {/* SALES */}

        <div className="col-md-6 col-lg-3">

          <div className="card shadow-sm border-0 h-100">

            <div className="card-body">

              <h6 className="text-muted">
                Total Sales
              </h6>

              <h2 className="fw-bold text-success">
                ₹
                {totalSales.toLocaleString(
                  "en-IN"
                )}
              </h2>

            </div>

          </div>

        </div>

      </div>

      {/* STATUS */}

      <div className="card shadow-sm border-0 mb-5">

        <div className="card-body">

          <h4 className="fw-bold mb-4">
            📊 Order Status
          </h4>

          <div className="row text-center">

            <div className="col-md mb-3">

              <div className="p-3 bg-light rounded">

                <h2>⏳</h2>

                <h5>Pending</h5>

                <strong>
                  {pendingOrders}
                </strong>

              </div>

            </div>

            <div className="col-md mb-3">

              <div className="p-3 bg-light rounded">

                <h2>✅</h2>

                <h5>Confirmed</h5>

                <strong>
                  {confirmedOrders}
                </strong>

              </div>

            </div>

            <div className="col-md mb-3">

              <div className="p-3 bg-light rounded">

                <h2>⚙️</h2>

                <h5>Processing</h5>

                <strong>
                  {processingOrders}
                </strong>

              </div>

            </div>

            <div className="col-md mb-3">

              <div className="p-3 bg-light rounded">

                <h2>🚚</h2>

                <h5>Shipped</h5>

                <strong>
                  {shippedOrders}
                </strong>

              </div>

            </div>

            <div className="col-md mb-3">

              <div className="p-3 bg-light rounded">

                <h2>🎉</h2>

                <h5>Delivered</h5>

                <strong>
                  {deliveredOrders}
                </strong>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ORDERS */}

      <div className="card shadow-sm border-0">

        <div className="card-body">

          <h4 className="fw-bold mb-4">
            📦 Customer Orders
          </h4>

          {orders.length === 0 ? (

            <div className="text-center p-5">

              <h4>
                No Orders Yet
              </h4>

              <p className="text-muted">
                Customer orders will appear here.
              </p>

            </div>

          ) : (

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead>

                  <tr>

                    <th>Order ID</th>

                    <th>Customer</th>

                    <th>Email</th>

                    <th>Payment</th>

                    <th>Total</th>

                    <th>Status</th>

                    <th>Action</th>

                  </tr>

                </thead>

                <tbody>

                  {orders.map((order) => (

                    <tr key={order.id}>

                      <td>
                        <strong>
                          #{order.orderId ||
                            order.id}
                        </strong>
                      </td>

                      <td>
                        {order.customerName ||
                          "Customer"}
                      </td>

                      <td>
                        {order.customerEmail ||
                          "N/A"}
                      </td>

                      <td>
                        {order.paymentMethod ||
                          "N/A"}
                      </td>

                      <td>
                        ₹
                        {Number(
                          order.total || 0
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </td>

                      <td>

                        <span
                          className={
                            order.status ===
                            "Pending"
                              ? "badge bg-warning text-dark"
                              : order.status ===
                                "Confirmed"
                              ? "badge bg-success"
                              : order.status ===
                                "Processing"
                              ? "badge bg-primary"
                              : order.status ===
                                "Shipped"
                              ? "badge bg-info text-dark"
                              : order.status ===
                                "Delivered"
                              ? "badge bg-success"
                              : "badge bg-secondary"
                          }
                        >
                          {order.status ||
                            "Pending"}
                        </span>

                      </td>

                      <td>

                        {/* PENDING -> CONFIRMED */}

                        {order.status ===
                          "Pending" && (

                          <button
                            className="btn btn-success btn-sm"
                            disabled={
                              updatingOrder ===
                              order.id
                            }
                            onClick={() =>
                              updateOrderStatus(
                                order.id,
                                "Confirmed"
                              )
                            }
                          >
                            {updatingOrder ===
                            order.id
                              ? "..."
                              : "✅ Confirm"}
                          </button>

                        )}

                        {/* CONFIRMED -> PROCESSING */}

                        {order.status ===
                          "Confirmed" && (

                          <button
                            className="btn btn-primary btn-sm"
                            disabled={
                              updatingOrder ===
                              order.id
                            }
                            onClick={() =>
                              updateOrderStatus(
                                order.id,
                                "Processing"
                              )
                            }
                          >
                            ⚙️ Processing
                          </button>

                        )}

                        {/* PROCESSING -> SHIPPED */}

                        {order.status ===
                          "Processing" && (

                          <button
                            className="btn btn-warning btn-sm"
                            disabled={
                              updatingOrder ===
                              order.id
                            }
                            onClick={() =>
                              updateOrderStatus(
                                order.id,
                                "Shipped"
                              )
                            }
                          >
                            🚚 Shipped
                          </button>

                        )}

                        {/* SHIPPED -> DELIVERED */}

                        {order.status ===
                          "Shipped" && (

                          <button
                            className="btn btn-success btn-sm"
                            disabled={
                              updatingOrder ===
                              order.id
                            }
                            onClick={() =>
                              updateOrderStatus(
                                order.id,
                                "Delivered"
                              )
                            }
                          >
                            🎉 Delivered
                          </button>

                        )}

                        {/* DELIVERED */}

                        {order.status ===
                          "Delivered" && (

                          <span className="text-success fw-bold">
                            ✔ Completed
                          </span>

                        )}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;