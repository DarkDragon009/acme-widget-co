import productsJson from "@/data/products.json";
import type { CartItemsMap, Product } from "@/types";

const products = productsJson as Product[];

export const getProductsPrice = (cartItems: CartItemsMap): number => {
  return Object.entries(cartItems).reduce((total, [code, count]) => {
    const product = products.find((value) => value.code === code);
    if (!product) {
      return total;
    }

    if (code === "R01") {
      // Buy-one-get-second-half-price on Red Widgets
      const pairs = Math.floor(count / 2);
      const remainder = count % 2;
      const pairPrice = pairs * product.price * 1.5;
      const remainderPrice = remainder * product.price;
      return total + pairPrice + remainderPrice;
    }

    return total + count * product.price;
  }, 0);
};

export const getDeliveryCharge = (totalPrice: number): number => {
  if (totalPrice === 0) return 0;
  if (totalPrice < 50) return 4.95;
  if (totalPrice < 90) return 2.95;
  return 0;
};
