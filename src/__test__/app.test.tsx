import Page from "../pages/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("render App", () => {
  it("test app", () => {
    render(<Page />);
    expect(screen.getByText("BLOGISH")).toBeInTheDocument();
  });
});
