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

const datas = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const ChartTab = () => {
  const { id } = useParams();

  const { data, isFetching } = useAnalysisChartQuery(id);

  console.log(data);

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <div className="w-full h-[450px] border border-white/50 rounded-lg p-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={300}
          height={300}
          data={datas}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
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
            cursor={{ fill: "transparent" }}
          />
          <Legend />
          <Bar
            dataKey="pv"
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
