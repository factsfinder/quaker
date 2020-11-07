import React, { useEffect, useState } from "react";
import Chart from "./components/chart.js";

const earthQuakesListUrls = {
  HOUR:
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson",
  DAY:
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson",
  WEEK:
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson",
};
function Earthquakes() {
  const [earthQuakesListUrl, setEarthQuakesListUrl] = useState(
    earthQuakesListUrls.HOUR
  );
  const [earthquakesData, setEarthQuakesData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [showEarthquakesList, setShowEarthQuakesList] = useState(false);
  const [showEarthquakesChart, setShowEarthQuakesChart] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [count, setCount] = useState(0);

  function toggleList() {
    setShowEarthQuakesList(!showEarthquakesList);
  }

  function toggleChart() {
    setShowEarthQuakesChart(!showEarthquakesChart);
  }

  function updateEarthQuakeListUrl(url) {
    return () => {
      setIsFetching(true);
      setEarthQuakesListUrl(url);
    };
  }

  useEffect(() => {
    const getEarthquakes = async () => {
      return fetch(earthQuakesListUrl)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const { features, metadata } = data;
          setIsFetching(false);
          const chartDataToShow = features.map(
            ({ properties: { time, place, mag } }) => {
              return {
                time,
                magnitude: mag,
                place,
              };
            }
          );
          setChartData(chartDataToShow);
          setEarthQuakesData(features);
          setCount(metadata.count);
          setShowEarthQuakesList(true);
          setShowEarthQuakesChart(true);
        })
        .catch((err) => {
          return { type: "FAILURE", err };
        });
    };
    getEarthquakes();
  }, [earthQuakesListUrl]);

  return (
    <div className="main">
   
        <h1>Quaker -- Earthquakes Monitoring</h1>
      
      <p className="text-center">
        Click on either one of the buttons below to get information about
        earthquakes happening around the world..!
      </p>
      <div className="flex-row flex-row__center">
        <button
          className="btn"
          onClick={updateEarthQuakeListUrl(earthQuakesListUrls.HOUR)}
        >
          Earthquakes Past Hour
        </button>
        <button
          className="btn"
          onClick={updateEarthQuakeListUrl(earthQuakesListUrls.DAY)}
        >
          Earthquakes Past Day
        </button>
        <button
          className="btn"
          onClick={updateEarthQuakeListUrl(earthQuakesListUrls.WEEK)}
        >
          Earthquakes Past Week
        </button>
      </div>

      {count > 0 && (
        <div className="toggle-list-chart-buttons">
          <button className="list-btn" onClick={toggleList}>
            {showEarthquakesList ? "hide list" : "show list"}
          </button>
          <button className="chart-btn" onClick={toggleChart}>
            {showEarthquakesChart ? "hide chart" : "show chart"}
          </button>
        </div>
      )}
      <br />
      {!isFetching ? (
        showEarthquakesChart && <Chart chartData={chartData} />
      ) : (
        <div className="loading-state">
          <h2>
            Loading a sweet little graph just for you...! It might take a few
            seconds.
          </h2>
        </div>
      )}

      <div className="earthquake-details-block">
        {showEarthquakesList &&
          earthquakesData.map(({ properties }) => {
            return (
              <div className="earthquake-details" key={properties.time}>
                <p>
                  An earthquake happened at {properties.place}
                  {properties.time
                    ? ` on ${new Date(properties.time).toDateString()}`
                    : ""}
                </p>
                <p>The magnitude level is {properties.mag}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Earthquakes;
