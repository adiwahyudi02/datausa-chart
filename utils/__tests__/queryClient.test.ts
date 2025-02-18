import { QueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryClient, showErrorToast } from "@/utils/queryClient";

jest.mock("react-toastify");

describe("Query Client and Toast Error Handling", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous calls and state
  });

  it("should show error toast with the correct message", () => {
    const errorMessage = "Network error";
    showErrorToast(errorMessage);

    // Verify that the toast is shown with the correct parameters
    expect(toast.error).toHaveBeenCalledWith(errorMessage);
  });

  it("should create a QueryClient with the correct default options", () => {
    expect(queryClient).toBeInstanceOf(QueryClient);

    // Type assertion to ensure the properties are accessed safely
    const defaultOptions = queryClient.getDefaultOptions() as {
      queries: {
        staleTime: number;
        retry: number;
      };
    };

    expect(defaultOptions.queries.staleTime).toBe(60 * 1000);
    expect(defaultOptions.queries.retry).toBe(2);
  });
});
