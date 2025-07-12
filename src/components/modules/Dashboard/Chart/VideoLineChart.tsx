"use client";
import { useUserChartDataQuery } from "@/redux/features/dashboard/dashboard.api";
import {
  LineChart,
  Line,
  XAxis,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const VideoLineChart = () => {
  const { data: chartData } = useUserChartDataQuery(undefined);
  const data = chartData?.data?.sortedWeeks;
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line
            type="monotone"
            dataKey="count"
            stroke="#36F232"
            strokeWidth={4}
          />
          <XAxis dataKey="week" />
          <Legend align="right" />
          <Tooltip
            formatter={(value) => [`${value}`, "User"]}
            labelFormatter={(label) => `Week: ${label}`}
            contentStyle={{
              backgroundColor: "#1e293b",
              color: "#ffffff",
              borderRadius: 8,
            }}
            itemStyle={{ color: "#22c55e" }} 
            labelStyle={{ color: "#facc15" }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VideoLineChart;
