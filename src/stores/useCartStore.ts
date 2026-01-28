import { create } from "zustand";

type CartState = {
  cardItems: any;
  increase: (code: string) => void;
  decrease: (code: string) => void;
};

export const useCartStore = create<CartState>((set) => ({
  cardItems: {},
  increase: (code) => {
    set((state) => {
      if (state.cardItems[code]) state.cardItems[code]++;
      else state.cardItems[code] = 1;

      return { ...state, cardItems: { ...state.cardItems } };
    });
  },
  decrease: (code) => {
    set((state) => {
      state.cardItems[code]--;

      if (state.cardItems[code] === 0) delete state.cardItems[code];

      return { ...state, cardItems: { ...state.cardItems } };
    });
  },
}));
