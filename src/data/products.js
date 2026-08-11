import iphone from "../assets/products/iphone.png";
import laptop from "../assets/products/laptop.png";
import watch from "../assets/products/watch.png";
import shoes from "../assets/products/shoes.png";

const products = [
  // =========================
  // 📱 ELECTRONICS
  // =========================

  {
    id: 1,
    title: "iPhone 15 Pro",
    price: 129999,
    oldPrice: 139999,
    category: "Mobiles",
    image: iphone,
    description:
      "Premium smartphone with powerful performance and an advanced camera system.",
    rating: 4.8,
  },

  {
    id: 2,
    title: "Gaming Laptop",
    price: 79999,
    oldPrice: 89999,
    category: "Electronics",
    image: laptop,
    description:
      "High-performance gaming laptop suitable for gaming, work and entertainment.",
    rating: 4.7,
  },

  {
    id: 3,
    title: "Smart Watch",
    price: 4999,
    oldPrice: 6999,
    category: "Electronics",
    image: watch,
    description:
      "Smartwatch with fitness tracking, notifications and everyday health features.",
    rating: 4.5,
  },

  {
    id: 4,
    title: "Running Shoes",
    price: 2499,
    oldPrice: 3999,
    category: "Sports",
    image: shoes,
    description:
      "Lightweight running shoes designed for comfort and everyday activities.",
    rating: 4.6,
  },

  {
    id: 5,
    title: "Samsung Galaxy S24",
    price: 64999,
    oldPrice: 71999,
    category: "Mobiles",
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80",
    description:
      "Premium Samsung smartphone with a vibrant display and powerful camera.",
    rating: 4.7,
  },

  {
    id: 6,
    title: "Sony Wireless Headphones",
    price: 24999,
    oldPrice: 29999,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80",
    description:
      "Premium wireless headphones with noise cancellation and immersive sound.",
    rating: 4.8,
  },

  {
    id: 7,
    title: "Apple AirPods Pro",
    price: 18999,
    oldPrice: 24999,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80",
    description:
      "Wireless earbuds with active noise cancellation and a comfortable fit.",
    rating: 4.7,
  },

  {
    id: 8,
    title: "JBL Bluetooth Speaker",
    price: 3499,
    oldPrice: 4999,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80",
    description:
      "Portable Bluetooth speaker with powerful audio and long battery life.",
    rating: 4.5,
  },

  {
    id: 9,
    title: "Logitech Wireless Mouse",
    price: 1299,
    oldPrice: 1699,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=600&q=80",
    description:
      "Comfortable wireless mouse with accurate tracking and reliable connectivity.",
    rating: 4.3,
  },

  {
    id: 10,
    title: "Apple Watch Series 9",
    price: 39999,
    oldPrice: 44999,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=600&q=80",
    description:
      "Smartwatch with fitness tracking, notifications and advanced health features.",
    rating: 4.7,
  },

  // =========================
  // 👕 FASHION
  // =========================

  {
    id: 11,
    title: "Men's Casual Cotton Shirt",
    price: 1299,
    oldPrice: 1999,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80",
    description:
      "Comfortable cotton casual shirt suitable for everyday wear.",
    rating: 4.4,
  },

  {
    id: 12,
    title: "Women's Oversized Hoodie",
    price: 1799,
    oldPrice: 2499,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
    description:
      "Soft oversized hoodie designed for comfort and modern casual styling.",
    rating: 4.5,
  },

  {
    id: 13,
    title: "Men's Denim Jacket",
    price: 2499,
    oldPrice: 3499,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
    description:
      "Classic denim jacket with a modern fit for casual outfits.",
    rating: 4.5,
  },

  {
    id: 14,
    title: "Women's Summer Dress",
    price: 1999,
    oldPrice: 2999,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    description:
      "Elegant lightweight summer dress with a comfortable stylish design.",
    rating: 4.6,
  },

  {
    id: 15,
    title: "Men's Premium Polo T-Shirt",
    price: 999,
    oldPrice: 1499,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1625910513413-5fc45e3f8f6f?auto=format&fit=crop&w=600&q=80",
    description:
      "Premium polo T-shirt with comfortable fabric and a modern look.",
    rating: 4.3,
  },

  {
    id: 16,
    title: "Women's Leather Handbag",
    price: 2299,
    oldPrice: 3299,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
    description:
      "Stylish handbag with spacious compartments for everyday essentials.",
    rating: 4.5,
  },

  // =========================
  // 👟 SHOES
  // =========================

  {
    id: 17,
    title: "Nike Air Running Shoes",
    price: 4999,
    oldPrice: 6499,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    description:
      "Lightweight running shoes designed for comfort and active lifestyles.",
    rating: 4.7,
  },

  {
    id: 18,
    title: "Adidas Sports Sneakers",
    price: 3999,
    oldPrice: 5499,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=600&q=80",
    description:
      "Sporty sneakers offering comfort, durability and modern athletic style.",
    rating: 4.6,
  },

  {
    id: 19,
    title: "Men's Casual Sneakers",
    price: 2199,
    oldPrice: 2999,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80",
    description:
      "Versatile casual sneakers suitable for everyday outfits.",
    rating: 4.4,
  },

  {
    id: 20,
    title: "Women's Running Shoes",
    price: 3299,
    oldPrice: 4499,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80",
    description:
      "Comfortable running shoes with lightweight cushioning.",
    rating: 4.5,
  },

  // =========================
  // 💄 BEAUTY
  // =========================

  {
    id: 21,
    title: "Matte Lipstick Set",
    price: 899,
    oldPrice: 1299,
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80",
    description:
      "Long-lasting matte lipstick collection with multiple everyday shades.",
    rating: 4.4,
  },

  {
    id: 22,
    title: "Premium Perfume",
    price: 2499,
    oldPrice: 3499,
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80",
    description:
      "Elegant fragrance with a fresh and long-lasting premium scent.",
    rating: 4.6,
  },

  {
    id: 23,
    title: "Skincare Face Serum",
    price: 799,
    oldPrice: 1199,
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
    description:
      "Lightweight facial serum designed for a fresh and hydrated skin feel.",
    rating: 4.5,
  },

  {
    id: 24,
    title: "Makeup Brush Set",
    price: 699,
    oldPrice: 999,
    category: "Beauty",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
    description:
      "Complete makeup brush set with soft bristles for smooth application.",
    rating: 4.3,
  },

  // =========================
  // 🏠 HOME
  // =========================

  {
    id: 25,
    title: "Modern Table Lamp",
    price: 1499,
    oldPrice: 2199,
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
    description:
      "Modern decorative table lamp perfect for bedrooms and living spaces.",
    rating: 4.4,
  },

  {
    id: 26,
    title: "Ceramic Coffee Mug Set",
    price: 599,
    oldPrice: 899,
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?auto=format&fit=crop&w=600&q=80",
    description:
      "Elegant ceramic coffee mugs suitable for home and office use.",
    rating: 4.5,
  },

  {
    id: 27,
    title: "Non-Stick Cookware Set",
    price: 3499,
    oldPrice: 4999,
    category: "Home",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=600&q=80",
    description:
      "Durable non-stick cookware set designed for everyday cooking.",
    rating: 4.6,
  },

  // =========================
  // 🎒 ACCESSORIES
  // =========================

  {
    id: 28,
    title: "Travel Backpack",
    price: 1599,
    oldPrice: 2299,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    description:
      "Spacious travel backpack with multiple compartments for work and travel.",
    rating: 4.6,
  },

  {
    id: 29,
    title: "Classic Leather Wallet",
    price: 899,
    oldPrice: 1299,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80",
    description:
      "Compact leather wallet with multiple card slots and timeless design.",
    rating: 4.4,
  },

  {
    id: 30,
    title: "Premium Sunglasses",
    price: 1299,
    oldPrice: 1999,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
    description:
      "Stylish sunglasses with a modern frame for everyday outdoor use.",
    rating: 4.5,
  },
];

export default products;