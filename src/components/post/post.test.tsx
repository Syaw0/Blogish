import Post from "./post";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fakePost } from "../../shared/fakePost";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

jest.mock("next/router", () => require("next-router-mock"));
const mockCallback = jest.fn(() => {});

const CustomParent = () => {
  return (
    <Post
      {...fakePost}
      onClick={() => {
        mockCallback();
      }}
      testid="postID"
    />
  );
};

describe("Component Test : Post", () => {
  beforeEach(() => {
    render(<CustomParent />, { wrapper: MemoryRouterProvider });
  });

  it("check component render perfectly", () => {
    expect(
      screen.getByAltText(fakePost.profile.profileAlt)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(`${fakePost.author}-profile`)
    ).toBeInTheDocument();
    expect(screen.getByText(fakePost.author)).toBeInTheDocument();
    expect(screen.getByText(fakePost.postHead)).toBeInTheDocument();
    expect(screen.getByText(fakePost.postSubhead)).toBeInTheDocument();
    expect(
      screen.getByText(fakePost.publishDate as string)
    ).toBeInTheDocument();
    expect(screen.getByText(fakePost.tagName)).toBeInTheDocument();
  });

  it("if click on the post callback called", () => {
    fireEvent.click(screen.getByTestId("postID"));
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("if click on the post author or profile of it we navigate to user page", () => {
    fireEvent.click(screen.getByTestId("postHeadAnchor"));
    expect(mockRouter.asPath).toEqual(`/user/${fakePost.authorId}`);
  });

  it("if click on the post Header we navigate to Post page", () => {
    fireEvent.click(screen.getByTestId("postTitleAnchor"));
    expect(mockRouter.asPath).toEqual(`/post/${fakePost.id}`);
  });
});
