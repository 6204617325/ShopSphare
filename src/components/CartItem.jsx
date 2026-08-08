function CartItem({
  item,
  index,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
}) {

  return (

    <div className="card mb-3 shadow-sm p-3">

      <div className="row align-items-center">

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

        <div className="col-md-6">

          <h4>{item.title}</h4>

          <h5 className="text-success">
            ₹{item.price}
          </h5>

          <h6>
            Quantity : {item.quantity}
          </h6>

          <h6>
            Total : ₹{item.price * item.quantity}
          </h6>

          <small className="text-decoration-line-through text-muted">
            ₹{item.oldPrice}
          </small>

        </div>

        <div className="col-md-4 text-end">

          <div className="d-flex justify-content-end align-items-center gap-2 mb-3">

            <button
              className="btn btn-outline-danger"
              onClick={() => decreaseQuantity(item.id)}
            >
              -
            </button>

            <strong>{item.quantity}</strong>

            <button
              className="btn btn-outline-success"
              onClick={() => increaseQuantity(item.id)}
            >
              +
            </button>

          </div>

          <button
            className="btn btn-danger"
            onClick={() => removeItem(index)}
          >
            Remove
          </button>

        </div>

      </div>

    </div>

  );
}

export default CartItem;