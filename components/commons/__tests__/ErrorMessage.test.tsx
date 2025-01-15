import { render, screen } from "@testing-library/react";
import { ErrorMessage } from "../ErrorMessage";

describe("ErrorMessage", () => {
  it('should display an error message when the "error" prop is passed', () => {
    render(<ErrorMessage error="This is an error" />);

    // Check if the error message is displayed
    expect(screen.getByText("This is an error")).toBeInTheDocument();
    expect(screen.getByText("This is an error")).toHaveClass("text-red-500");
  });

  it('should not display an error message when the "error" prop is not passed', () => {
    render(<ErrorMessage />);

    // Check if no error message is displayed
    expect(screen.queryByText("This is an error")).toBeNull();
  });
});
