import React, { useState } from "react";
import productsData from "../data.json";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === product.name);

      if (existing) {
        return prev.map((item) =>
          item.name === product.name
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (name, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.name === name
            ? { ...item, qty: Math.max(item.qty + delta, 0) }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (name) => {
    setCart((prev) => prev.filter((item) => item.name !== name));
  };

  const startNewOrder = () => {
  setCart([]);
};

  return (
    <div className="app">
      <main className="main">

        {/* LEFT SIDE */}
        <section className="products-section">
          <h1>Desserts</h1>

    <ProductList
  products={productsData}
  cart={cart}
  onAdd={addToCart}
  onInc={(name) => updateQty(name, 1)}
  onDec={(name) => updateQty(name, -1)}
/>   </section>

        {/* RIGHT SIDE */}
        <aside className="cart-section">
          <Cart
  items={cart}
  onRemove={removeItem}
  onStartNewOrder={startNewOrder}
/>
        </aside>

      </main>

      <footer className="attribution">
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
        >
          Frontend Mentor
        </a>
        . Coded by <strong>Your Name</strong>.
      </footer>
    </div>
  );
}