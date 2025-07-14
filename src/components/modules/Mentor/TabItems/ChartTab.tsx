import Spinner from "@/components/common/Spinner";
import { useAnalysisChartQuery } from "@/redux/features/users/users.api";
import { useParams } from "next/navigation";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ChartTab = () => {
  const { id } = useParams();

  const { data, isFetching } = useAnalysisChartQuery(id);

  if (isFetching) {
    return <Spinner />;
  }

  const chartData = data?.data?.monthlyData;

  return (
    <div className="w-full h-[450px] border border-white/50 rounded-lg p-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={300}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            formatter={(value) => [`${value}`, "Videos"]}
            labelFormatter={(label) => `Month: ${label}`}
            contentStyle={{
              backgroundColor: "#1e293b",
              color: "#ffffff",
              borderRadius: 8,
            }}
            itemStyle={{ color: "#22c55e" }}
            labelStyle={{ color: "#facc15" }}
            cursor={{ fill: "transparent" }}
          />
          <Legend />
          <Bar
            dataKey="videoCount"
            fill="#BFE91FB0"
            barSize={50}
            radius={[5, 5, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartTab;
