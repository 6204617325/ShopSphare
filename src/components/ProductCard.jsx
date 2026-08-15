import { FaHeart, FaRegHeart } from "react-icons/fa";

function ProductCard({
  image,
  title,
  price,
  oldPrice,
  onAddToCart,
  product,
  wishlist = [],
  setWishlist,
}) {
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (isWishlisted) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    onAddToCart();
  };

  return (
    <div className="card product-card-custom shadow-sm p-2 pb-3 h-100">
      {/* ❤️ Wishlist Button */}
      <div className="text-end mb-1">
        {isWishlisted ? (
          <FaHeart
            size={18}
            className="text-danger"
            style={{ cursor: "pointer" }}
            onClick={handleWishlistClick}
          />
        ) : (
          <FaRegHeart
            size={18}
            className="text-muted hover-danger"
            style={{ cursor: "pointer" }}
            onClick={handleWishlistClick}
          />
        )}
      </div>

      {/* Product Image */}
      <div className="product-image-container">
        <img
          src={image}
          alt={title}
          className="card-img-top product-card-img"
        />
      </div>

      {/* Product Details */}
      <div className="card-body p-2 d-flex flex-column justify-content-between text-center">
        <div>
          <h6 className="product-card-title mb-1 text-truncate-2" title={title}>
            {title}
          </h6>

          <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
            <span className="text-success fw-bold product-card-price">
              ₹{price}
            </span>
            {oldPrice && (
              <span className="text-muted text-decoration-line-through small-old-price">
                ₹{oldPrice}
              </span>
            )}
          </div>
        </div>

        <button
          className="btn btn-primary btn-sm product-card-btn w-100 mt-2"
          onClick={handleAddToCartClick}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;