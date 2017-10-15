import React from 'react';
import { connect } from 'react-redux';
import store from '../store.js';
import {earthquakes} from '../actions/getEarthquakeAction.js'
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
    this.props.getEarthquakes("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson");
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
        Earthquakes_PastHour={()=>this.props.getEarthquakes("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson")}
        Earthquakes_PastWeek={()=>this.props.getEarthquakes("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")}
        Earthquakes_PastDay={()=>this.props.getEarthquakes("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson")}
        Earthquakes_PastMonth={()=>this.props.getEarthquakes("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson")}
       />

      {this.state.count > 0 &&
        <div className="toggle-list-chart-buttons">
          <ToggleList toggleList={this.handleToggleList} listBtnName={this.state.listBtnName} />
          <ToggleChart  toggleChart={this.handleToggleChart} chartBtnName={this.state.chartBtnName}/>
        </div>
      }
      <br/>
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
    getEarthquakes: (earthquakeUrl) => { store.dispatch(earthquakes(earthquakeUrl)) }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Earthquakes);
