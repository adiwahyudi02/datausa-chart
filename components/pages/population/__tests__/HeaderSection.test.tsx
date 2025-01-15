import { render, screen } from "@testing-library/react";
import { HeaderSection } from "../HeaderSection";

jest.mock("@/components/commons/Spinner", () => ({
  Spinner: jest.fn(() => <div data-testid="spinner">Loading...</div>),
}));

describe("HeaderSection", () => {
  it("should render the loading spinner when isLoading is true", () => {
    render(<HeaderSection isLoading={true} />);

    // Check that the spinner is rendered
    expect(screen.getByTestId("spinner")).toBeInTheDocument();

    // Ensure no other content is displayed
    expect(screen.queryByText(/Test Source/)).toBeNull();
    expect(screen.queryByText(/Test Description/)).toBeNull();
  });

  it("should render source name and description when isLoading is false", () => {
    render(
      <HeaderSection
        sourceName="Test Source"
        sourceDescription="Test Description"
        isLoading={false}
      />
    );

    // Check that the content is displayed
    expect(screen.getByText("Test Source")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();

    // Ensure the spinner is not rendered
    expect(screen.queryByTestId("spinner")).toBeNull();
  });

  it("should render empty content when no source name or description is provided", () => {
    render(<HeaderSection isLoading={false} />);

    // Ensure no content is displayed
    expect(screen.queryByText(/Test Source/)).toBeNull();
    expect(screen.queryByText(/Test Description/)).toBeNull();

    // Ensure the spinner is not rendered
    expect(screen.queryByTestId("spinner")).toBeNull();
  });
});
