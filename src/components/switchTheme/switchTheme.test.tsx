import SwitchTheme from "./switchTheme";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ThemeProvider from "../../contexts/themeContext";

const CustomParent = () => {
  return (
    <ThemeProvider>
      <SwitchTheme />
    </ThemeProvider>
  );
};

describe("TEST COMPONENT : Switch Theme", () => {
  it("its render properly", () => {
    render(<CustomParent />);
    // default is light
    const holder = screen.getByTestId("themeSwitch");
    const light = screen.getByTestId("light");
    expect(holder).toBeInTheDocument();
    expect(light).toBeInTheDocument();
    fireEvent.click(holder);
    expect(light).not.toBeInTheDocument();
    expect(screen.getByTestId("dark")).toBeInTheDocument();
  });
});
