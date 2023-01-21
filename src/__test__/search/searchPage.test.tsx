import SearchPage from "../../pages/search";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { fakePost } from "../../shared/fakePost";

jest.mock("next/router", () => require("next-router-mock"));

let posts: PostType[] = [];
for (let i = 0; i != 25; i++) {
  posts.push({ ...fakePost });
}

posts.map((p: any, i) => {
  p.id = `post-${i + 1}`;
  return p;
});

describe("Test Page : Search!", () => {
  it("let see if components mount correctly", () => {
    render(
      <SearchPage
        query={{ query: "" }}
        isLogin={true}
        posts={posts}
        profileData={fakePost.profile}
      />
    );
    const postHolder = screen.getByTestId("postHolder");
    expect(postHolder).toBeInTheDocument();
    expect(
      postHolder.querySelectorAll("[data-testid='post-head']").length
    ).toEqual(10);
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("layoutHolder")).toBeInTheDocument();
    expect(screen.getByTestId("trendTagsHolder")).toBeInTheDocument();
    expect(screen.getByTestId("navProfile")).toBeInTheDocument();
    expect(screen.getByTestId("navWriteButton")).toBeInTheDocument();
    expect(screen.getByTestId("lazySearchPostHolder")).toBeInTheDocument();
    expect(
      screen.getByTestId("lazySearchPostHolderButton")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Search To Find Your interest")
    ).toBeInTheDocument();
  });

  it("if query is not empty show another text", () => {
    render(
      <SearchPage
        query={{ query: "query" }}
        isLogin={true}
        posts={posts}
        profileData={fakePost.profile}
      />
    );
    expect(screen.getByText("Result For : query")).toBeInTheDocument();
  });
});
