import Layout from "./layout";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fakePost } from "../../../shared/fakePost";
import Post from "../../post/post";
import TrendTags from "../../trendTags/trendTag";

const LeftChild = () => {
  return <Post isAuthors={true} testid="post" {...fakePost} />;
};

const RightChild = () => {
  return <TrendTags tags={["tag1", "tag2"]} />;
};

const CustomParent = () => {
  return <Layout leftSide={<LeftChild />} rightSide={<RightChild />} />;
};

describe("Component Test : Layout", () => {
  it("check if given data is correct", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("layoutLeft")).toBeInTheDocument();
    expect(screen.getByTestId("layoutRight")).toBeInTheDocument();
    expect(screen.getByTestId("trendTagsHolder")).toBeInTheDocument();
    expect(screen.getByTestId("trendTags-tag1")).toBeInTheDocument();
    expect(screen.getByTestId("trendTags-tag2")).toBeInTheDocument();
    expect(screen.getByTestId("post")).toBeInTheDocument();
  });
});
