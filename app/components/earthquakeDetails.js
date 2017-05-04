import React from 'react';

const EarthquakeDetails = (props) => {
  return (
    <div className="earthquake-details">
      <p>This earthquake is happened at {props.place} at {props.time}. <br /> The magnitude level is {props.mag}</p>
    </div>
  );
};

export default EarthquakeDetails;
