import Landpage from "./landpage";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
jest.mock("next/router", () => require("next-router-mock"));

const CustomParent = () => {
  return <Landpage />;
};

describe("Component Test : LandPage", () => {
  it("check if Component render correctly", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("landpageIcon")).toBeInTheDocument();
    expect(screen.getByTestId("landpageButton")).toBeInTheDocument();
    expect(screen.getByTestId("landpageSubhead")).toBeInTheDocument();
    expect(screen.getByTestId("landpageHead")).toBeInTheDocument();
  });

  it("if we click on the button we navigate to the authenticate page", () => {
    render(<CustomParent />, { wrapper: MemoryRouterProvider });
    fireEvent.click(screen.getByTestId("landpageButton"));
    expect(mockRouter.asPath).toEqual("/auth");
  });
});
