import ProductCard from "./ProductCard";
import products from "../data/products";

function DealsSection({
  search,
  selectedCategory,
  cart,
  setCart,
  wishlist,
  setWishlist,
  setSelectedProduct,
}) {
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory==="All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  function handleAddToCart(product) {
    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
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
    <>
      <h2 className="mb-4 fw-bold home-section-title">
        🔥 Deals of the Day
      </h2>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-5">
          <h4>😕 No Products Found</h4>
          <p className="text-muted">
            Try another category or search.
          </p>
        </div>
      ) : (
        <div className="row g-2 g-md-3 g-lg-4">
          {filteredProducts.map((product) => (
            <div
              className="col-6 col-sm-6 col-md-4 col-lg-3 mb-2 mb-md-3"
              key={product.id}
            >
              <div
                onClick={() => setSelectedProduct(product)}
                style={{ cursor: "pointer" }}
                className="h-100 d-block"
              >
                <ProductCard
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  oldPrice={product.oldPrice}
                  onAddToCart={() =>
                    handleAddToCart(product)
                  }
                  product={product}
                  wishlist={wishlist}
                  setWishlist={setWishlist}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default DealsSection;