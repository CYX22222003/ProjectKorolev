import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import App2 from "./AppTest";
import React from "react";

//simple js testing
test("renders learn react link", () => {
  render(<App2 />);
  const linkElement = screen.getByText(/Test/i);
  expect(linkElement).toBeInTheDocument();
});
