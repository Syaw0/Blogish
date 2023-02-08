import SettingEmail from "./settingEmail";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import makeStore from "../../store/setting/setting";
import { fakeUser } from "../../shared/fakePost";
import updateEmail from "../../utils/updateEmail";

jest.mock("../../utils/updateEmail");
jest.mock("next/router", () => require("next-router-mock"));

const mockUpdateEmail = updateEmail as jest.Mock;

const CustomParent = () => {
  return (
    <Provider store={makeStore({ isLogin: true, profileData: fakeUser })}>
      <SettingEmail />
    </Provider>
  );
};

describe("TEST COMPONENT : Setting Email", () => {
  it("its render properly", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("settingEmailHolder")).toBeInTheDocument();
    expect(screen.getByTestId("settingEmailInput")).toBeInTheDocument();
    expect(screen.getByTestId("settingEmailUpdateButton")).toBeInTheDocument();
  });
  it("click on the update", async () => {
    render(<CustomParent />);
    mockUpdateEmail.mockReturnValueOnce(
      new Promise((res) => res({ status: false }))
    );
    mockUpdateEmail.mockReturnValueOnce(
      new Promise((res) => res({ status: true }))
    );
    fireEvent.click(screen.getByTestId("settingEmailUpdateButton"));
    expect(mockUpdateEmail).toBeCalledTimes(0);
    // inputs must be fill
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();

    fireEvent.change(screen.getByTestId("settingEmailInput"), {
      target: { value: "bealbelaaa" },
    });
    fireEvent.click(screen.getByTestId("settingEmailUpdateButton"));
    expect(mockUpdateEmail).toBeCalledTimes(0);
    // if email in not a valid form
    await waitFor(() =>
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument()
    );

    fireEvent.change(screen.getByTestId("settingEmailInput"), {
      target: { value: "s@gmail.com" },
    });
    fireEvent.click(screen.getByTestId("settingEmailUpdateButton"));
    expect(mockUpdateEmail).toBeCalledTimes(1);

    await waitFor(() =>
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByTestId("settingEmailUpdateButton"));
    expect(mockUpdateEmail).toBeCalledTimes(2);
    await waitFor(() =>
      expect(screen.getByTestId("successMessage")).toBeInTheDocument()
    );
  });
});
