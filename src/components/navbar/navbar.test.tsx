import Navbar from "./navbar";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fakePost } from "../../shared/fakePost";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import logout from "../../utils/logout";

jest.mock("../../utils/logout.ts");
jest.mock("next/router", () => require("next-router-mock"));

const mockLogout = logout as jest.Mock;

const CustomParent = ({ isLogin }: { isLogin: boolean }) => {
  return (
    <>
      <Navbar isLogin={isLogin} profileData={fakePost.author} />
    </>
  );
};

describe("Component Test : Navbar", () => {
  it("check if given data is correct", () => {
    render(<CustomParent isLogin={false} />);
    expect(screen.getByTestId("themeSwitch")).toBeInTheDocument();
    expect(screen.getByTestId("navAuthButton")).toBeInTheDocument();
    expect(screen.getByTestId("navSearchBox")).toBeInTheDocument();
    expect(screen.getByTestId("navIconLogo")).toBeInTheDocument();
  });

  it("if user is not login and its session is not store on the server show singin/singup button", () => {
    render(<CustomParent isLogin={false} />);
    expect(screen.getByTestId("navAuthButton")).toBeInTheDocument();
  });
  it("if user is login and its session is store on the server show profile and write button", () => {
    render(<CustomParent isLogin={true} />);

    expect(screen.getByTestId("themeSwitch")).toBeInTheDocument();
    expect(screen.getByTestId("navProfile")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("navbarMenuHolder"));
    expect(screen.getByTestId("navbarMenuItemProfile")).toBeInTheDocument();
    expect(screen.getByTestId("navbarMenuItemWrite")).toBeInTheDocument();
    expect(screen.getByTestId("navbarMenuItemSetting")).toBeInTheDocument();
    expect(screen.getByTestId("navbarMenuItemLogout")).toBeInTheDocument();
  });

  it("if click on the iconLogo navigate to home page", () => {
    render(<CustomParent isLogin={true} />, { wrapper: MemoryRouterProvider });
    const logo = screen.getByTestId("navIconLogo");
    fireEvent.click(logo);
    expect(mockRouter.asPath).toEqual("/");
  });

  it("if click on the profile menu open", async () => {
    render(<CustomParent isLogin={true} />, { wrapper: MemoryRouterProvider });
    fireEvent.click(screen.getByTestId("navbarMenuHolder"));
    const menu = screen.getByTestId("navbarMenu");
    expect(menu).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("navbarMenuItemProfile"));
    expect(mockRouter.asPath).toEqual(`/user/${fakePost.author.id}`);
    // when click on the menu items menu will close
    expect(menu).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId("navbarMenuHolder"));
    fireEvent.click(screen.getByTestId("navbarMenuItemWrite"));
    expect(mockRouter.asPath).toEqual(`/write`);

    fireEvent.click(screen.getByTestId("navbarMenuHolder"));
    fireEvent.click(screen.getByTestId("navbarMenuItemSetting"));
    expect(mockRouter.asPath).toEqual(`/setting`);

    mockLogout.mockReturnValue(new Promise((res) => res({ status: true })));

    fireEvent.click(screen.getByTestId("navbarMenuHolder"));
    fireEvent.click(screen.getByTestId("navbarMenuItemLogout"));
    expect(mockLogout).toBeCalledTimes(1);
  });

  it("if click on the write button navigate to write page", () => {
    render(<CustomParent isLogin={true} />, { wrapper: MemoryRouterProvider });

    const writeButton = screen.getByTestId("navWriteButton");
    fireEvent.click(writeButton);
    expect(mockRouter.asPath).toEqual("/write");
  });

  it("if we click on the search icon or press enter if search input have text nav to search page", () => {
    render(<CustomParent isLogin={true} />, { wrapper: MemoryRouterProvider });
    const searchBox = screen.getByTestId("navSearchBox");
    const searchBoxIcon = screen.getByTestId("navSearchBoxIcon");
    fireEvent.change(searchBox, { target: { value: "somequery" } });
    fireEvent.keyDown(searchBox, { key: "Enter" });
    expect(mockRouter.asPath).toEqual("/search?query=somequery");

    fireEvent.change(searchBox, { target: { value: "otherQuery" } });
    fireEvent.click(searchBoxIcon);

    expect(mockRouter.asPath).toEqual("/search?query=otherQuery");
  });
});
