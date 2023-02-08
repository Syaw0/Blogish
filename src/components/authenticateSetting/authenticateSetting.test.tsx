import AuthenticateSetting from "./authenticateSetting";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import makeStore from "../../store/setting/setting";

jest.mock("next/router", () => require("next-router-mock"));

const CustomParent = () => {
  return (
    <Provider store={makeStore({})}>
      <AuthenticateSetting />
    </Provider>
  );
};

describe("TEST COMPONENT : AuthenticateSetting ", () => {
  it("its render properly", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("settingPasswordHolder")).toBeInTheDocument();
    expect(screen.getByTestId("authenticateSettingHolder")).toBeInTheDocument();
    expect(screen.getByTestId("settingEmailHolder")).toBeInTheDocument();
  });
});
