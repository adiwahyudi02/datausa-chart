import { render, screen } from "@testing-library/react";
import { HeaderSection } from "../HeaderSection";

describe("HeaderSection", () => {
  it("should render sourceName and sourceDescription when provided", () => {
    const sourceName = "My Source";
    const sourceDescription = "This is a description of the source.";

    render(
      <HeaderSection
        sourceName={sourceName}
        sourceDescription={sourceDescription}
      />
    );

    // Check if sourceName and sourceDescription are rendered
    expect(screen.getByText(sourceName)).toBeInTheDocument();
    expect(screen.getByText(sourceDescription)).toBeInTheDocument();
  });

  it("should render only sourceName when sourceDescription is not provided", () => {
    const sourceName = "My Source";

    render(<HeaderSection sourceName={sourceName} />);

    // Check if only sourceName is rendered
    expect(screen.getByText(sourceName)).toBeInTheDocument();
    expect(
      screen.queryByText(/This is a description of the source./)
    ).toBeNull();
  });

  it("should render only sourceDescription when sourceName is not provided", () => {
    const sourceDescription = "This is a description of the source.";

    render(<HeaderSection sourceDescription={sourceDescription} />);

    // Check if only sourceDescription is rendered
    expect(screen.getByText(sourceDescription)).toBeInTheDocument();
    expect(screen.queryByText(/My Source/)).toBeNull();
  });

  it("should render nothing when neither sourceName nor sourceDescription are provided", () => {
    render(<HeaderSection />);

    // Check that nothing is rendered
    expect(screen.queryByText(/My Source/)).toBeNull();
    expect(
      screen.queryByText(/This is a description of the source./)
    ).toBeNull();
  });
});
