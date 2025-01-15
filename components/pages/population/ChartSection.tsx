import { LineChartComponent } from "@/components/commons/LineChartComponent";
import { PieChartComponent } from "@/components/commons/PieChartComponent";
import { ChartData, ChartOptions } from "chart.js";

interface ChartSectionProps {
  populationGrowthData: ChartData<"line">;
  populationGrowthOptions?: ChartOptions<"line">;
  demographicProportionData: ChartData<"pie">;
  demographicProportionOptions?: ChartOptions<"pie">;
  isLoading?: boolean;
}

export const ChartSection = ({
  populationGrowthData,
  demographicProportionData,
  isLoading,
}: ChartSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
      <div className="w-full min-h-60 flex flex-col items-center border border-gray-400 rounded-xl p-2 sm:p-5">
        <h2 className="text-xl font-semibold mb-4">Population Growth</h2>
        <div className="w-full h-full flex items-center">
          <div className="w-full">
            <LineChartComponent
              data={populationGrowthData}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
      <div className="w-full min-h-60 flex flex-col items-center border border-gray-400 rounded-xl p-2 sm:p-5">
        <h2 className="text-xl font-semibold mb-4">Demographic Proportions</h2>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-96">
            <PieChartComponent
              data={demographicProportionData}
              options={{
                radius: "90%",
              }}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
