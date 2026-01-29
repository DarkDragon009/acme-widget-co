import productsJson from "@/data/products.json";
import type { CartItemsMap, Product } from "@/types";

const products = productsJson as Product[];

export const getSpecialOfferPrice = (count: number, price: number) => {
  const pairs = Math.floor(count / 2);
  const remainder = count % 2;
  const pairPrice = pairs * price * 1.5;
  const remainderPrice = remainder * price;

  return pairPrice + remainderPrice;
}

export const getProductsPrice = (cartItems: CartItemsMap): number => {
  return Object.entries(cartItems).reduce((total, [code, count]) => {
    const product = products.find((value) => value.code === code);
    if (!product) {
      return total;
    }

    if (code === "R01") {
      return total + getSpecialOfferPrice(count, product.price);
    }

    return total + count * product.price;
  }, 0);
};

export const getDeliveryCharge = (totalPrice: number): {
  deliveryCharge: number; 
  deliveryType: string | null
} => {
  if (totalPrice === 0) return {deliveryCharge: 0, deliveryType: null};
  if (totalPrice < 50) return {deliveryCharge: 4.95, deliveryType: 'Standard Delivery'};
  if (totalPrice < 90) return {deliveryCharge: 2.95, deliveryType: 'Reduced Delivery'};

  return {deliveryCharge: 0, deliveryType: 'Free Delivery'};
};
