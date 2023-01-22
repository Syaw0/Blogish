import Post from "./post";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fakePost } from "../../shared/fakePost";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

jest.mock("next/router", () => require("next-router-mock"));
const mockCallback = jest.fn(() => {});

const CustomParent = ({ isAuthors }: any) => {
  return (
    <Post
      isAuthors={isAuthors}
      {...fakePost}
      onClick={() => {
        mockCallback();
      }}
      testid="postID"
    />
  );
};

describe("Component Test : Post", () => {
  it("check component render perfectly if post is not for author", () => {
    render(<CustomParent isAuthors={false} />, {
      wrapper: MemoryRouterProvider,
    });
    expect(screen.getByAltText(fakePost.author.name)).toBeInTheDocument();
    expect(
      screen.getByTestId(`${fakePost.author}-profile`)
    ).toBeInTheDocument();
    expect(screen.getByText(fakePost.author.name)).toBeInTheDocument();
    expect(screen.getByText(fakePost.postHead)).toBeInTheDocument();
    expect(screen.getByText(fakePost.postSubhead)).toBeInTheDocument();
    expect(screen.getByText(fakePost.publishDate)).toBeInTheDocument();
    expect(screen.getByText(fakePost.tagName)).toBeInTheDocument();
  });

  it("if post is for author don`t show profile and name  ", () => {
    render(<CustomParent isAuthors={true} />, {
      wrapper: MemoryRouterProvider,
    });

    let profile, name;
    try {
      profile = screen.getByTestId(`${fakePost.author}-profile`);
      name = screen.getByText(fakePost.author.name);
    } catch (err) {}
    expect(profile).toBeUndefined();
    expect(name).toBeUndefined();
    expect(screen.getByText(fakePost.postHead)).toBeInTheDocument();
    expect(screen.getByText(fakePost.postSubhead)).toBeInTheDocument();
    expect(
      screen.getByText(fakePost.publishDate as string)
    ).toBeInTheDocument();
    expect(screen.getByText(fakePost.tagName)).toBeInTheDocument();
  });

  it("if click on the post callback called", () => {
    render(<CustomParent isAuthors={false} />, {
      wrapper: MemoryRouterProvider,
    });
    fireEvent.click(screen.getByTestId("postID"));
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("if click on the post author or profile of it we navigate to user page", () => {
    render(<CustomParent isAuthors={false} />, {
      wrapper: MemoryRouterProvider,
    });
    fireEvent.click(screen.getByTestId("postHeadAnchor"));
    expect(mockRouter.asPath).toEqual(`/user/${fakePost.author.id}`);
  });

  it("if click on the post Header we navigate to Post page", () => {
    render(<CustomParent isAuthors={false} />, {
      wrapper: MemoryRouterProvider,
    });
    fireEvent.click(screen.getByTestId("postTitleAnchor"));
    expect(mockRouter.asPath).toEqual(`/post/${fakePost.id}`);
  });
});
