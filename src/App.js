import React, { Component } from 'react';
import GridContainer from './containers/GridContainer';
import FooterContainer from './containers/FooterContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       <GridContainer />
       <FooterContainer/>
      </div>
    );
  }
}

export default App;
