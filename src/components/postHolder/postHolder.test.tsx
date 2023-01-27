import PostHolder from "./postHolder";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fakePost, fakeUser } from "../../shared/fakePost";
import { Provider } from "react-redux";
import makeStore from "../../store/user/userStore";

jest.mock("next/router", () => require("next-router-mock"));

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
    <Provider store={makeStore({ isLogin: true, profileData: fakeUser })}>
      <PostHolder isAuthors={false} headText={"some head text"} posts={posts} />
    </Provider>
  );
};

describe("Component Test : PostHolder", () => {
  beforeEach(() => {
    render(<CustomParent />);
  });

  it("check component render perfectly", () => {
    expect(screen.getByTestId("post-1")).toBeInTheDocument();
    expect(screen.getByTestId("post-2")).toBeInTheDocument();
    expect(screen.getByTestId("post-3")).toBeInTheDocument();
    expect(screen.getByTestId("postHolder")).toBeInTheDocument();
    expect(screen.getByText("some head text")).toBeInTheDocument();
  });
});
