import { OptionProps, SelectOption } from "@/components/commons/SelectOption";
import { useState } from "react";

interface FilterSectionProps {
  yearOptions: OptionProps[];
  defaultStartYear?: number;
  defaultEndYear?: number;
  onFilterData: (start: number, end: number) => void;
}

export const FilterSection = ({
  yearOptions,
  defaultStartYear = 2013,
  defaultEndYear = 2022,
  onFilterData,
}: FilterSectionProps) => {
  const [startYear, setStartYear] = useState<number>(defaultStartYear);
  const [endYear, setEndYear] = useState<number>(defaultEndYear);
  const [isYearRangeInvalid, setIsYearRangeInvalid] = useState(false);

  const handleYearRangeValidation = (start: number, end: number) => {
    // invalid condition
    if (!end || start > end || !start || end < start) {
      setIsYearRangeInvalid(true);
      return false;
    }

    setIsYearRangeInvalid(false);
    return true;
  };

  const handleStartYearChange = (value: string | number) => {
    const selectedStartYear = Number(value);
    setStartYear(selectedStartYear);

    const isValid = handleYearRangeValidation(selectedStartYear, endYear);
    if (isValid) {
      onFilterData(selectedStartYear, endYear);
    }
  };

  const handleEndYearChange = (value: string | number) => {
    const selectedEndYear = Number(value);
    setEndYear(selectedEndYear);

    const isValid = handleYearRangeValidation(startYear, selectedEndYear);
    if (isValid) {
      onFilterData(startYear, selectedEndYear);
    }
  };

  return (
    <div className="w-full flex gap-4 mb-7">
      <div className="w-64">
        <SelectOption
          label="Start Year"
          placeholder="Select a year"
          value={startYear}
          onChange={handleStartYearChange}
          options={yearOptions}
          error={
            isYearRangeInvalid
              ? "Must be earlier than or equal to the end year."
              : ""
          }
        />
      </div>
      <div className="w-64">
        <SelectOption
          label="End Year"
          placeholder="Select a year"
          value={endYear}
          onChange={handleEndYearChange}
          options={yearOptions}
          error={
            isYearRangeInvalid
              ? "Must be later than or equal to the start year."
              : ""
          }
        />
      </div>
    </div>
  );
};
