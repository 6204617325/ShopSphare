function CategoryBar({
  selectedCategory,
  setSelectedCategory,
}) {
  const categories = [
    "All",
    "Home",
    "Mobiles",
    "Electronics",
    "Fashion",
    "Beauty",
    "Furniture",
    "Grocery",
    "Sports",
  ];

  return (
    <div className="category-bar">
      <div className="category-container">
        {categories.map((category, index) => (
          <div
            key={category}
            className="category-item"
          >
            <button
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "category-button active"
                  : "category-button"
              }
            >
              {category}
            </button>

            {index < categories.length - 1 && (
              <span className="category-divider">|</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryBar;