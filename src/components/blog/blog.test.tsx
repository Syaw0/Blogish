import Blog from "./blog";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { fakePost, fakeUser } from "../../shared/fakePost";
import { Provider } from "react-redux";
import makeStore from "../../store/post/postStore";

jest.mock("next/router", () => require("next-router-mock"));

const CustomParent = () => {
  return (
    <Provider store={makeStore({ isLogin: true, profileData: fakeUser })}>
      <Blog {...fakePost} similar={[fakePost]} />
    </Provider>
  );
};

describe("Component Test : Blog", () => {
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
