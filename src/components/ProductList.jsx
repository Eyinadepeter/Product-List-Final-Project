import React from "react";
import ProductCard from "./ProductCard";

export default function ProductList({
  products,
  cart,
  onAdd,
  onInc,
  onDec,
}) {
  return (
    <section className="product-list">
      {products.map((product) => {
        const cartItem = cart.find(
          (item) => item.name === product.name
        );

        return (
          <ProductCard
            key={product.name}
            product={product}
            qty={cartItem?.qty || 0}
            onAdd={onAdd}
            onInc={onInc}
            onDec={onDec}
          />
        );
      })}
    </section>
  );
}