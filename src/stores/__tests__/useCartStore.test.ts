import { describe, it, expect, beforeEach, vi } from "vitest";
import { act } from "@testing-library/react";
import { useCartStore } from "../useCartStore";

describe("useCartStore", () => {
  beforeEach(() => {
    // Reset Zustand store between tests
    useCartStore.setState({ cartItems: {} });

    // Spy on localStorage.setItem to track persist middleware
    vi.spyOn(localStorage.__proto__, "setItem").mockImplementation(() => {});
    vi.clearAllMocks();
  });

  it("initializes with an empty cart", () => {
    const { cartItems } = useCartStore.getState();
    expect(cartItems).toEqual({});
  });

  it("increase() adds a new item when it does not exist", () => {
    act(() => {
      useCartStore.getState().increase("P001");
    });

    expect(useCartStore.getState().cartItems).toEqual({ P001: 1 });
  });

  it("increase() increments an existing item", () => {
    act(() => {
      useCartStore.setState({ cartItems: { P001: 2 } });
      useCartStore.getState().increase("P001");
    });

    expect(useCartStore.getState().cartItems).toEqual({ P001: 3 });
  });

  it("decrease() decrements an item above quantity 1", () => {
    act(() => {
      useCartStore.setState({ cartItems: { P001: 3 } });
      useCartStore.getState().decrease("P001");
    });

    expect(useCartStore.getState().cartItems).toEqual({ P001: 2 });
  });

  it("decrease() removes an item when quantity becomes 0 or 1", () => {
    act(() => {
      useCartStore.setState({ cartItems: { P001: 1 } });
      useCartStore.getState().decrease("P001");
    });

    expect(useCartStore.getState().cartItems).toEqual({});
  });

  it("remove() deletes an item regardless of quantity", () => {
    act(() => {
      useCartStore.setState({ cartItems: { P001: 5, P002: 1 } });
      useCartStore.getState().remove("P001");
    });

    expect(useCartStore.getState().cartItems).toEqual({ P002: 1 });
  });

  it("does not mutate previous state objects (immutability check)", () => {
    const prev = useCartStore.getState().cartItems;

    act(() => {
      useCartStore.getState().increase("P001");
    });

    const next = useCartStore.getState().cartItems;

    expect(prev).not.toBe(next);
  });

  it("persist middleware calls localStorage.setItem", () => {
    act(() => {
      useCartStore.getState().increase("P001");
    });

    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
