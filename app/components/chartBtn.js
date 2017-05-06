import React from 'react';

const ChartButton = (props) => {
  return (
      <button className="chart-btn" onClick={props.toggleChart}>{props.chartBtnName}</button>
  );
}

export default ChartButton;
