import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SpecialOffer from "./SpecialOffer";

describe("SpecialOffer component", () => {
  it("renders the offer badge and title", () => {
    render(<SpecialOffer />);

    // Badge
    expect(screen.getByText(/offer/i)).toBeInTheDocument();

    // Title
    expect(
      screen.getByRole("heading", { name: /red widget promotion/i })
    ).toBeInTheDocument();
  });

  it("renders the promotional description", () => {
    render(<SpecialOffer />);

    expect(
      screen.getByText(
        /the discount is automatically applied to every second red widget/i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(/ideal for customers purchasing in pairs/i)
    ).toBeInTheDocument();
  });

  it("applies correct structural classes", () => {
    render(<SpecialOffer />);

    const section = document.querySelector("section.offer-card");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass(
      "card",
      "shadow-sm",
      "offer-card",
      "border-primary-subtle"
    );

    const header = section!.querySelector(".card-header");
    expect(header).toHaveClass(
      "bg-primary-subtle",
      "border-primary-subtle",
      "d-flex",
      "align-items-center",
      "gap-2"
    );

    const badge = header!.querySelector(".badge");
    expect(badge).toHaveClass("text-bg-primary", "text-uppercase", "small");

    const body = section!.querySelector(".card-body");
    expect(body).toBeInTheDocument();
  });
});
