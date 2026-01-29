import React, { memo, useCallback, useMemo } from "react";

import { IProduct } from "@/types";

import { useCartStore } from "@/stores/useCartStore";
import { OFFER_RULES } from "@/utils/specialOffers";
import { getFormattedPrice } from "@/utils/utils";

type ProductCardProps = {
  product: IProduct;
  setOpenModal: (open: boolean) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, setOpenModal }) => {
  const isPurchased = useCartStore((state) =>
    Boolean(state.cartItems[product.code]),
  );

  const increase = useCartStore((state) => state.increase);
  
  const specialOffer = useMemo(() =>  OFFER_RULES.find((rule) => rule.code === product.code), [product]);

  const handleAddToCart = useCallback(() => {
    if (!isPurchased) increase(product.code);
    else setOpenModal(true);
  }, [increase, setOpenModal, product.code, isPurchased]);

  return (
    <div className="col-12 col-lg-6 col-xl-4">
      <article className="card h-100 shadow-sm">
        <div className="d-flex flex-column">
          <div className="d-flex align-items-center position-relative">
            <img
              src={product.imageUrl}
              alt={product.name}
              loading="lazy"
              className="flex-shrink-0 w-100 rounded-top"
            />
            {specialOffer && (
              <span className="special-offer-badge">
                {specialOffer.description}
              </span>
            )}
          </div>

          <div className="px-2 py-2">
            <div className="d-flex justify-content-between align-items-center">
              <span className="fw-bold">{product.name}</span>
              <span className="fs-6 text-secondary">
                {getFormattedPrice(product.price)}
              </span>
            </div>
            <div>
              <button
                type="button"
                className="btn text-center w-100 my-2 btn-primary"
                onClick={handleAddToCart}
                aria-pressed={isPurchased}
                aria-label={`Add ${product.name} to cart`}
              >
                {!isPurchased ? "Add To Cart" : "Go To Cart"}
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default memo(ProductCard);
