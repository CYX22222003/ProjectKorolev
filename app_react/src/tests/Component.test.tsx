import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import App2 from "./AppTest";
import MySnackbar from "../Components/SnackBar";
import React, { ReactElement, useState } from "react";

export function SnackbarTestStub() : ReactElement {
    const [open, setOpen] = useState<boolean>(true);
    return <MySnackbar open={open} setOpen={setOpen} message="test"/>;
}

//simple js testing
it("renders learn react link", () => {
  render(<App2 />);
  const linkElement = screen.getByText(/Test/i);
  expect(linkElement).toBeInTheDocument();
});


test("Test snack bar", () => {
  render(<SnackbarTestStub />);
  expect(screen.getByText(/test/i)).toBeInTheDocument();
})
