import ProfileSummary from "./profileSummary";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fakeUser } from "../../shared/fakePost";

const mockCallback = jest.fn(() => {});

const CustomParent = () => {
  return <ProfileSummary {...fakeUser} />;
};

describe("Component Test : Profile", () => {
  beforeEach(() => {
    render(<CustomParent />);
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
});
