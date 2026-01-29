import { getDeliveryPrice } from "./deliveryRules";
import { getAppliedSpecialOfferPrice } from "./specialOffers";
import productsJson from "@/data/products.json";
import type { CartItemsMap, IProduct } from "@/types";

const products = productsJson as IProduct[];

export const toTwoDecimalsTruncate = (value: number): number => {
  return Math.trunc(value * 100) / 100;
};

export const getProductsPrice = (cartItems: CartItemsMap): number => {
  return Object.entries(cartItems).reduce((total, [code, count]) => {
    const product = products.find((p) => p.code === code);
    if (!product) return total;

    return total + getAppliedSpecialOfferPrice(code, count, product.price);
  }, 0);
};

export const getTotalPrice = (cartItems: CartItemsMap): number => {
  const totalProductPrice = getProductsPrice(cartItems);
  const { delivery_charge } = getDeliveryPrice(totalProductPrice);
  return totalProductPrice + delivery_charge;
};
