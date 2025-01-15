import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Spinner } from "./Spinner";
import { formatNumberWithCommas } from "@/utils/formatNumber";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: ChartData<"pie">;
  options?: ChartOptions<"pie">;
  isLoading?: boolean;
}

const defaultOptions: ChartOptions<"pie"> = {
  responsive: true,
  plugins: {
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          const data = tooltipItem.chart.data.datasets[0].data as number[];
          const total = data.reduce((a: number, b: number) => a + b, 0);
          const value = tooltipItem.raw as number;
          const percentage = ((value / total) * 100).toFixed(2);
          return `${formatNumberWithCommas(
            tooltipItem.raw as number
          )} - ${percentage}%`;
        },
      },
    },
  },
};

export const PieChartComponent = ({
  data,
  options,
  isLoading = false,
}: PieChartProps) => {
  const mergedOptions = { ...defaultOptions, ...options };

  return (
    <div className="relative w-full h-full">
      {isLoading ? <Spinner /> : <Pie data={data} options={mergedOptions} />}
    </div>
  );
};
