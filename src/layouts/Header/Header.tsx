import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import { useCartStore } from "@/stores/useCartStore";

export type THeaderProps = {
  setOpenModal: Function
}

const Header: React.FC<THeaderProps> = ({ setOpenModal }) => {
  const { count } = useCartStore((state) => state);

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center bg-white">
        <h1 className="mb-1 text-dark">Acme Widget Co</h1>
        <div style={{ position: "relative" }}>
          <button
            className="text-primary bg-transparent border-0 shopping-cart-btn"
            onClick={(e) => setOpenModal(true)}
          >
            <FontAwesomeIcon icon={faCartShopping} />
          </button>
          {count > 0 && (
            <span
              className="bg-white border border-primary text-primary"
              style={{
                position: "absolute",
                top: -4,
                right: -4,
                minWidth: 20,
                height: 20,
                textAlign: "center",
                borderRadius: 9999,
                fontSize: 12,
              }}
            >
              {count}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
