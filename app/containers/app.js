import React from 'react';
import Earthquakes from './earthquakes.js';

class App extends React.Component{
    render(){
      return (
        <div>
          <h1>Quaker -- All hail the Earthquakes</h1>
          <Earthquakes />
        </div>
      );
    }
}

export default App;
