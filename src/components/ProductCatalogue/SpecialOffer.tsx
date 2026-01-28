import React from "react";

const SpecialOffer = () => {
  return (
    <section className="card shadow-sm offer-card border-primary-subtle">
      <div className="card-header bg-primary-subtle border-primary-subtle d-flex align-items-center gap-2">
        <span className="badge text-bg-primary text-uppercase small">
          Offer
        </span>
        <h2 className="h6 mb-0">Red Widget promotion</h2>
      </div>
      <div className="card-body">
        <p className="text-body-secondary mb-2 small">
          The discount is automatically applied to every second Red Widget in
          the same order. Ideal for customers purchasing in pairs.
        </p>
      </div>
    </section>
  );
};

export default SpecialOffer;
