import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CartItemsMap } from "@/types";

type CartState = {
  cartItems: CartItemsMap;
  count: number;
  increase: (code: string) => void;
  decrease: (code: string) => void;
  remove: (code: string) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: {},
      count: 0,
      increase: (code) => {
        set((state) => {
          const nextCount = (state.cartItems[code] ?? 0) + 1;

          return {
            ...state,
            count: state.count + 1,
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
            count: Math.max(state.count - 1, 1),
            cartItems: {
              ...state.cartItems,
              [code]: currentCount - 1,
            },
          };
        });
      },
      remove: (code) => {
        set((state) => {
          const removableCount = state.cartItems[code];
          const { [code]: _removed, ...rest } = state.cartItems;

          return {
            ...state,
            count: state.count - removableCount,
            cartItems: rest,
          };
        });
      },
    }),
    { name: "cart-storage" },
  ),
);
