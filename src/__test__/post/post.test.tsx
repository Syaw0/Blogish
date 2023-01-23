import PostPage from "../../pages/post/[id]/index";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { fakePost, fakeUser } from "../../shared/fakePost";

jest.mock("next/router", () => require("next-router-mock"));

const post1 = { ...fakePost };
const post2 = { ...fakePost };
const post3 = { ...fakePost };

const posts = [post1, post2, post3];
posts.map((p: any, i) => {
  p.id = `post-${i + 1}`;
  return p;
});

describe("Test Page : Post!", () => {
  beforeEach(() => {
    render(
      <PostPage
        isLogin={true}
        profileData={fakeUser}
        post={fakePost}
        similar={posts}
      />
    );
  });

  it("if user is log in the site so we just show posts and nav with profile ...", () => {
    const postHolder = screen.getByTestId("postHolder");
    expect(postHolder).toBeInTheDocument();
    expect(
      postHolder.querySelectorAll("[data-testid='post-head']").length
    ).toEqual(posts.length);
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("layoutHolder")).toBeInTheDocument();
    expect(screen.getAllByTestId("profileSummaryHolder").length).toEqual(2);
    expect(screen.getByTestId("navProfile")).toBeInTheDocument();
    expect(screen.getByTestId("navWriteButton")).toBeInTheDocument();
    expect(screen.getByTestId("layoutHolder")).toBeInTheDocument();
    expect(screen.getByTestId("blogMdHead")).toBeInTheDocument();
    expect(screen.getByTestId("blogMdSubhead")).toBeInTheDocument();
    expect(screen.getByTestId("blogMdHolder")).toBeInTheDocument();
    expect(screen.getByTestId("blogMdBody")).toBeInTheDocument();
    expect(screen.getByTestId("blogMdSubhead")).toBeInTheDocument();
  });
});
