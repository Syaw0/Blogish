import Blog from "./blog";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { fakePost } from "../../shared/fakePost";

const CustomParent = () => {
  return <Blog {...fakePost} similar={[fakePost]} />;
};

describe("Component Test : Layout", () => {
  it("check if given data is correct", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("blogMdHolder")).toBeInTheDocument();
    expect(screen.getByTestId("profileSummaryHolder")).toBeInTheDocument();
    expect(screen.getByTestId("postHolder")).toBeInTheDocument();
    expect(screen.getByText(fakePost.author.name)).toBeInTheDocument();
    let description;
    try {
      description = screen.getByText(fakePost.author.description);
    } catch (err) {}
    expect(description).toBeUndefined();
    expect(screen.getAllByText(fakePost.publishDate).length).toBeGreaterThan(1);
    expect(screen.getAllByText(fakePost.postHead).length).toBeGreaterThan(1);
    expect(screen.getAllByText(fakePost.postSubhead).length).toBeGreaterThan(1);
  });
});
