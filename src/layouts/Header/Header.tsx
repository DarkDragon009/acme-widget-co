import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Header = ({ setOpenModal }: { setOpenModal: Function }) => {
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center bg-white">
        <h1 className="mb-1 text-dark">Acme Widget Co</h1>
        <button
          className="btn btn-secondary rounded-circle px-0 shopping-cart-btn"
          onClick={(e) => setOpenModal(true)}
        >
          <FontAwesomeIcon icon={faCartShopping} />
        </button>
      </div>
    </div>
  );
};

export default Header;
