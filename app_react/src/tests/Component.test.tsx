import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent} from "@testing-library/react";
import MySnackbar from "../Components/SnackBar";
import React, { ReactElement } from "react";
import userEvent from "@testing-library/user-event";



test("Test snack bar", async () => {
  const func = jest.fn();
  function SnackbarTestStub() : ReactElement {
    const open = true
    return <MySnackbar open={open} setOpen={func} message="test"/>;
  }

  render(<SnackbarTestStub />);
  expect(screen.getByText(/test/i)).toBeInTheDocument();
  await userEvent.click(screen.getByRole("button"));
  expect(func).toBeCalled()
})
