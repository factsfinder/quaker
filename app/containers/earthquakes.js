import React from 'react';
import { connect } from 'react-redux';
import store from '../store.js';
import {fetching_earthquakes, earthquakes_by_hour, earthquakes_by_day, earthquakes_by_week, earthquakes_by_month } from '../actions/getEarthquakeAction.js'
import reducers from '../reducers/reducers.js';
import BtnList from '../components/btnList.js';
import EarthquakeDetails from '../components/earthquakeDetails.js';
import Chart from '../components/chart.js';
import ToggleList from '../components/toggleBtn.js';
import ToggleChart from '../components/chartBtn.js';

class Earthquakes extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      show_earthquake_list: false,
      show_earthquake_chart: false,
      listBtnName: "Hide List",
      chartBtnName: "Hide Chart",
      count: this.props.count,
      fetching: this.props.fetching
    }
    this.handleToggleList = this.handleToggleList.bind(this);
    this.handleToggleChart = this.handleToggleChart.bind(this);
    this.handleListBtnName = this.handleListBtnName.bind(this);
    this.handleChartBtnName = this.handleChartBtnName.bind(this);    
  }
  
  componentDidMount(){
    this.props.getEarthquakes_PastHour();
  }

  componentWillReceiveProps(nextProps){
    if(this.state.count !== nextProps.count){
      this.setState({ count: nextProps.count });
    } 
    if(this.props.fetching !== nextProps.fetching){
      this.setState({ fetching: nextProps.fetching });
    }
  }

  handleListBtnName(){
    if(this.props.count > 0 && this.state.show_earthquake_list){
      this.setState({ listBtnName : "Hide List" });
    }
    else if(!this.state.show_earthquake_list) {
      this.setState({ listBtnName : "Show List" });
    }
  }

  handleToggleList(){
    this.setState((prevState) => ({ show_earthquake_list: !prevState.show_earthquake_list }));
    this.handleListBtnName();
  }

  handleChartBtnName(){
    if(this.props.count > 0 && this.state.show_earthquake_chart){
      this.setState({ chartBtnName : "Hide Chart" });
    }
    else if(!this.state.show_earthquake_chart) {
      this.setState({ chartBtnName : "Show Chart" });
    }
  }

  handleToggleChart(){
    this.setState((prevState) => ({ show_earthquake_chart: !prevState.show_earthquake_chart }));
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

      {this.state.count > 0 &&
        <div className="toggle-list-chart-buttons">
          <ToggleList toggleList={this.handleToggleList} listBtnName={this.state.listBtnName} />
          <ToggleChart  toggleChart={this.handleToggleChart} chartBtnName={this.state.chartBtnName}/>
        </div>
      }

      //Chart
      {!this.state.fetching ?
        !this.state.show_earthquake_chart && <Chart ChartData={this.props.chartData}/>  
      :
        <div className="loading-state">
          <h2>Loading a sweet little graph just for you...!<br/>It might take a few seconds, but you know I &#10084; you</h2>
        </div>
      }

      <div className="earthquake-details-block">
        {!this.state.show_earthquake_list &&
          this.props.earthquakeData.map((earthquake, i) => {
            return (
              <EarthquakeDetails key={i} place={earthquake.properties.place} time={earthquake.properties.time} mag={earthquake.properties.mag} />
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
    chartData: state.getEarthquakeReducer.earthquakeChartData,
    earthquakeData: state.getEarthquakeReducer.earthquakeData,
    fetching: state.getEarthquakeReducer.fetching
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEarthquakes_PastHour(){
      fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson")
      .then((response) => {
        store.dispatch(fetching_earthquakes());
        return response.json()
      })
      .then((responseJson) => {store.dispatch(earthquakes_by_hour(responseJson))})
      .catch((err) => {console.log("Ann Error Occured" + err);});
    },

    getEarthquakes_PastDay(){
      fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson")
      .then((response) => {
        store.dispatch(fetching_earthquakes());
        return response.json()
      })
      .then((responseJson) => {store.dispatch(earthquakes_by_day(responseJson))})
      .catch((err) => {console.log("Ann Error Occured" + err)});
    },

    getEarthquakes_PastWeek(){
      fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")
      .then((response) => {
        store.dispatch(fetching_earthquakes());
        return response.json()
      })
      .then((responseJson) => {store.dispatch(earthquakes_by_week(responseJson))})
      .catch((err) => {console.log("Ann Error Occured" + err)});
    },

    getEarthquakes_PastMonth(){
      fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson")
      .then((response) => {
        store.dispatch(fetching_earthquakes());
        return response.json()
      })
      .then((responseJson) => {store.dispatch(earthquakes_by_month(responseJson))})
      .catch((err) => {console.log("Ann Error Occured" + err)});
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Earthquakes);
