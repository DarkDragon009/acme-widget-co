import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartState = {
  cartItems: any;
  increase: (code: string) => void;
  decrease: (code: string) => void;
  remove: (code: string) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: {},
      increase: (code) => {
        set((state) => {
          if (state.cartItems[code]) state.cartItems[code]++;
          else state.cartItems[code] = 1;

          return { ...state, cartItems: { ...state.cartItems } };
        });
      },
      decrease: (code) => {
        set((state) => {
          state.cartItems[code]--;

          if (state.cartItems[code] === 0) delete state.cartItems[code];

          return { ...state, cartItems: { ...state.cartItems } };
        });
      },
      remove: (code) => {
        set((state) => {
          delete state.cartItems[code];

          return { ...state, cartItems: { ...state.cartItems } };
        });
      },
    }),
    { name: "cart-storage" },
  ),
);
