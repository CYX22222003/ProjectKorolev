import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from "@testing-library/react";
import App from "./App";

//simple js testing
test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders test react link", () => {
  render(<App />);
  expect(screen.queryByText(/Test/g)).toBeInTheDocument();
});

describe(App, () => {
  it("test suite 3", () => {
    render(<App />);
    expect(screen.queryByText(/Test/g)).toBeInTheDocument();
  });
}) ;