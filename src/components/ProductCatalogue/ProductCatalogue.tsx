import React from "react";

import ProductCard from "./ProductCard";
import DeliveryChargeRules from "./DeliveryChargeRules";
import SpecialOffer from "./SpecialOffer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import "@/App.css";
import redWidgetImg from "@/assets/widgets/red-widget.png";
import greenWidgetImg from "@/assets/widgets/green-widget.png";
import blueWidgetImg from "@/assets/widgets/blue-widget.png";

const products = [
  {
    name: "Red Widget",
    code: "R01",
    price: 32.95,
    imageUrl: redWidgetImg,
  },
  {
    name: "Green Widget",
    code: "G01",
    price: 24.95,
    imageUrl: greenWidgetImg,
  },
  {
    name: "Blue Widget",
    code: "B01",
    price: 7.95,
    imageUrl: blueWidgetImg,
  },
];

const ProductCatalogue = () => {
  return (
    <main className="container py-5">
      <div className="row g-4">
        <div className="col-12">
          <header className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-3">
            <div>
              <h1 className="mb-1 text-dark">Acme Widget Co</h1>
              <p className="mb-0 text-dark">
                <b>Product Catalogue</b> · Sales System Proof of Concept
              </p>
            </div>
          </header>
        </div>

        <div className="col-12 col-lg-7">
          <section className="card shadow-sm h-100">
            <div className="card-header border-0 pb-0 bg-transparent w-100">
              <div>
                <div className="d-flex justify-content-between align-items-center">
                  <h2 className="h5 mb-1">Catalogue</h2>
                  <button className="btn btn-secondary rounded-circle px-0 shopping-cart-btn">
                    <FontAwesomeIcon icon={faCartShopping} />
                  </button>
                </div>
                <p className="text-body-secondary mb-0">
                  Core widget range currently available for sale.
                </p>
              </div>
            </div>
            <div className="card-body">
              <div className="row g-3">
                {products.map((product) => (
                  <ProductCard key={product.code} product={product} />
                ))}
              </div>
            </div>
            <div className="card-footer border-0 d-flex justify-content-between align-items-center small text-body-secondary">
              <span>All prices in USD, inclusive of tax.</span>
              <span>Delivery calculated at checkout.</span>
            </div>
          </section>
        </div>

        <div className="col-12 col-lg-5">
          <div className="d-flex flex-column gap-3">
            <DeliveryChargeRules />

            <SpecialOffer />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductCatalogue;
