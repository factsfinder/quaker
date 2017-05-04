const initialState = {
  earthquakeCount: 0,
  earthquakeData: [],
}
const getEarthquakeReducer = (state=initialState, action) => {
  switch(action.type){
    case "GET_EARTHQUAKES_PAST_HOUR":
    case "GET_EARTHQUAKES_PAST_DAY":
    case "GET_EARTHQUAKES_PAST_WEEK":
    case "GET_EARTHQUAKES_PAST_MONTH":
      return Object.assign({}, state, {
        earthquakeCount: action.info.metadata.count,
        earthquakeData: action.info.features,
      });
    default:
      return state;
  }
};

export default getEarthquakeReducer;
