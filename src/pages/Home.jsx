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
    <>
      <Navbar 
        search={search}
        setSearch={setSearch}
        cart={cart}
        wishlist={wishlist}
      />
      <CategoryBar/>

      <HeroBanner />

      <DealsSection
        search={search}
        cart={cart}
        setCart={setCart}
        wishlist={wishlist}
        setWishlist={setWishlist}
      />

      <Footer />
    </>
  );
}

export default Home;