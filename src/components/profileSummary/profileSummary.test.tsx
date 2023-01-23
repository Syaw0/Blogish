import ProfileSummary from "./profileSummary";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fakeUser } from "../../shared/fakePost";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/dist/MemoryRouterProvider";

jest.mock("next/router", () => require("next-router-mock"));

const CustomParent = () => {
  return <ProfileSummary {...fakeUser} />;
};

describe("Component Test : ProfileSummary", () => {
  beforeEach(() => {
    render(<CustomParent />, { wrapper: MemoryRouterProvider });
  });

  it("check component render perfectly", () => {
    expect(screen.getByTestId("profileSummaryProfile")).toBeInTheDocument();
    expect(screen.getByTestId("profileSummaryHolder")).toBeInTheDocument();
    expect(screen.getByTestId("profileSummaryDescription")).toHaveTextContent(
      fakeUser.description
    );
    expect(screen.getByTestId("profileSummaryName")).toHaveTextContent(
      fakeUser.name
    );
  });

  it("click on the name and go to the user page", () => {
    fireEvent.click(screen.getByTestId("profileSummaryName"));
    expect(mockRouter.asPath).toEqual(`/user/${fakeUser.id}`);
  });
});
