import { render, screen } from "@testing-library/react";
import { ChartSection } from "../ChartSection";

jest.mock("@/components/commons/LineChartComponent", () => ({
  LineChartComponent: jest.fn(() => <div>Line Chart</div>),
}));

jest.mock("@/components/commons/PieChartComponent", () => ({
  PieChartComponent: jest.fn(() => <div>Pie Chart</div>),
}));

describe("ChartSection", () => {
  const populationGrowthData = {
    labels: ["2020", "2021"],
    datasets: [{ data: [10, 15] }],
  };
  const demographicProportionData = {
    labels: ["Group A", "Group B"],
    datasets: [{ data: [60, 40] }],
  };

  it("should render both charts correctly", () => {
    render(
      <ChartSection
        populationGrowthData={populationGrowthData}
        demographicProportionData={demographicProportionData}
      />
    );

    // Check that both chart components are rendered
    expect(screen.getByText("Line Chart")).toBeInTheDocument();
    expect(screen.getByText("Pie Chart")).toBeInTheDocument();
  });

  it("should display the correct titles", () => {
    render(
      <ChartSection
        populationGrowthData={populationGrowthData}
        demographicProportionData={demographicProportionData}
      />
    );

    // Check that titles for both charts are displayed
    expect(screen.getByText(/Population Growth/)).toBeInTheDocument();
    expect(screen.getByText(/Demographic Proportions/)).toBeInTheDocument();
  });

  it("should not display loading state when isLoading is false", () => {
    render(
      <ChartSection
        populationGrowthData={populationGrowthData}
        demographicProportionData={demographicProportionData}
        isLoading={false}
      />
    );

    // Ensure that no loading indicators are present
    expect(screen.queryByRole("status")).toBeNull();
  });
});
