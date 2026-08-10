import { FaHeart, FaShoppingCart } from "react-icons/fa";

function ProductDetails({
  product,
  cart,
  setCart,
  wishlist,
  setWishlist,
}) {
  if (!product) return null;

  const handleAddToCart = () => {
    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );

      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const isWishlisted =
    wishlist?.some((item) => item.id === product.id);

  const handleWishlist = () => {
    if (isWishlisted) {
      setWishlist(
        wishlist.filter(
          (item) => item.id !== product.id
        )
      );
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  return (
    <div className="card shadow-lg border-0 mt-5 mb-5">
      <div className="card-body p-4">

        <div className="row align-items-center">

          {/* Product Image */}
          <div className="col-md-5 text-center">

            <img
              src={product.image}
              alt={product.title}
              className="img-fluid"
              style={{
                width: "320px",
                height: "320px",
                objectFit: "contain",
              }}
            />

          </div>

          {/* Product Information */}
          <div className="col-md-7">

            <span className="badge bg-success mb-3">
              Product Details
            </span>

            <h2 className="fw-bold">
              {product.title}
            </h2>

            {/* Rating */}
            <div className="mb-3">
              <span className="text-warning fs-5">
                ⭐⭐⭐⭐⭐
              </span>

              <span className="text-muted ms-2">
                Customer Rating
              </span>
            </div>

            {/* Price */}
            <div className="mb-3">

              <span className="text-success fw-bold fs-2">
                ₹{product.price}
              </span>

              {product.oldPrice && (
                <span className="text-muted text-decoration-line-through ms-3 fs-5">
                  ₹{product.oldPrice}
                </span>
              )}

            </div>

            {/* Description */}
            <p className="text-muted">
              {product.description ||
                "High quality product available at ShopSphere. Get the best deals and enjoy a great shopping experience."}
            </p>

            {/* Stock */}
            <p className="text-success fw-bold">
              ✓ In Stock
            </p>

            <hr />

            {/* Buttons */}
            <div className="d-flex gap-3">

              <button
                className="btn btn-primary btn-lg"
                onClick={handleAddToCart}
              >
                <FaShoppingCart className="me-2" />
                Add to Cart
              </button>

              <button
                className={`btn btn-lg ${
                  isWishlisted
                    ? "btn-danger"
                    : "btn-outline-danger"
                }`}
                onClick={handleWishlist}
              >
                <FaHeart className="me-2" />
                {isWishlisted
                  ? "Wishlisted"
                  : "Wishlist"}
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default ProductDetails;