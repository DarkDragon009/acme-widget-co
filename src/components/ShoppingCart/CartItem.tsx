import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faXmark } from "@fortawesome/free-solid-svg-icons";

interface Product {
  product: {
    name: string;
    code: string;
    price: number;
    imageUrl: string;
  };
}

const CartItem = ({ product }: Product) => {
  return (
    <tr key={product.code}>
      <td>
        <img
          src={product.imageUrl}
          alt={product.name}
          width={54}
          height={54}
          className="flex-shrink-0"
        />
      </td>
      <td className="align-content-center">{product.name}</td>
      <td className="fw-semibold align-content-center text-end">
        <div className="d-flex align-items-center">
          <button className="icon-btn">
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span>$100</span>
          <button className="icon-btn">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </td>
      <td className="align-content-center">$300</td>
      <td className="align-content-center text-end">
        <button className="icon-btn">
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
