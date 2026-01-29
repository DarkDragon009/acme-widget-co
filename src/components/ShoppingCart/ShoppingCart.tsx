import React, { useMemo, useState } from "react";

import CartItem from "./CartItem";
import Summary from "./Summary";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useCartStore } from "@/stores/useCartStore";

import products from "@/data/products.json";

const ShoppingCart = () => {
  const { cartItems } = useCartStore((state) => state);
  const soldItemsCount = Object.values(cartItems).reduce(
    (total, count) => Number(total) + Number(count),
    0,
  );

  return (
    <section className="shopping-cart-ui shadow-sm">
      <div className="row g-0">
        <div className="shopping-cart-ui__left p-4">
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-body-secondary small">
              {Number(soldItemsCount)} items purchased
            </div>
          </div>
          {Object.values(cartItems).length > 0 && (
            <table className="table table-striped mt-4">
              <tbody>
                {Object.keys(cartItems).map((code) => (
                  <CartItem key={code} code={code} />
                ))}
              </tbody>
            </table>
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
