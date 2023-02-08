import SettingPassword from "./settingPassword";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import makeStore from "../../store/setting/setting";
import { fakeUser } from "../../shared/fakePost";
import updatePassword from "../../utils/updatePassword";

jest.mock("../../utils/changePassword");
jest.mock("next/router", () => require("next-router-mock"));

const mockChangePassword = updatePassword as jest.Mock;

const CustomParent = () => {
  return (
    <Provider store={makeStore({ isLogin: true, profileData: fakeUser })}>
      <SettingPassword />
    </Provider>
  );
};

describe("TEST COMPONENT : Setting Profile", () => {
  it("its render properly", () => {
    render(<CustomParent />);
    expect(screen.getByTestId("settingPasswordHolder")).toBeInTheDocument();
    expect(
      screen.getByTestId("settingPasswordOldPasswordInput")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("settingPasswordNewPassword")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("settingPasswordRetypeNewPassword")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("settingPasswordUpdateButton")
    ).toBeInTheDocument();
  });
  it("click on the update", async () => {
    render(<CustomParent />);
    mockChangePassword.mockReturnValueOnce(
      new Promise((res) => res({ status: false }))
    );
    mockChangePassword.mockReturnValueOnce(
      new Promise((res) => res({ status: true }))
    );
    fireEvent.click(screen.getByTestId("settingPasswordUpdateButton"));
    expect(mockChangePassword).toBeCalledTimes(0);
    // inputs must be fill
    expect(screen.getByTestId("errorMessage")).toBeInTheDocument();

    fireEvent.change(screen.getByTestId("settingPasswordNewPassword"), {
      target: { value: "bealbelaaa" },
    });
    fireEvent.change(screen.getByTestId("settingPasswordRetypeNewPassword"), {
      target: { value: "bealbelaaa" },
    });
    fireEvent.change(screen.getByTestId("settingPasswordOldPasswordInput"), {
      target: { value: "bealbelaaa" },
    });

    fireEvent.click(screen.getByTestId("settingPasswordUpdateButton"));
    expect(mockChangePassword).toBeCalledTimes(1);
    await waitFor(() =>
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument()
    );
    fireEvent.click(screen.getByTestId("settingPasswordUpdateButton"));
    expect(mockChangePassword).toBeCalledTimes(2);
    await waitFor(() =>
      expect(screen.getByTestId("successMessage")).toBeInTheDocument()
    );
  });
});
