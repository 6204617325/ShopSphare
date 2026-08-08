function CategoryBar() {

  const categories = [
    "Home",
    "Mobiles",
    "Electronics",
    "Fashion",
    "Beauty",
    "Furniture",
    "Grocery",
    "Sports"
  ];

  return (

    <div className="d-flex justify-content-center gap-5 py-3 bg-light shadow-sm">

      {categories.map((item) => (

        <span
          key={item}
          style={{
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          {item}
        </span>

      ))}

    </div>

  );
}

export default CategoryBar;