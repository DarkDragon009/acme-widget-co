import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useCartStore } from "@/stores/useCartStore";
import products from "@/data/products.json";

const CartItem = ({ code }: { code: string }) => {
  const { cartItems, increase, decrease, remove } = useCartStore(
    (state) => state,
  );
  const product: any = products.find((value) => value.code === code);

  return (
    <tr>
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
          <button className="icon-btn" onClick={(e) => decrease(code)}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span>{cartItems[code]}</span>
          <button className="icon-btn" onClick={(e) => increase(code)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </td>
      <td className="align-content-center">
        {(cartItems[code] * product.price).toFixed(2)}
      </td>
      <td className="align-content-center text-end">
        <button className="icon-btn" onClick={(e) => remove(code)}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
