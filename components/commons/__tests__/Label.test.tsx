import { render, screen } from "@testing-library/react";
import { Label } from "../Label";

describe("Label Component", () => {
  it("should render the label text correctly", () => {
    render(<Label label="Test Label" />);

    // Check if the label text is rendered
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("should apply the red color class when isError is true", () => {
    render(<Label label="Test Label" isError={true} />);

    // Check if the label has the 'text-red-500' class
    expect(screen.getByText("Test Label")).toHaveClass("text-red-500");
  });

  it("should apply the black color class when isError is false", () => {
    render(<Label label="Test Label" isError={false} />);

    // Check if the label has the 'text-black' class
    expect(screen.getByText("Test Label")).toHaveClass("text-black");
  });

  it("should display the required asterisk when isRequired is true", () => {
    render(<Label label="Test Label" isRequired={true} />);

    // Check if the required asterisk is present
    expect(screen.getByText("*")).toBeInTheDocument();
    expect(screen.getByText("*")).toHaveClass("text-red-500");
  });

  it("should not display the required asterisk when isRequired is false", () => {
    render(<Label label="Test Label" isRequired={false} />);

    // Check if the required asterisk is not present
    expect(screen.queryByText("*")).toBeNull();
  });
});
