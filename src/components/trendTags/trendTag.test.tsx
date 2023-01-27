import TrendTags from "./trendTag";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const CustomParent = () => {
  return <TrendTags tags={["tag1", "tag2", "tag3", "tag4"]} />;
};

describe("Component Test : Trend tags", () => {
  it("check if given data is correct", () => {
    render(<CustomParent />);

    expect(screen.getByTestId("trendTagsHolder")).toBeInTheDocument();
    expect(screen.getByTestId("trendTags-tag1")).toBeInTheDocument();
    expect(screen.getByTestId("trendTags-tag2")).toBeInTheDocument();
    expect(screen.getByTestId("trendTags-tag3")).toBeInTheDocument();
    expect(screen.getByTestId("trendTags-tag4")).toBeInTheDocument();
  });
});
