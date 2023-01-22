import ProfileSummary from "./profileSummary";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fakeUser } from "../../shared/fakePost";

const mockCallback = jest.fn(() => {});

const CustomParent = () => {
  return <ProfileSummary user={fakeUser} />;
};

describe("Component Test : Profile", () => {
  beforeEach(() => {
    render(<CustomParent />);
  });

  it("check component render perfectly", () => {
    expect(screen.getByAltText(fakeUser.name)).toBeInTheDocument();
    expect(screen.getByText(fakeUser.name)).toBeInTheDocument();
    expect(screen.getByText(fakeUser.description)).toBeInTheDocument();
    expect(screen.getByText(fakeUser.description)).toBeInTheDocument();
    expect(screen.getByTestId("profileSummaryProfile")).toBeInTheDocument();
  });
});
