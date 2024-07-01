import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import MySnackbar from "../Components/SnackBar";
import React, { ReactElement } from "react";
import userEvent from "@testing-library/user-event";
import MyDatePicker from "../Components/DatePicker";
import Upload from "../Components/Upload";
import Editor from "../DocumentEditor/EditorMain";
import fetchMock from "jest-fetch-mock";

describe("Test self-created components", () => {
  let consoleErrorSpy : jest.SpyInstance;
  let consoleWarnSpy : jest.SpyInstance;

  beforeEach(() => {
    fetchMock.resetMocks();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
  })

  it("Test snack bar", async () => {
    const func = jest.fn();
    function SnackbarTestStub(): ReactElement {
      const open = true;
      return <MySnackbar open={open} setOpen={func} message="test" />;
    }

    render(<SnackbarTestStub />);
    expect(screen.getByText(/test/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button"));
    expect(func).toBeCalled();
  });

  it("Test Date Picker", async () => {
    function TestStub(): ReactElement {
      return <MyDatePicker value="" setVal={jest.fn()} />;
    }

    render(<TestStub />);
    const dateInput: HTMLElement = screen.getByLabelText(
      "Choose the date of the session",
    );
    expect(dateInput).toBeInTheDocument();
  });

  it("Test Upload", async () => {
    render(<Upload title="test" containerName="data" />);
    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });

  it("Test editor", () => {
    render(<Editor />)
    fetchMock.mockResponse(JSON.stringify({}));
    expect(screen.getByText(/Editor/i)).toBeInTheDocument();
  });
})

