export function earthquakes_by_hour(data) {
  return {
    type: "GET_EARTHQUAKES_PAST_HOUR",
    info: data
  };
}

export function earthquakes_by_day(data) {
  return {
    type: "GET_EARTHQUAKES_PAST_DAY",
    info: data
  };
}

export function earthquakes_by_week(data) {
  return {
    type: "GET_EARTHQUAKES_PAST_WEEK",
    info: data
  };
}

export function earthquakes_by_month(data) {
  return {
    type: "GET_EARTHQUAKES_PAST_MONTH",
    info: data
  };
}
