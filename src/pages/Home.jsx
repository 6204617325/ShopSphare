import { useState } from "react";

import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import DealsSection from "../components/DealsSection";
import Footer from "../components/Footer";
import CategoryBar from "../components/CategoryBar";
import ProductDetails from "../components/ProductDetails";

function Home({ cart, setCart, wishlist, setWishlist }) {
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] =
    useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="home-page">

      {/* Navbar */}
      <Navbar
        search={search}
        setSearch={setSearch}
        cart={cart}
        wishlist={wishlist}
      />

      {/* Categories */}
       <CategoryBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <main>

        {/* Hero */}
        <section>
          <HeroBanner />
        </section>

        {/* Products */}
        <section className="container py-5">

          <div className="text-center mb-4">

            <h2 className="fw-bold mb-2">
              🛍️ Explore Our Products
            </h2>

            <p className="text-muted">
              Discover the best deals and latest products
            </p>

          </div>

          <DealsSection
            search={search}
            selectedCategory={selectedCategory}
            cart={cart}
            setCart={setCart}
            wishlist={wishlist}
            setWishlist={setWishlist}
            setSelectedProduct={setSelectedProduct}
          />

          {/* Product Details */}
          {selectedProduct && (
            <ProductDetails
              product={selectedProduct}
              cart={cart}
              setCart={setCart}
              wishlist={wishlist}
              setWishlist={setWishlist}
              onClose={() => setSelectedProduct(null)}
            />
          )}

        </section>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default Home;