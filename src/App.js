import React, {Component} from 'react';
import './App.css';
import queryString from 'query-string';

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
        <input type="text" placeholder="Filter" onChange={event => this.props.onTextChange(event.target.value)}/>
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist;
    return(
      <div style={{...defaultStyle, width: "25%", display: "inline-block"}}>
        <img src={playlist.imageUrl} style={{width: '160px'}}/>
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
    this.state = {
      serverData: {},
      filterString: ''
    }
  }

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      user: {
        name: data.display_name
      }
    }))

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
          playlists: data.items.map(item => ({
            name: item.name,
            imageUrl: item.images[0].url,
            songs: []
          }))
        }))
  }

  render() {
    let playlistsToRender = 
      this.state.user &&
      this.state.playlists
        ? this.state.playlists.filter(playlist =>
          playlist.name.toLowerCase().includes(
            this.state.filterString.toLowerCase()))
        : []

    return(
      <div className="App">
        {this.state.user ?
        <div>
          <h1 style={{...defaultStyle, 'font-size': '54px'}}>
            {this.state.user.name}'s Playlists
          </h1>
            
          <PlaylistsCounter playlists={playlistsToRender}/>
          <HoursCounter playlists={playlistsToRender}/>

          <Filter onTextChange={text => this.setState({filterString: text})} />

          {playlistsToRender.map(playlist => 
            <Playlist playlist={playlist} />
          )}

          </div> : <button onClick={() => window.location='http://localhost:8888/login'}
          style={{padding: '20px', 'font-size': '50px', 'margin-top': '20px'}}>Sign in with Spotify</button>
        }
      </div>
    );
  }
}

export default App;
