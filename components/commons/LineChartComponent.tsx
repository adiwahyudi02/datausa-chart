import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Spinner } from "./Spinner";
import { formatNumberWithCommas } from "@/utils/formatNumber";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

interface LineChartProps {
  data: ChartData<"line">;
  options?: ChartOptions<"line">;
  isLoading?: boolean;
}

const defaultOptions: ChartOptions<"line"> = {
  responsive: true,
  scales: {
    x: {
      grid: { color: "#ccc" },
    },
    y: {
      grid: { color: "#ccc" },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          return `${formatNumberWithCommas(tooltipItem.raw as number)}`;
        },
      },
    },
  },
};

export const LineChartComponent = ({
  data,
  options,
  isLoading = false,
}: LineChartProps) => {
  const mergedOptions = { ...defaultOptions, ...options };

  return (
    <div className="relative w-full h-full">
      {isLoading ? <Spinner /> : <Line data={data} options={mergedOptions} />}
    </div>
  );
};
