import UserPage from "../../pages/user/[id]/index";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { fakePost, fakeUser } from "../../shared/fakePost";

jest.mock("next/router", () => require("next-router-mock"));

let posts: PostType[] = [];
for (let i = 0; i != 25; i++) {
  posts.push({ ...fakePost });
}

posts.map((p: any, i) => {
  p.id = `post-${i + 1}`;
  return p;
});

describe("Test Page : User!", () => {
  it("let see if components mount correctly", () => {
    render(
      <UserPage
        user={fakeUser}
        isLogin={true}
        posts={posts}
        profileData={fakePost.author}
      />
    );
    const postHolder = screen.getByTestId("postHolder");
    expect(postHolder).toBeInTheDocument();
    expect(
      postHolder.querySelectorAll("[data-testid='post-head']").length
    ).toEqual(25);
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("layoutHolder")).toBeInTheDocument();
    expect(screen.getAllByTestId("profileSummaryHolder").length).toEqual(2);
    expect(screen.getByTestId("navProfile")).toBeInTheDocument();
    expect(screen.getByTestId("navWriteButton")).toBeInTheDocument();
    expect(screen.getByTestId("postHolder")).toBeInTheDocument();
    expect(screen.getAllByTestId("profileSummaryProfile").length).toEqual(2);
    const name = screen.getAllByTestId("profileSummaryName");
    const description = screen.getAllByTestId("profileSummaryDescription");

    const checkTextContent = (text: string, arr: HTMLElement[]) => {
      arr.forEach((el) => {
        expect(el).toHaveTextContent(text);
      });
    };
    checkTextContent(fakeUser.name, name);
    checkTextContent(fakeUser.description, description);
  });
});
