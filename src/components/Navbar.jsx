import { Link } from "react-router-dom";

import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUserCircle,
} from "react-icons/fa";

function Navbar({ search, setSearch, cart, wishlist }) {
  return (
    <nav className="shop-navbar w-100">
      <div className="shop-navbar-inner">

        {/* Logo */}
        <Link to="/home" className="text-decoration-none navbar-logo">
          <h2 className="text-primary fw-bold m-0 navbar-brand-text">
            🛍 ShopSphere
          </h2>
        </Link>

        {/* Search Bar — middle on desktop, full-width row 2 on mobile */}
        <div className="navbar-search-row">
          <div className="input-group navbar-search-group">
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

        {/* Right Icons */}
        <div className="d-flex align-items-center gap-3 navbar-icons">

          <Link
            to="/orders"
            className="text-decoration-none text-dark navbar-orders-link"
          >
            📦 <span className="orders-text">Orders</span>
          </Link>

          <Link
            to="/wishlist"
            className="text-decoration-none text-dark position-relative"
          >
            <FaHeart size={20} className="text-danger" />
            {wishlist && wishlist.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "9px" }}>
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="text-decoration-none text-dark position-relative"
          >
            <FaShoppingCart size={22} />
            {cart && cart.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "9px" }}>
                {cart.length}
              </span>
            )}
          </Link>

          <Link to="/profile" className="text-dark text-decoration-none">
            <FaUserCircle size={26} />
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;