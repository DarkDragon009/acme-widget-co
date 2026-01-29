import products from "@/data/products.json";

export const getProductsPrice = (cartItems: any): number => {
  let i = 0;

  return Number(
    Object.entries(cartItems).reduce((total, [code, count]: any) => {
      const product: any = products.find((value) => value.code === code);

      if (code === "R01") {
        if (count % 2 === 0)
          return Number(total) + (count / 2.0) * product.price * 1.5;
        else
          return (
            Number(total) +
            ((count - 1) / 2.0) * product.price * 1.5 +
            product.price
          );
      }

      return Number(total) + count * product.price;
    }, 0),
  );
};

export const getDeliveryCharge = (totalPrice: number) => {
  if (totalPrice === 0) return 0;
  if (totalPrice < 50) return 4.95;
  if (totalPrice < 90) return 2.95;
  return 0;
};
