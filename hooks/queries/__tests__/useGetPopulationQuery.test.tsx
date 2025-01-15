import { renderHook, waitFor } from "@testing-library/react";
import { datausaApi } from "@/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useGetPopulationQuery } from "../useGetPopulationQuery";
import { PopulationRes } from "@/api/schemas/populationSchema";
import { populationResMock } from "@/constants/mocks/population";

jest.mock("@/api", () => ({
  datausaApi: {
    getPopulation: jest.fn(),
  },
}));

const queryClient = new QueryClient();

// Wrapper to provide QueryClient context
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useGetPopulationQuery", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it("should fetch population data with correct query parameters", async () => {
    const mockPopulationData: PopulationRes = populationResMock;

    (datausaApi.getPopulation as jest.Mock).mockResolvedValue(
      mockPopulationData
    );

    const { result } = renderHook(
      () =>
        useGetPopulationQuery({
          drilldowns: "Nation",
          measures: "Population",
        }),
      { wrapper }
    );

    // Wait for the hook to finish loading
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Assert the query function was called with the expected parameters
    expect(datausaApi.getPopulation).toHaveBeenCalledWith({
      queries: {
        drilldowns: "Nation",
        measures: "Population",
      },
    });

    // Assert that the returned data is the mock population data
    expect(result.current.data).toEqual(mockPopulationData);
  });
});
