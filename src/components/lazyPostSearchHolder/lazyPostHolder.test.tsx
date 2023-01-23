import LazyPostHolder from "./lazyPostHolder";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fakePost, fakeUser } from "../../shared/fakePost";
import { Provider } from "react-redux";
import makeStore from "../../store/search/searchStore";

jest.mock("next/router", () => require("next-router-mock"));
let posts: PostType[] = [];
for (let i = 0; i != 25; i++) {
  posts.push({ ...fakePost });
}

posts.map((p: any, i) => {
  p.id = `post-${i + 1}`;
  return p;
});

const CustomParent = () => {
  return (
    <Provider
      store={makeStore({
        isLogin: true,
        posts,
        query: "",
        profileData: fakeUser,
      })}
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

    const postHolder = screen.getByTestId("postHolder");
    const postHolderItems = postHolder.querySelectorAll(
      "[data-testid='post-head']"
    ).length;
    expect(postHolderItems).toEqual(10);
    expect(postHolder).toBeInTheDocument();
    expect(
      screen.getByTestId("lazySearchPostHolderButton")
    ).toBeInTheDocument();
    expect(screen.getByText("some head text")).toBeInTheDocument();
  });
  it("if click on the load more button render 10 post ", () => {
    const postHolder = screen.getByTestId("postHolder");
    const button = screen.getByTestId("lazySearchPostHolderButton");
    const getLength = () =>
      postHolder.querySelectorAll("[data-testid='post-head']").length;

    expect(getLength()).toEqual(10);
    fireEvent.click(button);
    expect(getLength()).toEqual(20);
    fireEvent.click(button);
    expect(button).not.toBeInTheDocument();
  });
});
