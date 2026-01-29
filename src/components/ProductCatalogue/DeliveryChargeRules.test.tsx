import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DeliveryChargeRules from "./DeliveryChargeRules";

describe("DeliveryChargeRules component", () => {
  it("renders the section title and description", () => {
    render(<DeliveryChargeRules />);

    expect(
      screen.getByRole("heading", { name: /charges for delivery/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/incentivized shipping based on basket value/i)
    ).toBeInTheDocument();
  });

  it("renders all delivery charge tiers", () => {
    render(<DeliveryChargeRules />);

    expect(screen.getByText(/orders under \$50/i)).toBeInTheDocument();
    expect(screen.getByText(/standard delivery/i)).toBeInTheDocument();
    expect(screen.getByText(/\$4\.95/)).toBeInTheDocument();

    expect(screen.getByText(/orders under \$90/i)).toBeInTheDocument();
    expect(screen.getByText(/reduced delivery/i)).toBeInTheDocument();
    expect(screen.getByText(/\$2\.95/)).toBeInTheDocument();

    expect(screen.getByText(/orders \$90 or more/i)).toBeInTheDocument();
    expect(screen.getByText(/free delivery/i)).toBeInTheDocument();
    expect(screen.getByText(/\$0\.00/)).toBeInTheDocument();
  });

  it("applies correct structural classes", () => {
    render(<DeliveryChargeRules />);

    // Directly select the <section> element
    const section = document.querySelector("section.card");
    expect(section).toBeTruthy();
    expect(section).toHaveClass("card", "shadow-sm");

    const header = section!.querySelector(".card-header");
    expect(header).toBeTruthy();
    expect(header).toHaveClass("border-0", "bg-transparent");

    const list = section!.querySelector(".delivery-list");
    expect(list).toBeTruthy();
    expect(list).toHaveClass("list-group", "list-group-flush");
  });
});
