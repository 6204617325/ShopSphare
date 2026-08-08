function HeroBanner() {
  return (
    <div className="container-fluid bg-primary text-white py-5">
      <div className="container">
        <div className="row align-items-center">

          <div className="col-md-6">
            <h1 className="display-4 fw-bold">
              Big Billion Sale
            </h1>

            <p className="lead">
              Up to 70% OFF 
            </p>

            <button className="btn btn-warning btn-lg">
              Shop Now
            </button>
          </div>

          <div className="col-md-6 text-center">
            <h1 style={{ fontSize: "120px" }}>🛍️</h1>
          </div>

        </div>
      </div>
    </div>
  );
}

export default HeroBanner;