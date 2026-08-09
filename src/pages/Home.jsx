import { useState } from "react";

import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import DealsSection from "../components/DealsSection";
import Footer from "../components/Footer";
import CategoryBar from "../components/CategoryBar";

function Home({ cart, setCart }) {
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");

  return (
    <div className="bg-light min-vh-100">

      {/* Navbar */}
      <Navbar
        search={search}
        setSearch={setSearch}
        cart={cart}
        wishlist={wishlist}
      />

      {/* Category Navigation */}
      <CategoryBar />

      {/* Main Home Content */}
      <main>

        {/* Hero Section */}
        <section className="container-fluid px-0">
          <HeroBanner />
        </section>

        {/* Products / Deals */}
        <section className="container py-5">

          <div className="text-center mb-4">
            <h2 className="fw-bold mb-2">
              🛍️ Explore Our Products
            </h2>

            <p className="text-muted mb-0">
              Discover the best deals and latest products
            </p>
          </div>

          <DealsSection
            search={search}
            cart={cart}
            setCart={setCart}
            wishlist={wishlist}
            setWishlist={setWishlist}
          />

        </section>

      </main>

      {/* Footer - Only Home Page */}
      <Footer />

    </div>
  );
}

export default Home;