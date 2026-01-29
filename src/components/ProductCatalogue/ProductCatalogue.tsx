import React, { memo, useMemo } from "react";

import ProductCard from "./ProductCard";
import DeliveryChargeRules from "./DeliveryChargeRules";

import "@/App.css";
import PRODUCTS from "@/data/products.json";


type ProductCatalogueProps = {
  setOpenModal: (open: boolean) => void;
};

const ProductCatalogue: React.FC<ProductCatalogueProps> = ({
  setOpenModal,
}) => {

  const productCards = useMemo(
    () =>
      PRODUCTS.map((product) => (
        <ProductCard
          key={product.code}
          product={product}
          setOpenModal={setOpenModal}
        />
      )),
    [],
  );

  return (
    <div className="row g-4">
      <div className="col-12">
        <header className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-3">
          <p className="mb-0 text-dark">
            <strong>Product Catalogue</strong> · Sales System Proof of Concept
          </p>
        </header>
      </div>

      <div className="col-12 col-lg-8">
        <div className="row g-3">{productCards}</div>
      </div>

      <aside className="col-12 col-lg-4">
        <div className="d-flex flex-column gap-3">
          <DeliveryChargeRules />
        </div>
      </aside>
    </div>
  );
};

export default memo(ProductCatalogue);
