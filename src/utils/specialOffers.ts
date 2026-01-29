import { toTwoDecimalsTruncate } from "./calcUtils";

type OfferContext = {
  productCount: number;
  unitPrice: number;
};

type OfferResult = number;

export type OfferRule = {
  readonly code: string;
  readonly description: string;
  readonly apply: (context: OfferContext) => OfferResult;
};

type GetAppliedSpecialOfferPrice = (
  code: string,
  productCount: number,
  unitPrice: number,
) => number;

/**
 * Buy one, get the second at half price
 * (e.g. 2 items = 1.5x price, 3 items = 2.5x price)
 */
const applyBuyOneGetSecondHalfPrice = ({
  productCount,
  unitPrice,
}: OfferContext): OfferResult => {
  if (productCount <= 0 || unitPrice <= 0) {
    return 0;
  }

  const pairs = Math.floor(productCount / 2);
  const remainder = productCount % 2;

  const pairsTotal = pairs * unitPrice * 1.5;
  const remainderTotal = remainder * unitPrice;

  return toTwoDecimalsTruncate(pairsTotal + remainderTotal);
};

export const OFFER_RULES: readonly OfferRule[] = [
  {
    code: "R01",
    description: "Buy one, get 2nd in half",
    apply: applyBuyOneGetSecondHalfPrice,
  },
  // {
  //   // example offer rule
  //   code: "example_code",
  //   description: "Buy 3 for the price of 2",
  //   apply: ({ productCount, unitPrice }) =>
  //     toTwoDecimalsTruncate(
  //       (productCount - Math.floor(productCount / 3)) * unitPrice,
  //     ),
  // },
];

export const getAppliedSpecialOfferPrice: GetAppliedSpecialOfferPrice = (
  code,
  productCount,
  unitPrice,
) => {
  const basePrice = toTwoDecimalsTruncate(productCount * unitPrice);

  if (!code || productCount <= 0 || unitPrice <= 0) {
    return basePrice;
  }

  const rule = OFFER_RULES.find((r) => r.code === code);

  return rule ? rule.apply({ productCount, unitPrice }) : basePrice;
};
