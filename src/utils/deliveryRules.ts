type DeliveryResult = {
  delivery_charge: number;
  delivery_type: string | null;
};

export type DeliveryRule = {
  readonly delivery_title: string;
  readonly delivery_charge: number;
  readonly price_limit: number;
  readonly delivery_type: string;
};

type GetDeliveryPriceType = (totalProductsPrice: number) => DeliveryResult;

export const DELIVERY_RULES: readonly DeliveryRule[] = [
  {
    delivery_title: "Orders under $50",
    delivery_charge: 4.95,
    price_limit: 50,
    delivery_type: "Standard Delivery",
  },
  {
    delivery_title: "Orders under $90",
    delivery_charge: 2.95,
    price_limit: 90,
    delivery_type: "Reduced Delivery",
  },
  {
    delivery_title: "Orders $90 or more",
    delivery_charge: 0,
    price_limit: Infinity,
    delivery_type: "Free Delivery",
  },
];

export const getDeliveryPrice: GetDeliveryPriceType = (totalProductsPrice) => {
  if (totalProductsPrice <= 0) {
    return {
      delivery_charge: 0,
      delivery_type: null,
    };
  }

  const rule = DELIVERY_RULES.find(
    ({ price_limit }) => totalProductsPrice < price_limit,
  );

  return rule
    ? {
        delivery_charge: rule.delivery_charge,
        delivery_type: rule.delivery_type,
      }
    : {
        delivery_charge: 0,
        delivery_type: null,
      };
};
