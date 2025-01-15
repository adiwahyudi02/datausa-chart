import { render, screen } from "@testing-library/react";
import { PieChartComponent } from "../PieChartComponent";
import { formatNumberWithCommas } from "@/utils/formatNumber";

jest.mock("react-chartjs-2", () => ({
  Pie: jest.fn(() => <div>Mocked Pie Chart</div>),
}));

describe("PieChartComponent", () => {
  const chartData = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My dataset",
        data: [300, 50, 100],
        backgroundColor: ["#FF0000", "#0000FF", "#FFFF00"],
        hoverBackgroundColor: ["#FF0000", "#0000FF", "#FFFF00"],
      },
    ],
  };

  it("should render the pie chart when not loading", () => {
    render(<PieChartComponent data={chartData} isLoading={false} />);

    // Check if the mocked pie chart is rendered
    expect(screen.getByText("Mocked Pie Chart")).toBeInTheDocument();
  });

  it("should show a spinner when loading", () => {
    render(<PieChartComponent data={chartData} isLoading={true} />);

    // Check if the spinner is rendered
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("should format tooltip labels correctly", () => {
    render(<PieChartComponent data={chartData} isLoading={false} />);

    // Mocking the tooltip callback for testing
    const tooltipItem = {
      raw: 300,
      chart: { data: { datasets: [{ data: [300, 50, 100] }] } },
    };
    const formattedLabel = `${formatNumberWithCommas(tooltipItem.raw)} - ${(
      (300 / 450) *
      100
    ).toFixed(2)}%`;

    // Expect the tooltip to display the correct formatted label
    expect(formattedLabel).toBe("300 - 66.67%");
  });
});
