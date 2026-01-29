import React, { memo, useMemo } from "react";

import { OFFER_RULES } from "@/utils/specialOffers";

const SpecialOffer: React.FC = () => {
  const offerItems = useMemo(
    () =>
      OFFER_RULES.map((offer) => (
        <li
          key={offer.code}
          className="text-body-secondary mb-2 small list-group-item"
        >
          {offer.description}
        </li>
      )),
    [],
  );

  return (
    <section
      className="card shadow-sm offer-card border-primary-subtle"
      aria-labelledby="special-offers-title"
    >
      <header className="card-header bg-primary-subtle border-primary-subtle d-flex align-items-center gap-2">
        <h2 id="special-offers-title" className="h6 mb-0">
          Offers we are providing
        </h2>
      </header>

      <div className="card-body">
        <ul className="list-group">{offerItems}</ul>
      </div>
    </section>
  );
};

export default memo(SpecialOffer);
