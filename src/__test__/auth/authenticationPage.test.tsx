import AuthenticationPage from "../../pages/auth/index";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import authenticate from "../../utils/authenticate";
import mockRouter from "next-router-mock";
import { act } from "react-dom/test-utils";
import { MemoryRouterProvider } from "next-router-mock/dist/MemoryRouterProvider";

let mockFetcher = authenticate as jest.Mock;

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("../../utils/authenticate");

describe("Test Page : Authentication Page", () => {
  beforeEach(() => {
    render(<AuthenticationPage />, { wrapper: MemoryRouterProvider });
  });
  describe("Check Inputs and response for that", () => {
    it("if inputs are empty (one or both) show error msg", () => {
      const button = screen.getByTestId("authButton");
      const textInput = screen.getByTestId("authTextInput");
      const passwordInput = screen.getByTestId("authPasswordInput");
      fireEvent.click(button);
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
      fireEvent.change(textInput, { target: { value: "hello" } });
      fireEvent.click(button);
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
      fireEvent.change(textInput, { target: { value: "" } });
      fireEvent.change(passwordInput, { target: { value: "hello" } });
      fireEvent.click(button);
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
    });

    it("if email address are not valid show error ", () => {
      const button = screen.getByTestId("authButton");
      const textInput = screen.getByTestId("authTextInput");
      const passwordInput = screen.getByTestId("authPasswordInput");
      fireEvent.change(textInput, { target: { value: "hello" } });
      fireEvent.change(passwordInput, { target: { value: "hello22313" } });
      fireEvent.click(button);
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
      expect(
        screen.getByText("Please use a Valid Email Address")
      ).toBeInTheDocument();
    });

    it("if password length less than 8 character show error ", () => {
      const button = screen.getByTestId("authButton");
      const textInput = screen.getByTestId("authTextInput");
      const passwordInput = screen.getByTestId("authPasswordInput");
      fireEvent.change(textInput, { target: { value: "hello@gmail.com" } });
      fireEvent.change(passwordInput, { target: { value: "hello2w" } });
      fireEvent.click(button);
      expect(screen.getByTestId("errorMessage")).toBeInTheDocument();
      expect(
        screen.getByText("Please Use Password with 8 or more Character")
      ).toBeInTheDocument();
    });
  });

  describe("if inputs are ok Lets trigger Submit button", () => {
    beforeEach(() => {
      const textInput = screen.getByTestId("authTextInput");
      const passwordInput = screen.getByTestId("authPasswordInput");
      fireEvent.change(textInput, { target: { value: "hello@gmail.com" } });
      fireEvent.change(passwordInput, { target: { value: "hello2w22" } });
    });
    it("if server response to us with status true show success msg and redirect to home page", async () => {
      mockFetcher.mockReturnValue(
        new Promise((res) =>
          res({
            status: true,
            msg: "successfully authenticate",
            data: { some: "" },
          })
        )
      );
      const button = screen.getByTestId("authButton");
      fireEvent.click(button);
      expect(screen.getByTestId("waitMessage")).toBeInTheDocument();
      await waitFor(() =>
        expect(screen.getByTestId("successMessage")).toBeInTheDocument()
      );
      expect(screen.getByText("successfully authenticate")).toBeInTheDocument();
      await waitFor(() => expect(mockRouter.asPath).toEqual("/"));
    });

    it("if server response to us with status false show error msg", async () => {
      mockFetcher.mockReturnValue(
        new Promise((res) =>
          res({ status: false, msg: "error in authenticate" })
        )
      );
      const button = screen.getByTestId("authButton");
      fireEvent.click(button);
      expect(screen.getByTestId("waitMessage")).toBeInTheDocument();
      await waitFor(() =>
        expect(screen.getByTestId("errorMessage")).toBeInTheDocument()
      );
      expect(screen.getByText("error in authenticate")).toBeInTheDocument();
    });
  });
  describe("change login and sign up mode", () => {
    beforeEach(() => {
      mockFetcher.mockClear();
      const textInput = screen.getByTestId("authTextInput");
      const passwordInput = screen.getByTestId("authPasswordInput");
      fireEvent.change(textInput, { target: { value: "hello@gmail.com" } });
      fireEvent.change(passwordInput, { target: { value: "hello2w22" } });
    });
    it("in default auth mode is sing up", async () => {
      mockFetcher.mockReturnValue(
        new Promise((res) =>
          res({ status: true, msg: "error in authenticate" })
        )
      );
      const button = screen.getByTestId("authButton");

      fireEvent.click(button);

      await waitFor(() =>
        expect(mockFetcher.mock.calls[0][0]).toContain("register")
      );
      await waitFor(() => expect(mockRouter.asPath).toEqual("/"));
    });

    it("lets change it and login", async () => {
      fireEvent.click(screen.getByTestId("authSwitchAuthType"));
      const button = screen.getByTestId("authButton");
      fireEvent.click(button);
      await waitFor(() =>
        expect(mockFetcher.mock.calls[0][0]).toContain("login")
      );
    });
  });
});
