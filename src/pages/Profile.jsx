import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const savedUser =
    JSON.parse(localStorage.getItem("user")) || {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    };

  const [user, setUser] = useState(savedUser);
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));

    alert("Profile Updated Successfully 🎉");

    setEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");

    alert("Logged Out Successfully 👋");

    navigate("/");
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
            to="/home"
            className="text-decoration-none"
          >
            ← Back to Home
          </Link>
        </div>

        <h2 className="fw-bold">
          👤 My Profile
        </h2>

      </div>


      {/* Profile Card */}
      <div
        className="card shadow-lg mx-auto"
        style={{ maxWidth: "700px" }}
      >

        <div className="card-body p-5">

          {/* Profile Icon */}
          <div className="text-center mb-4">

            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto"
              style={{
                width: "100px",
                height: "100px",
                fontSize: "45px",
              }}
            >
              👤
            </div>

            <h3 className="fw-bold mt-3">
              {user.fullName || "User"}
            </h3>

            <p className="text-muted">
              ShopSphere Customer
            </p>

          </div>


          <hr />


          {/* Full Name */}
          <div className="mb-3">

            <label className="form-label fw-bold">
              Full Name
            </label>

            <input
              type="text"
              className="form-control"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
              disabled={!editing}
            />

          </div>


          {/* Email */}
          <div className="mb-3">

            <label className="form-label fw-bold">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              name="email"
              value={user.email}
              onChange={handleChange}
              disabled={!editing}
            />

          </div>


          {/* Phone */}
          <div className="mb-3">

            <label className="form-label fw-bold">
              Phone Number
            </label>

            <input
              type="text"
              className="form-control"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              disabled={!editing}
            />

          </div>


          {/* Address */}
          <div className="mb-3">

            <label className="form-label fw-bold">
              Address
            </label>

            <textarea
              className="form-control"
              rows="3"
              name="address"
              value={user.address}
              onChange={handleChange}
              disabled={!editing}
            />

          </div>


          <div className="row">

            {/* City */}
            <div className="col-md-6 mb-3">

              <label className="form-label fw-bold">
                City
              </label>

              <input
                type="text"
                className="form-control"
                name="city"
                value={user.city}
                onChange={handleChange}
                disabled={!editing}
              />

            </div>


            {/* State */}
            <div className="col-md-6 mb-3">

              <label className="form-label fw-bold">
                State
              </label>

              <input
                type="text"
                className="form-control"
                name="state"
                value={user.state}
                onChange={handleChange}
                disabled={!editing}
              />

            </div>


            {/* Pincode */}
            <div className="col-md-6 mb-3">

              <label className="form-label fw-bold">
                Pincode
              </label>

              <input
                type="text"
                className="form-control"
                name="pincode"
                value={user.pincode}
                onChange={handleChange}
                disabled={!editing}
              />

            </div>

          </div>


          {/* Buttons */}
          <div className="d-flex gap-2 mt-4">

            {!editing ? (

              <button
                className="btn btn-primary w-100"
                onClick={() => setEditing(true)}
              >
                ✏️ Edit Profile
              </button>

            ) : (

              <button
                className="btn btn-success w-100"
                onClick={handleSave}
              >
                💾 Save Changes
              </button>

            )}

            <button
              className="btn btn-danger w-100"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;