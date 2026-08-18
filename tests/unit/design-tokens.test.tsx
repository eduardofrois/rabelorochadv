import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "@/components/site/Hero";

describe("site hero", () => {
  it("renders the approved brand message", () => {
    render(<Hero />);

    expect(
      screen.getByRole("heading", { name: /direito, inovação e tecnologia/i }),
    ).toBeInTheDocument();
  });
});
