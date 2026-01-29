import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DeliveryChargeRules from "./DeliveryChargeRules";

describe("DeliveryChargeRules component", () => {
  it("renders the section title and description", () => {
    render(<DeliveryChargeRules />);

    expect(
      screen.getByRole("heading", { name: /delivery charges/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/incentivised shipping based on basket value/i)
    ).toBeInTheDocument();
  });

  it("renders all delivery charge tiers", () => {
    render(<DeliveryChargeRules />);

    expect(screen.getByText(/orders under \$50/i)).toBeInTheDocument();
    expect(screen.getByText(/standard delivery/i)).toBeInTheDocument();
    expect(screen.getByText(/\$4\.95 delivery/i)).toBeInTheDocument();

    expect(screen.getByText(/orders under \$90/i)).toBeInTheDocument();
    expect(screen.getByText(/reduced delivery/i)).toBeInTheDocument();
    expect(screen.getByText(/\$2\.95 delivery/i)).toBeInTheDocument();

    expect(screen.getByText(/orders \$90 or more/i)).toBeInTheDocument();
    expect(screen.getByText(/best value for customers/i)).toBeInTheDocument();
    expect(screen.getByText(/free delivery/i)).toBeInTheDocument();
  });

  it("applies correct structural classes", () => {
    render(<DeliveryChargeRules />);

    // Directly select the <section> element
    const section = document.querySelector("section.card");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("card", "shadow-sm");

    const header = section!.querySelector(".card-header");
    expect(header).toHaveClass("border-0", "bg-transparent");

    const list = section!.querySelector(".delivery-list");
    expect(list).toHaveClass("list-group", "list-group-flush");
  });
});
