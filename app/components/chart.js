import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Chart = (props) => {
  return (
    <div className="earthquake-charts">
      <LineChart width={300} height={100} data={props.data}>
        <Line type='monotone' dataKey='pv' stroke='#8884d8' strokeWidth={2} />
      </LineChart>
    </div>
  );
}

export default Chart;
