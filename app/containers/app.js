import React from 'react';
import Earthquakes from './earthquakes.js';

class App extends React.Component{
    render(){
      return (
        <div>
          <h1>Quaker -- All hail the Earthquakes</h1>
          <p style={{'textAlign':'center'}}>Click on either one of the buttons to get information about
            earthquakes happening around the world in that duration</p>
          <Earthquakes />
        </div>
      );
    }
}

export default App;
