export function fetching_earthquakes() {
  return { type: "FETCHING_EARTHQUAKES", info: {fetching: true} }
}

export function fetching_success(data) {
  return (dispatch) => {
    dispatch({type: "FETCHING_SUCCESS", info: {fetching: false}});
    dispatch(get_earthquakes(data));
  }
}

export function get_earthquakes(data) {
  return { type: 'GET_EARTHQUAKES', info: data }
}

export function earthquakes(earthquakeUrl) {
  return (dispatch) => {
    dispatch(fetching_earthquakes());
    return fetch(earthquakeUrl)
    .then((response) => {return response.json()})
    .then((responseJson) => { dispatch(fetching_success(responseJson))})
    .catch((err) => {console.log("An Error Occured" + err)});
  }
}
