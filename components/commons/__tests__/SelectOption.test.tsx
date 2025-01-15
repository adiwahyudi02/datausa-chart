import { render, screen, fireEvent } from "@testing-library/react";
import { SelectOption } from "../SelectOption";

describe("SelectOption Component", () => {
  const options = [
    { value: 1, label: "Option 1" },
    { value: 2, label: "Option 2" },
    { value: 3, label: "Option 3" },
  ];

  it("should render the select input and options correctly", () => {
    render(
      <SelectOption
        label="Choose Option"
        options={options}
        onChange={jest.fn()}
      />
    );

    // Check if the label is rendered
    expect(screen.getByText("Choose Option")).toBeInTheDocument();

    // Check if the options are rendered
    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it("should handle option change correctly", () => {
    const onChangeMock = jest.fn();
    render(
      <SelectOption
        label="Choose Option"
        options={options}
        value={1}
        onChange={onChangeMock}
      />
    );

    // Simulate selecting an option
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "2" } });

    // Check if the change handler was called with the correct value
    expect(onChangeMock).toHaveBeenCalledWith("2");
  });

  it("should render the placeholder text", () => {
    render(
      <SelectOption
        label="Choose Option"
        options={options}
        onChange={jest.fn()}
      />
    );

    // Check for placeholder text
    expect(screen.getByText("Choose the options")).toBeInTheDocument();
  });

  it("should apply disabled styles when disabled is true", () => {
    render(
      <SelectOption
        label="Choose Option"
        options={options}
        onChange={jest.fn()}
        disabled={true}
      />
    );

    // Check if the select element is disabled
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("should apply error styles when there is an error", () => {
    render(
      <SelectOption
        label="Choose Option"
        options={options}
        onChange={jest.fn()}
        error="This field is required"
      />
    );

    // Check if error message is rendered
    expect(screen.getByText("This field is required")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveClass("border-red-500");
  });
});
