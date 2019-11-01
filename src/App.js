import React, {Component} from 'react';
import './App.css';

let defaultStyle = {
  color: '#fff'
};

let fakeServerData = {
  user: {
    name: 'David',
    playlists: [
      {
        name: 'Playlist 1',
        songs: [
          {name: 'Song 1', duration: 1345},
          {name: 'Song 2', duration: 1345},
          {name: 'Song 3', duration: 1345}
        ]
      },
      {
        name: 'Playlist 2',
        songs: [
          {name: 'Song 1', duration: 1345},
          {name: 'Song 2', duration: 1345},
          {name: 'Song 3', duration: 1345}
        ]      },
      {
        name: 'Playlist 3',
        songs: [
          {name: 'Song 1', duration: 1345},
          {name: 'Song 2', duration: 1345},
          {name: 'Song 3', duration: 1345}
        ]      },
      {
        name: 'Playlist 4',
        songs: [
          {name: 'Song 1', duration: 1345},
          {name: 'Song 2', duration: 1345},
          {name: 'Song 3', duration: 1345}
        ]      }
    ]
  }
};

class PlaylistsCounter extends Component {
  render() {
    return(
      <div style={{width: "40%", display: "inline-block"}}>
        <h2 style={defaultStyle}>{this.props.playlists.length} playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, [])

    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0)

    return(
      <div style={{width: "40%", display: "inline-block"}}>
        <h2 style={defaultStyle}>{Math.round(totalDuration / 3600)} hours</h2>
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
    let playlist = this.props.playlist;
    return(
      <div style={{...defaultStyle, width: "25%", display: "inline-block"}}>
        <img />
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song => 
            <li>{song.name}</li>
            )}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {serverData: {}}
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 1000);
  }

  render() {
    return(
      <div className="App">
        {this.state.serverData.user ?
        <div>
          <h1 style={defaultStyle}>
            {this.state.serverData.user && 
            this.state.serverData.user.name}'s Playlists
          </h1>

          <PlaylistsCounter playlists={this.state.serverData.user && 
                                this.state.serverData.user.playlists}/>
          <HoursCounter playlists={this.state.serverData.user && 
                                this.state.serverData.user.playlists}/>

          <Filter />

          {this.state.serverData.user.playlists.map(playlist => 
            <Playlist playlist={playlist} />
          )}

          </div> : <h1 style={defaultStyle}>Loading...</h1>
        }
      </div>
    );
  }
}

export default App;
