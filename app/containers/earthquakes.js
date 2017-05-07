import React from 'react';
import { connect } from 'react-redux';
import store from '../store.js';
import {earthquakes_by_hour, earthquakes_by_day, earthquakes_by_week, earthquakes_by_month } from '../actions/getEarthquakeAction.js'
import reducers from '../reducers/reducers.js';
import BtnList from '../components/btnList.js';
import EarthquakeDetails from '../components/earthquakeDetails.js';
import Chart from '../components/chart.js';
import ToggleButton from '../components/toggleBtn.js';
import ChartButton from '../components/chartBtn.js';

class Earthquakes extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      "show_earthquake_list": false,
      "show_earthquake_chart": false,
      "listBtnName": "Hide List",
      "chartBtnName": "Hide Chart"
    }
    this.handleToggleList = this.handleToggleList.bind(this);
    this.handleToggleChart = this.handleToggleChart.bind(this);
    this.handleListBtnName = this.handleListBtnName.bind(this);
    this.handleChartBtnName = this.handleChartBtnName.bind(this);
  }

  //Change/Toggle List button name
  handleListBtnName(){
    if(this.props.count > 0 && this.state.show_earthquake_list){
      this.setState({
        "listBtnName" : "Hide List"
      });
    }
    else if(!this.state.show_earthquake_list) {
      this.setState({
        "listBtnName" : "Show List"
      });
    }
  }

  // Show or Hide the Earthquakes list
  handleToggleList(){
    this.setState({
      "show_earthquake_list": !this.state.show_earthquake_list
    });
    this.handleListBtnName();
  }

  //Change/Toggle Chart button name
  handleChartBtnName(){
    if(this.props.count > 0 && this.state.show_earthquake_chart){
      this.setState({
        "chartBtnName" : "Hide Chart"
      });
    }
    else if(!this.state.show_earthquake_chart) {
      this.setState({
        "chartBtnName" : "Show Chart"
      });
    }
  }

  //show or hide the Earthquakes Chart
  handleToggleChart(){
    this.setState({
      "show_earthquake_chart": !this.state.show_earthquake_chart
    });
    this.handleChartBtnName();
  }

  render(){
   return (
    <div className="main">

      <BtnList
        Earthquakes_PastHour={this.props.getEarthquakes_PastHour}
        Earthquakes_PastWeek={this.props.getEarthquakes_PastWeek}
        Earthquakes_PastDay={this.props.getEarthquakes_PastDay}
        Earthquakes_PastMonth={this.props.getEarthquakes_PastMonth}
       />

         {this.props.count>0 ?
            <div className="toggle-list-chart-buttons">
              <ToggleButton toggleList={this.handleToggleList} listBtnName={this.state.listBtnName} />
              <ChartButton  toggleChart={this.handleToggleChart} chartBtnName={this.state.chartBtnName}/>
            </div>
           : null
         }

      //Chart
      {!this.state.show_earthquake_chart && <Chart ChartData={this.props.chartData}/> }

      <div className="earthquake-details-block">
        {!this.state.show_earthquake_list ?
          this.props.earthquakeData.map((earthquake, i) => {
            return (
              <EarthquakeDetails key={i} place={earthquake.properties.place} time={earthquake.properties.time} mag={earthquake.properties.mag} />
            );
          }) : null}
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
    chartData: state.getEarthquakeReducer.earthquakeChartData,
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
