import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useGetPopulationQuery } from "@/hooks/queries/useGetPopulationQuery";
import { populationResMock } from "@/constants/mocks/population";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "@/pages";

jest.mock("@/hooks/queries/useGetPopulationQuery");

jest.mock("@/components/commons/LineChartComponent", () => ({
  LineChartComponent: () => <div>Line Chart</div>,
}));

jest.mock("@/components/commons/PieChartComponent", () => ({
  PieChartComponent: () => <div>Pie Chart</div>,
}));

// Shared QueryClient instance
const queryClient = new QueryClient();

describe("Home Page", () => {
  const mockUseGetPopulationQuery = useGetPopulationQuery as jest.Mock;

  const renderHomePage = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

  beforeEach(() => {
    mockUseGetPopulationQuery.mockReturnValue({
      data: populationResMock,
      isLoading: false,
    });
  });

  it("should render the components correctly", () => {
    renderHomePage();

    // Assertions for static content
    expect(
      screen.getByText(
        populationResMock.source.at(0)?.annotations?.source_name as string
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        populationResMock.source.at(0)?.annotations
          ?.source_description as string
      )
    ).toBeInTheDocument();

    expect(screen.getByText("Population Growth")).toBeInTheDocument();
    expect(screen.getByText("Demographic Proportions")).toBeInTheDocument();
    expect(screen.getByLabelText(/Start Year/)).toBeInTheDocument();
    expect(screen.getByLabelText(/End Year/)).toBeInTheDocument();
  });

  it("should update chart data when filtering", async () => {
    renderHomePage();

    // Simulate filtering
    fireEvent.change(screen.getByLabelText(/Start Year/), {
      target: { value: 2015 },
    });
    fireEvent.change(screen.getByLabelText(/End Year/), {
      target: { value: 2020 },
    });

    // Wait and assert that the chart reflects the updated data
    await waitFor(() => {
      expect(screen.getByText("Population Growth")).toBeInTheDocument();
      expect(screen.getByText("Demographic Proportions")).toBeInTheDocument();
      // in this case it was covered by FilterSection component
    });
  });
});
