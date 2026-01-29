import React from "react";

import { useCartStore } from "@/stores/useCartStore";
import { getProductsPrice, getTotalPrice } from "@/utils/calcUtils";
import { getDeliveryPrice } from "@/utils/deliveryRules";
import { getFormattedPrice } from "@/utils/utils";

const deliveryTypeBadgeColor: Record<string, string> = {
  "Standard Delivery": "bg-secondary",
  "Reduced Delivery": "bg-primary",
  "Free Delivery": "bg-success",
};

const Summary: React.FC = () => {
  const cartItems = useCartStore((state) => state.cartItems);

  const productsPrice = getProductsPrice(cartItems);
  const { delivery_charge, delivery_type } = getDeliveryPrice(productsPrice);

  const itemCount = Object.values(cartItems).reduce(
    (total, quantity) => total + quantity,
    0,
  );

  const totalPrice = getTotalPrice(cartItems);

  return (
    <>
      <h3 className="h5 mb-4 text-dark">Summary</h3>

      <div className="vstack gap-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="text-uppercase small fw-semibold text-body-secondary">
            Total price without delivery charge
          </div>
          <div className="text-secondary">${productsPrice.toFixed(2)}</div>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span className="text-uppercase small fw-semibold text-body-secondary me-2">
              Delivery Charge
            </span>
            {delivery_type && (
              <span
                className={`${deliveryTypeBadgeColor[delivery_type] ?? "bg-secondary"} rounded small px-1 fw-semibold text-white`}
              >
                {" "}
                {delivery_type}{" "}
              </span>
            )}
          </div>
          <span className="text-secondary">
            {getFormattedPrice(delivery_charge)}
          </span>
        </div>

        <div className="d-flex justify-content-between align-items-center border-top border-secondary pt-2">
          <div className="text-uppercase small fw-semibold text-body-secondary">
            Total price
          </div>
          <div className="fw-semibold text-secondary">
            {getFormattedPrice(totalPrice)}
          </div>
        </div>

        <button className="btn btn-dark w-100 mt-2" type="button">
          CHECKOUT
        </button>
      </div>
    </>
  );
};

export default Summary;
