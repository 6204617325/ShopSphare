import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";
import Navbar from "../components/Navbar";

import {
  FaBox,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaMapMarkerAlt,
  FaGift,
  FaBell,
  FaPhone,
  FaComment,
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  function handleLogout() {
    navigate("/");
  }

  return (
    <>
  <Navbar />

  <div className="dashboard">

    <div className="dashboard">
      <h1>🏪 ShopSphere Dashboard</h1>

      <h2>Welcome Abhay 👋</h2>

      <div className="dashboard-grid">
        <DashboardCard
          icon={<FaBox />}
          title="My Orders"
          description="View your recent orders"
        />

        <DashboardCard
          icon={<FaHeart />}
          title="Wishlist"
          description="Your saved products"
        />

        <DashboardCard
          icon={<FaShoppingCart />}
          title="My Cart"
          description="Items in your shopping cart"
        />

        <DashboardCard
          icon={<FaUser />}
          title="Profile"
          description="Manage your account"
        />

        <DashboardCard
          icon={<FaMapMarkerAlt />}
          title="Saved Addresses"
          description="Manage your addresses"
        />

        <DashboardCard
          icon={<FaGift />}
          title="Offers"
          description="View available coupons"
        />

        <DashboardCard
          icon={<FaBell />}
          title="Notifications"
          description="Latest notifications"
        />

        <DashboardCard
          icon={<FaPhone />}
          title="Help"
          description="Need help?"
        />

        <DashboardCard
          icon={<FaComment/>}
          title="Feedback"
          description="Share your experience"
        />
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>

  </div>
  </>
  );
}

export default Dashboard;
