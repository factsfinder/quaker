import React, { memo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ chartData }) => {
  return (
    //Chart that shows relation between earthquakes and their magnitude
    <div className="earthquake-charts" style={{ color: "white" }}>
      <ResponsiveContainer width="60%" height={400}>
        <LineChart data={chartData}>
          <XAxis />
          <YAxis dataKey="magnitude" />
          <CartesianGrid strokeDasharray="5 5" />
          <Tooltip cursor={{ stroke: "white", strokeWidth: 2 }} />
          <Legend iconSize={20} />
          <Line type="monotone" dataKey="magnitude" stroke="#4CAF50" />
          <Line type="monotone" dataKey="time" stroke="red" />
          <Line type="monotone" dataKey="place" stroke="blue" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default memo(Chart);
