import productsJson from "@/data/products.json";
import type { CartItemsMap, Product } from "@/types";

const products = productsJson as Product[];

const toTwoDecimalsTruncate = (value: number): number => {
  return Math.trunc(value * 100) / 100;
};

export const getSpecialOfferPrice = (count: number, price: number) => {
  const pairs = Math.floor(count / 2);
  const remainder = count % 2;

  const pairPrice = toTwoDecimalsTruncate(pairs * price * 1.5);
  const remainderPrice = toTwoDecimalsTruncate(remainder * price);

  return toTwoDecimalsTruncate(pairPrice + remainderPrice);
};

export const getProductsPrice = (cartItems: CartItemsMap): number => {
  return Object.entries(cartItems).reduce((total, [code, count]) => {
    const product = products.find((p) => p.code === code);
    if (!product) return total;

    if (code === "R01") {
      return (
        total +
        toTwoDecimalsTruncate(getSpecialOfferPrice(count, product.price))
      );
    }

    return total + count * toTwoDecimalsTruncate(product.price);
  }, 0);
};

export const getDeliveryCharge = (totalPrice: number) => {
  if (totalPrice === 0) return { deliveryCharge: 0, deliveryType: null };
  if (totalPrice < 50)
    return { deliveryCharge: 4.95, deliveryType: "Standard Delivery" };
  if (totalPrice < 90)
    return { deliveryCharge: 2.95, deliveryType: "Reduced Delivery" };

  return { deliveryCharge: 0, deliveryType: "Free Delivery" };
};

export const getTotalPrice = (cartItems: CartItemsMap): number => {
  const totalProductPrice = getProductsPrice(cartItems);
  const { deliveryCharge } = getDeliveryCharge(totalProductPrice);
  return totalProductPrice + deliveryCharge;
};
