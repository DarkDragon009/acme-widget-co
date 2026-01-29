import React from "react";

import { useCartStore } from "@/stores/useCartStore";
import {
  getDeliveryCharge,
  getProductsPrice,
  getTotalPrice,
} from "@/utils/calcUtils";

const deliveryTypeBadgeColor = {
  "Standard Delivery": "bg-secondary",
  "Reduced Delivery": "bg-primary",
  "Free Delivery": "bg-success",
};

const Summary: React.FC = () => {
  const cartItems = useCartStore((state) => state.cartItems);

  const productsPrice = getProductsPrice(cartItems);
  const { deliveryCharge, deliveryType } = getDeliveryCharge(productsPrice);

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
            Items
          </div>
          <div className="fw-semibold text-secondary">{itemCount}</div>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span className="text-uppercase small fw-semibold text-body-secondary me-2">
              Delivery Charge
            </span>
            {deliveryType && (
              <span
                className={`${deliveryTypeBadgeColor[deliveryType]} rounded small px-1 fw-semibold text-white`}
              >
                {" "}
                {deliveryType}{" "}
              </span>
            )}
          </div>
          <span className="text-secondary">${deliveryCharge.toFixed(2)}</span>
        </div>

        <div className="d-flex justify-content-between align-items-center border-top border-secondary pt-2">
          <div className="text-uppercase small fw-semibold text-body-secondary">
            Total price
          </div>
          <div className="fw-semibold text-secondary">
            ${totalPrice.toFixed(2)}
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
