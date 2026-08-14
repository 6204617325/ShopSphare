# 🛍️ ShopSphere

ShopSphere is a modern e-commerce web application built with React, Vite, Bootstrap and Firebase.

It provides a complete shopping experience for customers along with a secure Admin Dashboard for managing orders.

---

## ✨ Features

### 👤 User Features

- 🔐 Firebase Email/Password Authentication
- 🔑 Google Login
- 🐙 GitHub Login
- 👤 User Profile
- 🏠 Saved User Information
- 🛒 Shopping Cart
- ❤️ Wishlist
- 📦 My Orders
- 🔎 Product Browsing
- 💳 Payment Page
- 📱 UPI Payment Interface
- 💵 Cash on Delivery
- 📍 Checkout
- 🎉 Order Success Page

---

## 👑 Admin Features

ShopSphere also includes a separate Admin Dashboard.

### Admin can:

- 📊 View total orders
- 📦 View customer orders
- 💰 View total sales
- ✅ View confirmed orders
- ⚙️ View processing orders
- 🚚 View shipped orders
- 🎉 View delivered orders
- 🔐 Access restricted to admin users only

Admin access is controlled using a Firebase Firestore `role` field.

Example:

```text
role: "admin"