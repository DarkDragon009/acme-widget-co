import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useCartStore } from "@/stores/useCartStore";
import productsJson from "@/data/products.json";
import type { Product } from "@/types";

type CartItemProps = {
  code: string;
};

const products = productsJson as Product[];

const CartItem: React.FC<CartItemProps> = ({ code }) => {
  const { cartItems, increase, decrease, remove } = useCartStore((state) => state);

  const product = products.find((value) => value.code === code);

  if (!product) {
    // Fail-safe: if the product metadata is missing, skip rendering this row.
    return null;
  }

  const quantity = cartItems[code] ?? 0;
  const lineTotal = quantity * product.price;

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
          <button
            type="button"
            className="icon-btn"
            onClick={() => decrease(code)}
            aria-label={`Decrease quantity for ${product.name}`}
            disabled={quantity <= 1}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>

          <span className="mx-2">{quantity}</span>

          <button
            type="button"
            className="icon-btn"
            onClick={() => increase(code)}
            aria-label={`Increase quantity for ${product.name}`}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </td>
      <td className="align-content-center">{lineTotal.toFixed(2)}</td>
      <td className="align-content-center text-end">
        <button
          type="button"
          className="icon-btn"
          onClick={() => remove(code)}
          aria-label={`Remove ${product.name}`}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
