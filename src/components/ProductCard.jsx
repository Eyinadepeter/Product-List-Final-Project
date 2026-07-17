import React from "react";

function normPath(path) {
  return path.replace("./", "/");
}

export default function ProductCard({
  product,
  qty,
  onAdd,
  onInc,
  onDec,
}) {
  return (
    <article className={`product-card ${qty > 0 ? "active" : ""}`}>
      <img
        className="thumb"
        src={normPath(product.image.desktop)}
        alt={product.name}
      />

      <div className="product-action">
        {qty > 0 ? (
          <div className="quantity-control">
  <button onClick={() => onDec(product.name)}>
    <img
      src="./assets/images/icon-decrement-quantity.svg"
      alt="Decrease"
    />
  </button>

  <span>{qty}</span>

  <button onClick={() => onInc(product.name)}>
    <img
      src="/assets/images/icon-increment-quantity.svg"
      alt="Increase"
    />
  </button>
</div>
        ) : (
          <button className="add" onClick={() => onAdd(product)}>
            🛒 Add to Cart
          </button>
        )}
      </div>

      <div className="info">
        <p className="category">{product.category}</p>

        <h3 className="name">{product.name}</h3>

        <p className="price">${product.price.toFixed(2)}</p>
      </div>
    </article>
  );
}