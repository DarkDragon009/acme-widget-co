import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import { useCartStore } from "@/stores/useCartStore";

const Header = ({ setOpenModal }: { setOpenModal: Function }) => {
  const { cartItems } = useCartStore((state) => state);
  const purchasedItemsCount = Object.values(cartItems).reduce(
    (total, count) => Number(total) + Number(count),
    0,
  );

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center bg-white">
        <h1 className="mb-1 text-dark">Acme Widget Co</h1>
        <div style={{ position: "relative" }}>
          <button
            className="btn btn-secondary rounded-circle px-0 shopping-cart-btn"
            onClick={(e) => setOpenModal(true)}
          >
            <FontAwesomeIcon icon={faCartShopping} />
          </button>
          <span
            className="bg-white border border-secondary px-1 rounded text-dark"
            style={{ position: "absolute", top: -12, right: -8 }}
          >
            {Number(purchasedItemsCount)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
