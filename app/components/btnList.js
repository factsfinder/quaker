import React from 'react';

const BtnList = (props) => {
  return (
    <div className="earthquake-btn-select">
      <button className="btn" onClick={props.Earthquakes_PastHour}>Earthquakes Past Hour</button>
      <button className="btn" onClick={props.Earthquakes_PastDay}>Earthquakes Past Day</button>
      <button className="btn" onClick={props.Earthquakes_PastWeek}>Earthquakes Past Week</button>
      <button className="btn" onClick={props.Earthquakes_PastMonth}>Earthquakes Past Month</button>
    </div>
  );
}

export default BtnList;
