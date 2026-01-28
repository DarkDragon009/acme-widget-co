import React from "react";

const DeliveryChargeRules = () => {
  return (
    <section className="card shadow-sm">
      <div className="card-header border-0 bg-transparent">
        <h2 className="h6 mb-1">Delivery charges</h2>
        <p className="text-body-secondary mb-0">
          Incentivised shipping based on basket value.
        </p>
      </div>
      <div className="card-body pt-2">
        <ul className="list-group list-group-flush delivery-list">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <span className="fw-semibold">Orders under $50</span>
              <div className="small text-body-secondary">Standard delivery</div>
            </div>
            <span className="text-secondary small">$4.95 delivery</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <span className="fw-semibold">Orders under $90</span>
              <div className="small text-body-secondary">Reduced delivery</div>
            </div>
            <span className="text-secondary small">$2.95 delivery</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <span className="fw-semibold">Orders $90 or more</span>
              <div className="small text-body-secondary">
                Best value for customers
              </div>
            </div>
            <span className="text-bg-success text-bg-success px-1 rounded-2 small">
              Free delivery
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default DeliveryChargeRules;
