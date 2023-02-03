import Error from "./error";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const error404 = {
  code: 404,
  description: "some des",
  extra: <p data-testid="someExtra"></p>,
};

describe("TEST COMPONENT: Error", () => {
  it("its render properly", () => {
    render(<Error {...error404} />);
    expect(screen.getByTestId("errorHolder")).toBeInTheDocument();
    expect(screen.getByTestId("errorHeadText")).toBeInTheDocument();
    expect(screen.getByTestId("errorCode")).toBeInTheDocument();
    expect(screen.getByTestId("errorDes")).toBeInTheDocument();
    expect(screen.getByTestId("someExtra")).toBeInTheDocument();

    expect(screen.getByTestId("errorCode")).toHaveTextContent(
      `${error404.code}`
    );
    expect(screen.getByTestId("errorDes")).toHaveTextContent(
      error404.description
    );
  });
});
