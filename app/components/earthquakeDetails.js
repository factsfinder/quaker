import React from 'react';

const EarthquakeDetails = (props) => {
  return (
    <div className="earthquake-details">
      <p>An earthquake is happened at {props.place}</p>
      <p>The magnitude level is {props.mag}</p>
    </div>
  );
};

export default EarthquakeDetails;
