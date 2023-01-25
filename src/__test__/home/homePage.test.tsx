import HomePage from "../../pages/index";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { fakePost } from "../../shared/fakePost";
import getPostList from "../../../db/util/getPostList";

jest.mock("../../../db/util/getPostList.ts", () => jest.fn(() => {}));
jest.mock("next/router", () => require("next-router-mock"));

const mockGetPostList = getPostList as jest.Mock;

const post1 = { ...fakePost };
const post2 = { ...fakePost };
const post3 = { ...fakePost };

const posts = [post1, post2, post3];
posts.map((p: any, i) => {
  p.author = JSON.stringify(p.author);
  p.id = `post-${i + 1}`;
  return p;
});
mockGetPostList.mockReturnValue(
  new Promise(() => {
    return posts;
  })
);

describe("Test Page : Home!", () => {
  it("if user is log in the site so we just show posts and nav with profile ...", () => {
    render(
      <HomePage isLogin={true} posts={posts} profileData={fakePost.author} />
    );
    const postHolder = screen.getByTestId("postHolder");
    expect(postHolder).toBeInTheDocument();
    expect(
      postHolder.querySelectorAll("[data-testid='post-head']").length
    ).toEqual(posts.length);
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("layoutHolder")).toBeInTheDocument();
    expect(screen.getByTestId("trendTagsHolder")).toBeInTheDocument();
    expect(screen.getByTestId("navProfile")).toBeInTheDocument();
    expect(screen.getByTestId("navWriteButton")).toBeInTheDocument();
    expect(screen.getByTestId("lazyPostHolder")).toBeInTheDocument();
    let landpage;
    try {
      landpage = screen.getByTestId("landpage");
    } catch (err) {}
    expect(landpage).toBeUndefined();
  });

  it("if user is not log in the site we show landpage and nav just have auth button", () => {
    render(
      <HomePage isLogin={false} posts={posts} profileData={fakePost.author} />
    );
    const postHolder = screen.getByTestId("postHolder");
    expect(postHolder).toBeInTheDocument();
    expect(
      postHolder.querySelectorAll("[data-testid='post-head']").length
    ).toEqual(posts.length);
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("layoutHolder")).toBeInTheDocument();
    expect(screen.getByTestId("trendTagsHolder")).toBeInTheDocument();

    let navProfile, navWriteButton;
    try {
      navProfile = screen.getByTestId("navProfile");
      navWriteButton = screen.getByTestId("navWriteButton");
    } catch (err) {}
    expect(navProfile).toBeUndefined;
    expect(navWriteButton).toBeUndefined();
    expect(screen.getByTestId("lazyPostHolder")).toBeInTheDocument();
    expect(screen.getByTestId("landpage")).toBeInTheDocument();
  });
});
