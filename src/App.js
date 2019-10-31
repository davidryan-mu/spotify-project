import React, {Component} from 'react';
import './App.css';

let defaultStyle = {
  color: '#fff'
};

class Aggregate extends Component {
  render() {
    return(
      <div style={{width: "40%", display: "inline-block"}}>
        <h2 style={defaultStyle}>Text</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return(
      <div>
        <img />
        <input type="text" placeholder="Filter"/>
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    return(
      <div style={{...defaultStyle, width: "25%", display: "inline-block"}}>
        <img />
        <h3>Playlist Name</h3>
        <ul>
          <li>Song 1</li>
          <li>Song 2</li>
          <li>Song 3</li>
        </ul>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return(
      <div className="App">
        <h1 style={defaultStyle}>Title</h1>

        <Aggregate />
        <Aggregate />

        <Filter />

        <Playlist />
        <Playlist />
        <Playlist />
        <Playlist />
      </div>
    );
  }
}

export default App;
