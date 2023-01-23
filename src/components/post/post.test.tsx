import Post from "./post";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fakePost, fakeUser } from "../../shared/fakePost";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { Provider } from "react-redux";
import makeStore from "../../store/user/userStore";

jest.mock("next/router", () => require("next-router-mock"));
const mockCallback = jest.fn(() => {});

const myFakePost = fakePost;
const myFakeUser = fakeUser;
const CustomParent = ({ isAuthors, post, user }: any) => {
  return (
    // its not difference which store be used we need profileData that pass in all stores
    <Provider
      store={makeStore({
        isLogin: true,
        profileData: user == null ? fakeUser : user,
      })}
    >
      <Post
        isAuthors={isAuthors}
        {...(post == null ? fakePost : post)}
        onClick={() => {
          mockCallback();
        }}
        testid="postID"
      />
    </Provider>
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

  it("if user is not a author of post don't show the menu", () => {
    myFakePost.author.id = "some other id";
    render(<CustomParent isAuthors={false} post={myFakePost} />, {
      wrapper: MemoryRouterProvider,
    });
    let menu;
    try {
      menu = screen.getByTestId("menuHolder");
    } catch (err) {}
    expect(menu).toBeUndefined();
  });

  it("if user is a author of post  show the menu", () => {
    myFakePost.author.id = "1";
    myFakeUser.id = "1";
    render(
      <CustomParent user={myFakeUser} isAuthors={false} post={myFakePost} />,
      {
        wrapper: MemoryRouterProvider,
      }
    );

    expect(screen.getByTestId("menuHolder")).toBeInTheDocument();
  });

  it("if user click on the menu item1 (edit post) will navigate to the write", () => {
    myFakePost.author.id = "1";
    myFakeUser.id = "1";
    render(
      <CustomParent user={myFakeUser} isAuthors={false} post={myFakePost} />,
      {
        wrapper: MemoryRouterProvider,
      }
    );
    fireEvent.click(screen.getByTestId("menuHolderIcon"));
    fireEvent.click(screen.getByTestId("Edit article"));
    expect(mockRouter.asPath).toEqual("/write?edit=true&id=123");
  });
});
