import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

import { useCartStore } from "@/stores/useCartStore";

interface Product {
  code: string;
  imageUrl: string;
  price: number;
  name: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  const { cartItems, increase } = useCartStore((state) => state);
  const addProduct = (code: string) => (e: any) => {
    increase(code);
  };
  const isPurchased: boolean = Boolean(cartItems[product.code]);

  return (
    <div className="col-12 col-lg-6 col-xl-4">
      <article className="card h-100 shadow-sm">
        <div className="card-body d-flex flex-column gap-3">
          <div className="d-flex align-items-center gap-3 position-relative">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="flex-shrink-0"
              width="100%"
            />
            <div className="position-absolute product-image">
              <button
                className={clsx("btn btn-light rounded-circle text-center px-0 shopping-cart-btn", { "text-primary": isPurchased })}
                onClick={addProduct(product.code)}
              >
                <FontAwesomeIcon icon={faCartShopping} />
              </button>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-bold">{product.name}</span>
            <span className="fw-lightbold fs-6 text-secondary">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ProductCard;
