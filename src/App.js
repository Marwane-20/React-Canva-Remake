import React, { Component } from 'react';

class App extends Component {
  state = {
    tab: [
      { id: 1, value: 10 },
      { id: 2, value: 11 },
      { id: 3, value: 12 }
    ],
  };  
  
  render(){
  return (
    <React.Fragment>
      <div>   
      {this.state.tab.map((val) => (
      <h1 key={this.state.tab.id}>{val.value}</h1>))}
       
      </div>      
    </React.Fragment>
  );
}}

export default App;
