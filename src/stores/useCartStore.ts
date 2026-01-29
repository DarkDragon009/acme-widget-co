import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CartItemsMap } from "@/types";

type CartState = {
  cartItems: CartItemsMap;
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
          const nextCount = (state.cartItems[code] ?? 0) + 1;

          return {
            ...state,
            cartItems: {
              ...state.cartItems,
              [code]: nextCount,
            },
          };
        });
      },
      decrease: (code) => {
        set((state) => {
          const currentCount = state.cartItems[code] ?? 0;
          if (currentCount <= 1) {
            const { [code]: _removed, ...rest } = state.cartItems;
            return { ...state, cartItems: rest };
          }

          return {
            ...state,
            cartItems: {
              ...state.cartItems,
              [code]: currentCount - 1,
            },
          };
        });
      },
      remove: (code) => {
        set((state) => {
          const { [code]: _removed, ...rest } = state.cartItems;
          return { ...state, cartItems: rest };
        });
      },
    }),
    { name: "cart-storage" },
  ),
);
