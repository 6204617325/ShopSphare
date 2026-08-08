import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import PriceDetails from "../components/PriceDetails";

function Cart({ cart, setCart }) {

  // Remove Product
  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  // Increase Quantity
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCart(updatedCart);
  };

  // Decrease Quantity
  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-4">

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold text-primary">
            🛍 ShopSphere
          </h2>

          <Link
            to="/home"
            className="text-decoration-none"
          >
            ← Continue Shopping
          </Link>

        </div>

        <h2>🛒 My Cart</h2>

      </div>

      {cart.length === 0 ? (

        <div className="text-center mt-5">

          <h3>Your Cart is Empty 😢</h3>

          <p>Add some products to continue shopping.</p>

        </div>

      ) : (

        <div className="row">

          {/* Products */}

          <div className="col-lg-8">

            {cart.map((item, index) => (

              <CartItem
                key={index}
                item={item}
                index={index}
                removeItem={removeItem}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
              />

            ))}

          </div>

          {/* Price Details */}

          <div className="col-lg-4">

            <PriceDetails
              cart={cart}
              totalPrice={totalPrice}
            />

          </div>

        </div>

      )}

    </div>
  );
}

export default Cart;