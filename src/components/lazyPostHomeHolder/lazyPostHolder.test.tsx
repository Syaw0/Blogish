import LazyPostHolder from "./lazyPostHolder";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fakePost, fakeUser } from "../../shared/fakePost";
import loadMorePosts from "../../utils/loadMorePosts";
import { Provider } from "react-redux";
import makeStore from "../../store/home/homeStore";
import { act } from "react-dom/test-utils";

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("../../utils/loadMorePosts");
let mockLoadMorePosts = loadMorePosts as jest.Mock;

const post1 = { ...fakePost };
const post2 = { ...fakePost };
const post3 = { ...fakePost };

const posts = [post1, post2, post3];
posts.map((p: any, i) => {
  p.id = `post-${i + 1}`;
  return p;
});

const CustomParent = () => {
  return (
    <Provider
      store={makeStore({ isLogin: true, posts, profileData: fakeUser })}
    >
      <LazyPostHolder headText="some head text" />
    </Provider>
  );
};

describe("Component Test : Post", () => {
  beforeEach(() => {
    render(<CustomParent />);
  });

  it("check component render perfectly", () => {
    expect(screen.getByTestId("post-1")).toBeInTheDocument();
    expect(screen.getByTestId("post-2")).toBeInTheDocument();
    expect(screen.getByTestId("post-3")).toBeInTheDocument();
    expect(screen.getByTestId("postHolder")).toBeInTheDocument();
    expect(screen.getByTestId("lazyPostHolderButton")).toBeInTheDocument();
    expect(screen.getByText("some head text")).toBeInTheDocument();
  });

  it("if we click on the button loader show up", async () => {
    mockLoadMorePosts.mockReturnValue(
      new Promise((res) =>
        res({ status: true, msg: "", data: { posts: [fakePost] } })
      )
    );
    fireEvent.click(screen.getByTestId("lazyPostHolderButton"));
    await waitFor(() =>
      expect(screen.getByTestId("waitMessage")).toBeInTheDocument()
    );
  });

  it("if we click on the button if response is ok load more posts", async () => {
    mockLoadMorePosts.mockReturnValue(
      new Promise((res) => res({ status: true, msg: "", data: [fakePost] }))
    );
    let postHolder = screen.getByTestId("postHolder");
    let prePostHolderItems = postHolder.querySelectorAll(
      "[data-testid='post-head']"
    ).length;
    fireEvent.click(screen.getByTestId("lazyPostHolderButton"));

    await waitFor(() =>
      expect(screen.getByTestId("successMessage")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(prePostHolderItems).not.toEqual(
        postHolder.querySelectorAll("[data-testid='post-head']").length
      )
    );
    expect(prePostHolderItems + 1).toEqual(
      postHolder.querySelectorAll("[data-testid='post-head']").length
    );
    expect(screen.getByTestId(fakePost.id)).toBeInTheDocument();
  });

  it("if we click on the button if response is not ok show error ", async () => {
    mockLoadMorePosts.mockReturnValue(
      new Promise((res) =>
        res({ status: false, msg: "", data: { posts: [fakePost] } })
      )
    );
    let postHolder = screen.getByTestId("postHolder");
    let prePostHolderItems = postHolder.querySelectorAll(
      "[data-testid='post-head']"
    ).length;
    fireEvent.click(screen.getByTestId("lazyPostHolderButton"));
    await waitFor(() =>
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(prePostHolderItems).toEqual(
        postHolder.querySelectorAll("[data-testid='post-head']").length
      )
    );
  });
});
