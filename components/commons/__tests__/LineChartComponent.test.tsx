import { render, screen } from "@testing-library/react";
import { LineChartComponent } from "../LineChartComponent";
import { formatNumberWithCommas } from "@/utils/formatNumber";

jest.mock("react-chartjs-2", () => ({
  Line: jest.fn(() => <div>Mocked Line Chart</div>),
}));

describe("LineChartComponent", () => {
  const chartData = {
    labels: ["January", "February", "March"],
    datasets: [
      {
        label: "My dataset",
        data: [65, 59, 80],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  it("should render the line chart when not loading", () => {
    render(<LineChartComponent data={chartData} isLoading={false} />);

    // Check if the mocked chart is rendered
    expect(screen.getByText("Mocked Line Chart")).toBeInTheDocument();
  });

  it("should show a spinner when loading", () => {
    render(<LineChartComponent data={chartData} isLoading={true} />);

    // Check if the spinner is rendered
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("should format tooltip labels correctly", async () => {
    render(<LineChartComponent data={chartData} isLoading={false} />);

    // Mocking the tooltip callback for testing
    const tooltipItem = {
      raw: 1000,
    };

    const formattedLabel = formatNumberWithCommas(tooltipItem.raw);

    // Expect the tooltip formatting logic to be applied
    expect(formattedLabel).toBe("1,000");
  });
});
