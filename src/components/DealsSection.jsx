import ProductCard from "./ProductCard";
import products from "../data/products";

function DealsSection({ search, cart, setCart ,wishlist,setWishlist }) {
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  function handleAddToCart(product) {

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

}

  return (
    <div className="container my-5">

      <h2 className="mb-4 fw-bold">
        🔥 Deals of the Day
      </h2>

      <div className="row">

        {filteredProducts.map((product) => (
          <div className="col-md-3 mb-4" key={product.id}>

            <ProductCard
              image={product.image}
              title={product.title}
              price={product.price}
              oldPrice={product.oldPrice}
              onAddToCart={() => handleAddToCart(product)}
              product={product}
            
              wishlist={wishlist}
              setWishlist={setWishlist}
            />

          </div>
        ))}

      </div>

    </div>
  );
}

export default DealsSection;