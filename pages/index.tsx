import { Population } from "@/api/schemas/populationSchema";
import { ChartSection } from "@/components/pages/population/ChartSection";
import { FilterSection } from "@/components/pages/population/FilterSection";
import { HeaderSection } from "@/components/pages/population/HeaderSection";
import { chartColors } from "@/constants/colors";
import { useGetPopulationQuery } from "@/hooks/queries/useGetPopulationQuery";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const defaultYear = {
    start: 2013,
    end: 2022,
  };

  const [population, setPopulation] = useState<Population>([]);

  const { data: rawData, isLoading } = useGetPopulationQuery({
    drilldowns: "Nation",
    measures: "Population",
  });

  const annotations = useMemo(() => rawData?.source[0].annotations, [rawData]);

  const yearOptions = useMemo(
    () =>
      (rawData?.data || [])
        .map((item) => ({ label: item.Year, value: item["ID Year"] }))
        .sort((a, b) => a.value - b.value),
    [rawData]
  );

  // line chart data
  const populationGrowthData = useMemo(() => {
    const sortedData =
      population.sort((a, b) => a["ID Year"] - b["ID Year"]) || [];
    return {
      labels: sortedData.map((item) => item["ID Year"]),
      datasets: [
        {
          label: "Population",
          data: sortedData.map((item) => item.Population),
          borderColor: chartColors.primary,
          backgroundColor: "#e5e7eb",
          fill: true,
          tension: 0.4,
        },
      ],
    };
  }, [population]);

  // pie chart data
  const demographicProportionData = useMemo(() => {
    const pieData = population || [];
    return {
      labels: pieData.map((item) => item["ID Year"]),
      datasets: [
        {
          data: pieData.map((item) => item["Population"]),
          backgroundColor: Object.values(chartColors),
          borderColor: "#e5e7eb",
          borderWidth: 2,
        },
      ],
    };
  }, [population]);

  const handleFilterData = (start: number, end: number) => {
    const filteredPopulation =
      rawData?.data.filter(
        (item) => item["ID Year"] >= start && item["ID Year"] <= end
      ) || [];

    setPopulation(filteredPopulation);
  };

  useEffect(() => {
    handleFilterData(defaultYear.start, defaultYear.end);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawData]);

  return (
    <div className="container mx-auto p-2">
      <HeaderSection
        sourceName={annotations?.source_name}
        sourceDescription={annotations?.source_description}
        isLoading={isLoading}
      />
      <FilterSection
        defaultStartYear={defaultYear.start}
        defaultEndYear={defaultYear.end}
        yearOptions={yearOptions}
        onFilterData={handleFilterData}
      />
      <ChartSection
        populationGrowthData={populationGrowthData}
        demographicProportionData={demographicProportionData}
        isLoading={isLoading}
      />
    </div>
  );
}
