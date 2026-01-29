import React, { memo, useMemo } from "react";

import { DELIVERY_RULES, DeliveryRule } from "@/utils/deliveryRules";

const formatCurrency = (amount: number): string => `$${amount.toFixed(2)}`;

const DeliveryChargeRules: React.FC = () => {
  const rules = DELIVERY_RULES as readonly DeliveryRule[];

  const ruleItems = useMemo(() => {
    if (!rules.length) {
      return (
        <li className="list-group-item text-body-secondary small">
          No delivery rules available.
        </li>
      );
    }

    return rules.map((rule) => (
      <li
        key={rule.delivery_title}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <div>
          <span className="fw-semibold">{rule.delivery_title}</span>

          {rule.delivery_type && (
            <div className="small text-body-secondary">
              {rule.delivery_type}
            </div>
          )}
        </div>

        <span className="text-secondary small">
          {formatCurrency(rule.delivery_charge)}
        </span>
      </li>
    ));
  }, [rules]);

  return (
    <section
      className="card shadow-sm"
      aria-labelledby="delivery-charges-title"
    >
      <header className="card-header border-0 bg-transparent">
        <h2 id="delivery-charges-title" className="h6 mb-1">
          Delivery charges
        </h2>
        <p className="text-body-secondary mb-0">
          Incentivised shipping based on basket value.
        </p>
      </header>

      <div className="card-body pt-2">
        <ul className="list-group list-group-flush delivery-list">
          {ruleItems}
        </ul>
      </div>
    </section>
  );
};

export default memo(DeliveryChargeRules);
