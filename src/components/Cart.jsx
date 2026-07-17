import React, { useState } from "react";

function normPath(path) {
  return path.replace("./", "/");
}

export default function Cart({
  items,
  onRemove,
  onStartNewOrder,
}) {
  const [showModal, setShowModal] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const totalItems = items.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  const handleNewOrder = () => {
    onStartNewOrder();
    setShowModal(false);
  };

  return (
    <>
      <aside className="cart">
        <h2>Your Cart ({totalItems})</h2>

        {items.length === 0 ? (
          <div className="empty-cart">
            <img
              src="/assets/images/illustration-empty-cart.svg"
              alt="Empty Cart"
            />

            <p>Your added items will appear here</p>
          </div>
        ) : (
          <>
            <ul className="cart-list">
              {items.map((item) => (
                <li
                  key={item.name}
                  className="cart-item"
                >
                  <div className="cart-info">
  <h4 className="cart-name">{item.name}</h4>

  <div className="cart-meta">
    <span className="cart-qty">
      {item.qty}x
    </span>

    <span className="cart-price">
      @ ${item.price.toFixed(2)}
    </span>

    <span className="cart-total">
      ${(item.qty * item.price).toFixed(2)}
    </span>
  </div>
</div>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      onRemove(item.name)
                    }
                  >
                    <img
                      src="/assets/images/icon-remove-item.svg"
                      alt="Remove"
                    />
                  </button>
                </li>
              ))}
            </ul>

            <div className="total">
              <span>Order Total</span>

              <strong>
                ${total.toFixed(2)}
              </strong>
            </div>

            <div className="delivery">
              <img
                src="/assets/images/icon-carbon-neutral.svg"
                alt=""
              />

              <span>
                This is a{" "}
                <strong>
                  carbon-neutral
                </strong>{" "}
                delivery
              </span>
            </div>

            <button
              className="checkout"
              onClick={() =>
                setShowModal(true)
              }
            >
              Confirm Order
            </button>
          </>
        )}
      </aside>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">

            <img
              className="success-icon"
              src="/assets/images/icon-order-confirmed.svg"
              alt="Confirmed"
            />

            <h1>Order Confirmed</h1>

            <p>
              We hope you enjoy your food!
            </p>

            <div className="order-summary">
              {items.map((item) => (
                <div
                  key={item.name}
                  className="summary-item"
                >
                  <img
                    src={normPath(
                      item.image.thumbnail
                    )}
                    alt={item.name}
                  />

                  <div className="summary-info">
                    <h4>{item.name}</h4>

                    <div className="summary-meta">
                      <span className="qty">
                        {item.qty}x
                      </span>

                      <span>
                        @ $
                        {item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <strong>
                    $
                    {(
                      item.qty *
                      item.price
                    ).toFixed(2)}
                  </strong>
                </div>
              ))}

              <div className="summary-total">
                <span>Order Total</span>

                <strong>
                  ${total.toFixed(2)}
                </strong>
              </div>
            </div>

            <button
              className="checkout"
              onClick={handleNewOrder}
            >
              Start New Order
            </button>
          </div>
        </div>
      )}
    </>
  );
}