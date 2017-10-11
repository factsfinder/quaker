const initialState = {
  earthquakeCount: 0,
  earthquakeData: [],
  earthquakeChartData: [],
  fetching: false
}

const getEarthquakeReducer = (state = initialState, action) => {
  switch(action.type){
    case "GET_EARTHQUAKES_PAST_HOUR":
    case "GET_EARTHQUAKES_PAST_DAY":
    case "GET_EARTHQUAKES_PAST_WEEK":
    case "GET_EARTHQUAKES_PAST_MONTH":
      let chartDatatemp = [];
      action.info.features.map((earthquake, i) => {
        chartDatatemp.push({"time":earthquake.properties.time, "place": earthquake.properties.place, "magnitude": earthquake.properties.mag});
      });
      return Object.assign({}, state, {
        earthquakeCount: action.info.metadata.count,
        earthquakeData: action.info.features,
        earthquakeChartData: chartDatatemp,
        fetching: false
      });
    case "FETCHING_EARTHQUAKES":
      return Object.assign({}, state, action.info);
    default:
      return state;
  }
};

export default getEarthquakeReducer;
