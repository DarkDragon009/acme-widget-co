import React, { useMemo } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useCartStore } from "@/stores/useCartStore";
import { getAppliedSpecialOfferPrice } from "@/utils/specialOffers";
import { toTwoDecimalsTruncate } from "@/utils/calcUtils";
import PRODUCTS from "@/data/products.json";
import { getFormattedPrice } from "@/utils/utils";

type CartItemProps = {
  code: string;
};


const CartItem: React.FC<CartItemProps> = ({ code }) => {
  const { cartItems, increase, decrease, remove } = useCartStore(
    (state) => state,
  );

  const product = useMemo(() => PRODUCTS.find((value) => value.code === code), [code])

  if (!product) {
    // Fail-safe: if the product metadata is missing, skip rendering this row.
    return null;
  }

  const quantity = cartItems[code] ?? 0;
  const lineTotal = toTwoDecimalsTruncate(quantity * product.price);
  const specialOfferPrice = getAppliedSpecialOfferPrice(
    code,
    quantity,
    product.price,
  );

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
        <div className="d-flex align-items-center justify-content-between">
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
      <td className="align-content-center text-end">
        {lineTotal !== specialOfferPrice && (
          <div className="special-offer-price text-secondary">
            {getFormattedPrice(lineTotal)}
          </div>
        )}
        <div className="ms-2">
          {
            getFormattedPrice(getAppliedSpecialOfferPrice(code, quantity, product.price))
          }
        </div>
      </td>
      <td className="align-content-center text-end px-0">
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
