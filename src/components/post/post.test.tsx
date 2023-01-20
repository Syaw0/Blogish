import Post from "./post";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fakePost } from "../../shared/fakePost";

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

describe("Component Test : Profile", () => {
  beforeEach(() => {
    render(<CustomParent />);
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
});
