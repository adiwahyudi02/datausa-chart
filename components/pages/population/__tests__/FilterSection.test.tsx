import { render, screen, fireEvent } from "@testing-library/react";
import { FilterSection } from "../FilterSection";
import { OptionProps } from "@/components/commons/SelectOption";

describe("FilterSection", () => {
  const yearOptions: OptionProps[] = [
    { value: 2010, label: "2010" },
    { value: 2011, label: "2011" },
    { value: 2012, label: "2012" },
    { value: 2013, label: "2013" },
    { value: 2022, label: "2022" },
  ];

  const mockOnFilterData = jest.fn();

  // Reset the mock before each test
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks to ensure no test interference
  });

  it("should render start year and end year SelectOption components", () => {
    render(
      <FilterSection
        yearOptions={yearOptions}
        onFilterData={mockOnFilterData}
      />
    );

    expect(screen.getByLabelText(/Start Year/)).toBeInTheDocument();
    expect(screen.getByLabelText(/End Year/)).toBeInTheDocument();
  });

  it("should show error message when start year is greater than end year", () => {
    render(
      <FilterSection
        yearOptions={yearOptions}
        onFilterData={mockOnFilterData}
      />
    );

    // Change start year to 2022 and end year to 2010
    fireEvent.change(screen.getByLabelText(/Start Year/), {
      target: { value: 2022 },
    });
    fireEvent.change(screen.getByLabelText(/End Year/), {
      target: { value: 2010 },
    });

    // Check if error message is displayed
    expect(
      screen.getByText(/Must be later than or equal to the start year./)
    ).toBeInTheDocument();
  });

  it("should call onFilterData when valid year range is selected", () => {
    render(
      <FilterSection
        yearOptions={yearOptions}
        onFilterData={mockOnFilterData}
      />
    );

    // Change valid start and end years
    fireEvent.change(screen.getByLabelText(/Start Year/), {
      target: { value: 2010 },
    });
    fireEvent.change(screen.getByLabelText(/End Year/), {
      target: { value: 2022 },
    });

    // Check if onFilterData was called with correct values
    expect(mockOnFilterData).toHaveBeenCalledWith(2010, 2022);
  });

  it("should not call onFilterData when year range is invalid", () => {
    render(
      <FilterSection
        yearOptions={yearOptions}
        onFilterData={mockOnFilterData}
      />
    );

    // Change invalid start and end years
    fireEvent.change(screen.getByLabelText(/Start Year/), {
      target: { value: 2022 },
    });
    fireEvent.change(screen.getByLabelText(/End Year/), {
      target: { value: 2010 },
    });

    // Check if error message is displayed
    expect(
      screen.getByText(/Must be later than or equal to the start year./)
    ).toBeInTheDocument();

    // Ensure that onFilterData is NOT called due to invalid year range
    // the called time is 1 because it was called at first render for get initial data
    expect(mockOnFilterData).toHaveBeenCalledTimes(1);
  });
});
