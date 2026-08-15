import { useEffect } from "react";
import { FaHeart, FaShoppingCart, FaTimes } from "react-icons/fa";

function ProductDetails({
  product,
  cart,
  setCart,
  wishlist = [],
  setWishlist,
  onClose,
}) {
  if (!product) return null;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    
    // Disable body scroll when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

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
    <div className="modal-backdrop-custom" onClick={onClose}>
      <div
        className="modal-content-custom card shadow-lg border-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close Details"
        >
          <FaTimes size={18} />
        </button>

        <div className="card-body p-3 p-md-4">
          <div className="row align-items-center g-3 g-md-4">
            
            {/* Product Image */}
            <div className="col-md-5 text-center">
              <img
                src={product.image}
                alt={product.title}
                className="img-fluid modal-product-img"
              />
            </div>

            {/* Product Information */}
            <div className="col-md-7">
              <span className="badge bg-success mb-2">
                Product Details
              </span>

              <h3 className="fw-bold modal-product-title text-start mb-2">
                {product.title}
              </h3>

              {/* Rating */}
              <div className="mb-2 d-flex align-items-center gap-2">
                <span className="text-warning">
                  {"⭐".repeat(Math.round(product.rating || 5))}
                </span>
                <span className="text-muted small">
                  ({product.rating || 5} Rating)
                </span>
              </div>

              {/* Price */}
              <div className="mb-3 d-flex align-items-baseline gap-2">
                <span className="text-success fw-bold fs-3">
                  ₹{product.price}
                </span>
                {product.oldPrice && (
                  <span className="text-muted text-decoration-line-through small">
                    ₹{product.oldPrice}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-muted modal-product-desc text-start mb-3">
                {product.description ||
                  "High quality product available at ShopSphere. Get the best deals and enjoy a great shopping experience."}
              </p>

              {/* Stock */}
              <p className="text-success fw-bold small mb-3">
                ✓ In Stock
              </p>

              <hr className="my-3" />

              {/* Buttons */}
              <div className="d-flex gap-2">
                <button
                  className="btn btn-primary flex-grow-1"
                  onClick={handleAddToCart}
                >
                  <FaShoppingCart className="me-2" />
                  Add to Cart
                </button>

                <button
                  className={`btn ${
                    isWishlisted
                      ? "btn-danger"
                      : "btn-outline-danger"
                  }`}
                  onClick={handleWishlist}
                  style={{ width: "auto" }}
                  title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  <FaHeart />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;