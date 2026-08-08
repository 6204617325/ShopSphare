import { FaHeart } from "react-icons/fa";

function ProductCard({
  image,
  title,
  price,
  oldPrice,
  onAddToCart,
  product,
  wishlist,
  setWishlist,
}) {

  const addToWishlist = () => {

    const exists = wishlist.find(
      (item) => item.id === product.id
    );

    if (!exists) {
      setWishlist([
        ...wishlist,
        product,
      ]);
    }

  };

  return (

    <div className="card shadow-sm p-3" style={{ width: "220px" }}>

      {/* ❤️ Wishlist Button */}
      <div className="text-end mb-2">

        <FaHeart
          size={22}
          className="text-danger"
          style={{ cursor: "pointer" }}
          onClick={addToWishlist}
        />

      </div>

      {/* Product Image */}
      <img
        src={image}
        alt={title}
        className="card-img-top"
        style={{ height: "180px", objectFit: "contain" }}
      />

      {/* Product Details */}
      <div className="card-body text-center">

        <h6>{title}</h6>

        <h5 className="text-success">
          ₹{price}
        </h5>

        <small className="text-muted text-decoration-line-through">
          ₹{oldPrice}
        </small>

        <br />

        <button
          className="btn btn-primary mt-3 w-100"
          onClick={onAddToCart}
        >
          Add to Cart
        </button>

      </div>

    </div>

  );
}

export default ProductCard;