import Navbar from "./navbar";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fakePost } from "../../shared/fakePost";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
jest.mock("next/router", () => require("next-router-mock"));

const CustomParent = ({ isLogin }: { isLogin: boolean }) => {
  return <Navbar isLogin={isLogin} profileData={fakePost.author} />;
};

describe("Component Test : Navbar", () => {
  it("check if given data is correct", () => {
    render(<CustomParent isLogin={false} />);
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
    expect(screen.getByTestId("navWriteButton")).toBeInTheDocument();
    expect(screen.getByTestId("navProfile")).toBeInTheDocument();
  });

  it("if click on the iconLogo navigate to home page", () => {
    render(<CustomParent isLogin={true} />, { wrapper: MemoryRouterProvider });
    const logo = screen.getByTestId("navIconLogo");
    fireEvent.click(logo);
    expect(mockRouter.asPath).toEqual("/");
  });

  it("if click on the profile navigate to user page page", () => {
    render(<CustomParent isLogin={true} />, { wrapper: MemoryRouterProvider });
    const profile = screen.getByTestId("navProfile");
    fireEvent.click(profile);
    expect(mockRouter.asPath).toEqual("/me");
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

  // it("if search inputs are empty do nothing", () => {
  //   render(<CustomParent isLogin={true} />, { wrapper: MemoryRouterProvider });
  //   const searchBox = screen.getByTestId("navSearchBox");
  //   fireEvent.keyDown(searchBox, { key: "Enter" });
  //   expect(mockRouter.asPath).toEqual("");
  // });
});
