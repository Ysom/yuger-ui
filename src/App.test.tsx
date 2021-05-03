import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Yuger-UI text", () => {
  render(<App />);
  const descElement = screen.getByText(/Yuger-UI/i);
  expect(descElement).toBeInTheDocument();
});
