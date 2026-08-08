import { Link } from "react-router-dom";

import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUserCircle,
} from "react-icons/fa";

function Navbar({ search, setSearch, cart, wishlist }) {
  return (
    <nav className="container py-3">

      <div className="d-flex align-items-center justify-content-between">

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
          to="/Orders"
          className="text-decoration-none text-dark "
          >📦 Orders </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="text-decoration-none text-dark position-relative"
          >

            <FaHeart
              size={22}
              className="text-danger"
            />

            {/* Wishlist Count */}
            {wishlist && wishlist.length > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              >
                {wishlist.length}
              </span>
            )}

          </Link>


          {/* Cart */}
          <Link
            to="/cart"
            className="text-decoration-none text-dark position-relative"
          >

            <FaShoppingCart size={24} />

            {/* Cart Count */}
            {cart && cart.length > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              >
                {cart.length}
              </span>
            )}

          </Link>


          {/* User */}
          <FaUserCircle
            size={28}
            style={{ cursor: "pointer" }}
          />

        </div>

      </div>

    </nav>
  );
}

export default Navbar;