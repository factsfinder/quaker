import React from 'react';
import { connect } from 'react-redux';
import store from '../store.js';
import {earthquakes_by_hour, earthquakes_by_day, earthquakes_by_week, earthquakes_by_month } from '../actions/getEarthquakeAction.js'
import reducers from '../reducers/reducers.js';
import BtnList from '../components/btnList.js';
import EarthquakeDetails from '../components/earthquakeDetails.js';
import Chart from '../components/chart.js';

const ToggleButton = (props) => {
  return (<button className="toggle-btn" onClick={props.CloseList}>Toggle List</button>);
}

class Earthquakes extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      "show_earthquake_list": true
    }
    this.handleCloseList = this.handleCloseList.bind(this);
  }

  handleCloseList(){
    this.setState({
      "show_earthquake_list": !this.state.show_earthquake_list
    })
  }

  render(){
   return (
    <div>
      <BtnList
        Earthquakes_PastHour={this.props.getEarthquakes_PastHour}
        Earthquakes_PastWeek={this.props.getEarthquakes_PastWeek}
        Earthquakes_PastDay={this.props.getEarthquakes_PastDay}
        Earthquakes_PastMonth={this.props.getEarthquakes_PastMonth}
       />

     <div className="earthquake-details-block">
       <ToggleButton CloseList={this.handleCloseList}/>
        {this.props.earthquakeData.map((earthquake, i) => {
          return (
              <EarthquakeDetails
                key={i} place={earthquake.properties.place} time={earthquake.properties.time} mag={earthquake.properties.mag}
              />
            );
          })
        }
      </div>
     </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    count: state.getEarthquakeReducer.earthquakeCount,
    place: state.getEarthquakeReducer.place,
    time: state.getEarthquakeReducer.time,
    magnitude: state.getEarthquakeReducer.magnitude,
    chartData: state.getEarthquakeReducer.chartData,
    earthquakeData: state.getEarthquakeReducer.earthquakeData,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEarthquakes_PastHour(){
      fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson")
      .then((response) => {return response.json()})
      .then((responseJson) => {store.dispatch(earthquakes_by_hour(responseJson))})
      .catch((err) => {console.log("Ann Error Occured" + err);});
    },

    getEarthquakes_PastDay(){
      fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson")
      .then((response) => {return response.json()})
      .then((responseJson) => {store.dispatch(earthquakes_by_day(responseJson))})
      .catch((err) => {console.log("Ann Error Occured" + err)});
    },

    getEarthquakes_PastWeek(){
      fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")
      .then((response) => {return response.json()})
      .then((responseJson) => {store.dispatch(earthquakes_by_week(responseJson))})
      .catch((err) => {console.log("Ann Error Occured" + err)});
    },

    getEarthquakes_PastMonth(){
      fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson")
      .then((response) => {return response.json()})
      .then((responseJson) => {store.dispatch(earthquakes_by_month(responseJson))})
      .catch((err) => {console.log("Ann Error Occured" + err)});
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Earthquakes);
