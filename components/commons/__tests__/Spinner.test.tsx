import { render } from "@testing-library/react";
import { Spinner } from "../Spinner";

describe("Spinner Component", () => {
  it("should render the spinner", () => {
    const { container } = render(<Spinner />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});
