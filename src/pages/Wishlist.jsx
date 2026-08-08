import { Link } from "react-router-dom";

function Wishlist({ wishlist, setWishlist, cart, setCart }) {

  // Remove from Wishlist
  const removeItem = (id) => {
    const updatedWishlist = wishlist.filter(
      (item) => item.id !== id
    );

    setWishlist(updatedWishlist);
  };

  // Move to Cart
  const moveToCart = (product) => {

    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {

      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
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

    removeItem(product.id);
  };
  

  return (
    <div className="container mt-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold text-danger">
            ❤️ My Wishlist
          </h2>

          <Link
            to="/home"
            className="text-decoration-none"
          >
            ← Continue Shopping
          </Link>

        </div>

      </div>

      {wishlist.length === 0 ? (

        <div className="text-center mt-5">

          <h3>Your Wishlist is Empty 💔</h3>

          <p>Add your favourite products.</p>

        </div>

      ) : (

        wishlist.map((item) => (

          <div
            key={item.id}
            className="card shadow-sm mb-3 p-3"
          >

            <div className="row align-items-center">

              {/* Image */}
              <div className="col-md-2">

                <img
                  src={item.image}
                  alt={item.title}
                  className="img-fluid"
                  style={{
                    height: "120px",
                    objectFit: "contain",
                  }}
                />

              </div>

              {/* Details */}
              <div className="col-md-6">

                <h4>{item.title}</h4>

                <h5 className="text-success">
                  ₹{item.price}
                </h5>

                <small className="text-decoration-line-through text-muted">
                  ₹{item.oldPrice}
                </small>

              </div>

              {/* Buttons */}
              <div className="col-md-4 text-end">

                <button
                  className="btn btn-primary me-2"
                  onClick={() => moveToCart(item)}
                >
                  Move To Cart
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>

              </div>

            </div>

          </div>

        ))

      )}

    </div>
  );
}

export default Wishlist;