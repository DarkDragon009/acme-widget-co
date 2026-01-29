import React, { useMemo } from "react";

import CartItem from "./CartItem";
import Summary from "./Summary";

import { useCartStore } from "@/stores/useCartStore";

const ShoppingCart: React.FC = () => {
  const { cartItems } = useCartStore((state) => state);

  const itemCount = Object.values(cartItems).reduce(
    (total, quantity) => total + quantity,
    0,
  );

  const hasItems = useMemo<boolean>(() => {
    return Object.keys(cartItems).length > 0;
  }, [cartItems]);

  return (
    <section className="shopping-cart-ui shadow-sm">
      <div className="row g-0">
        <div className="shopping-cart-ui__left p-4">
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-body-secondary small">
              {itemCount} {itemCount === 1 ? "item" : "items"} in cart
            </div>
          </div>

          {hasItems ? (
            <table className="table table-striped mt-4">
              <tbody>
                {Object.keys(cartItems).map((code) => (
                  <CartItem key={code} code={code} />
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-body-secondary mt-4 mb-0">
              Your cart is empty. Start adding some widgets.
            </p>
          )}
        </div>

        <aside className="shopping-cart-ui__right p-4">
          <Summary />
        </aside>
      </div>
    </section>
  );
};

export default ShoppingCart;
