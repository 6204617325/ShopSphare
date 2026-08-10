import { Link } from "react-router-dom";

import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUserCircle,
} from "react-icons/fa";

function Navbar({ search, setSearch, cart, wishlist }) {
  return (
    <nav className="w-100">
  <div className="d-flex align-items-center justify-content-between w-100">

    {/* Logo */}
    <Link
      to="/home"
      className="text-decoration-none"
    >
      <h2 className="text-primary fw-bold m-0">
        🛍 ShopSphere
      </h2>
    </Link>

    {/* Search */}
    <div style={{ width: "40%" }}>
      <div className="input-group">

        <input
          type="text"
          className="form-control"
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <span className="input-group-text">
          <FaSearch />
        </span>

      </div>
    </div>

    {/* Right Side */}
    <div className="d-flex align-items-center gap-4">

      <Link
        to="/orders"
        className="text-decoration-none text-dark"
      >
        📦 Orders
      </Link>

      <Link
        to="/wishlist"
        className="text-decoration-none text-dark position-relative"
      >
        <FaHeart
          size={22}
          className="text-danger"
        />

        {wishlist && wishlist.length > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {wishlist.length}
          </span>
        )}
      </Link>

      <Link
        to="/cart"
        className="text-decoration-none text-dark position-relative"
      >
        <FaShoppingCart size={24} />

        {cart && cart.length > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {cart.length}
          </span>
        )}
      </Link>

      <Link
        to="/profile"
        className="text-dark text-decoration-none"
      >
        <FaUserCircle size={28} />
      </Link>

    </div>

  </div>
</nav>
  );
}

export default Navbar;