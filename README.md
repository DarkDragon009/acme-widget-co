# �� Acme Widget Co — Shopping Basket System

### React + TypeScript + Bootstrap + Zustand

A production‑quality implementation of Acme Widget Co’s proof‑of‑concept sales system.  
This project uses **React**, **TypeScript**, **Bootstrap**, and **Zustand** to deliver a clean, modular, and fully tested shopping cart engine that satisfies — and exceeds — the assignment requirements.

---

## �� How This Project Meets the Assignment Requirements

| Requirement                                                 | Implementation                                                                       |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Cart initialized with catalogue, delivery rules, and offers | Passed into the Zustand store + logic modules                                        |
| `add(productCode)` method                                   | Implemented as `increase(code)` in the store                                         |
| `total()` method applying delivery + offers                 | Implemented via pure functions in `utils/` (calcUtils, deliveryRules, specialOffers) |
| Simple UI in React                                          | Bootstrap‑styled, clean, minimal UI                                                  |
| Easy‑to‑understand TypeScript                               | Strong typing across products, cart items, rules                                     |
| README explaining assumptions                               | Included in this document                                                            |
| Public repo with commit history                             | Ready for submission                                                                 |

---

## ��️ Architecture Overview

The system is split into **three clean layers**, each independent and testable.

---

## 1. **UI Layer (React + Bootstrap)**

Located in `src/components/`

The UI is intentionally simple but clean, using Bootstrap for layout and spacing.

Key components:

- **ProductCatalogue** — displays all widgets
- **ProductCard** — reusable product tile
- **ShoppingCart** — main cart container
- **CartItem** — individual line item
- **Summary** — subtotal, discounts, delivery, total
- **Modal** — reusable modal for cart interactions

The UI is stateless; all logic lives in the store or pure functions.

---

## 2. **State Layer (Zustand)**

Located in `src/stores/useCartStore.ts`

This layer implements the "basket(cart) interface” with `cartItems` and a `count` total.

### Store Methods

- `increase(code)`: Increments the quantity of the specified product.
  If the product is not yet present in the cart, it initializes the entry with a quantity of `1`
- `decrease(code)`: Reduces the quantity of the specified product only when the current quantity is greater than `1`.
  When the quantity is already 1, the operation becomes a no‑op to prevent invalid cart state.
- `remove(code)`: Eliminates the specified product from the cart entirely, regardless of its current quantity.
  Guarantees the product no longer appears in the cart state after execution.

### Store Initialization

The store initializes with a `cartItems` map representing the products currently purchased in the shopping cart. Each key corresponds to a **product code**, and each value represents the **quantity** of that product.

#### Example

```ts
cartItems = { R01: 10, B01: 5, G01: 3 };
```

#### Interpretation

- The cart contains 10 units of product R01
- The cart contains 5 units of product B01
- The cart contains 3 units of product G01

#### Why this structure?

- O(1) access to product quantities
- A normalized, minimal representation of cart state
- A clean foundation for deterministic mutations via increase, decrease, and remove

### Why Zustand?

- Lightweight
- Predictable
- Selector‑based re‑render control
- Perfect for small‑to‑medium global state without Redux overhead

---

### **Business Logic Layer — `src/utils/`**

Pricing rules are split into UI‑agnostic modules.

#### **`calcUtils.ts`**

- **`toTwoDecimalsTruncate(value: number): number`** — Truncates to two decimal places (no rounding). Example: `38.455` → `38.45`.
- **`getProductsPrice(cartItems)`** — Subtotal of all products in the cart, using special-offer pricing where applicable.
- **`getTotalPrice(cartItems)`** — Subtotal plus delivery charge.

#### **`deliveryRules.ts`**

- **`DELIVERY_RULES`** — Tiered delivery rules (under $50 → $4.95; under $90 → $2.95; $90+ → free).
- **`getDeliveryPrice(totalProductsPrice)`** — Returns `{ delivery_charge, delivery_type }` for a given subtotal.

#### **`specialOffers.ts`**

- **`OFFER_RULES`** — Product-specific offer rules (e.g. R01: buy one, get second half price).
- **`getAppliedSpecialOfferPrice(code, productCount, unitPrice)`** — Line total for a product when its offer applies.

#### **`utils.ts`**

- **`getFormattedPrice(price: number)`** — Formats a number as currency (e.g. `32.95` → `"$32.95"`).

’s tiered rules:

#### **Testing & Design Notes**

All functions in `src/utils/` are pure, unit‑tested with Vitest, and UI‑agnostic.

---

## �� Testing Strategy (Vitest + React Testing Library)

The test suite covers:

### ✔ Business Logic Tests

- Delivery tiers
- Offer rules
- Mixed baskets
- Edge cases

### ✔ Store Tests

- Increase/decrease/remove

### ✔ Component Tests

- Rendering
- User interactions
- Cart updates
- Summary recalculation
- Modal behavior

Tests use semantic queries and behavior‑driven assertions.

---

## �� Project File Structure

```
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Modal/           # Generic modal component
│   │   ├── ProductCatalogue/ # Product listing grid
│   │   └── ShoppingCart/    # Cart container and summary
│   ├── data/                # Static product catalogue
│   ├── layouts/             # Page-level layout components
│   ├── stores/              # Zustand global state (cart store)
│   ├── test/                # Vitest + RTL test suites
│   ├── types/               # Shared TypeScript types and interfaces
│   └── utils/               # Pure business logic (deliveryRules, specialOffers, calcUtils, utils)
│       ├── calcUtils.ts     # Subtotal, total, toTwoDecimalsTruncate
│       ├── deliveryRules.ts # Delivery tiers and getDeliveryPrice
│       ├── specialOffers.ts # Offer rules and getAppliedSpecialOfferPrice
│       └── utils.ts         # getFormattedPrice
├── App.css                   # Global styles
├── App.tsx                   # Root component
├── main.tsx                  # React entry point
├── index.html                # HTML shell
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite build configuration
└── .gitignore               # Git exclusions
```

This structure keeps UI, state, and logic cleanly separated.

---

## �� Example Baskets (Verified Against Requirements)

| Products                | Expected | Verified |
| ----------------------- | -------- | -------- |
| B01, G01                | $37.85   | ✔        |
| R01, R01                | $54.37   | ✔        |
| R01, G01                | $60.85   | ✔        |
| B01, B01, R01, R01, R01 | $98.27   | ✔        |

All validated in the test suite.

---

## �� Assumptions

- Product catalogue is static and loaded from `data/products.json`.
- Offer rules are modular and can be extended.
- Delivery rules are tier‑based and configurable.
- UI is intentionally simple but clean, per assignment instructions.
- All monetary values are formatted to two decimals.

---

## ▶️ Running the Project

```
npm install
npm run dev
```

---

## �� Running Tests

```
npm run test
```
