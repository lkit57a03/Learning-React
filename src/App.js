import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
  color: '#fff'
};
let fakeServerData = {
  user: {
    name: 'Harsh',
    playlists: [
      {
        name: 'My Favorites',
        songs: [

          { name: 'Lose it', duration: 1345 },
          { name: 'Lose it', duration: 1345 },
          { name: 'Lose it', duration: 1345 }
        ]
      },
      {
        name: 'Discover Weekly',
        songs: [

          { name: 'Lose it', duration: 1345 },
          { name: 'Lose it', duration: 1345 },
          { name: 'Lose it', duration: 1345 }
        ]
      },
      {
        name: 'Another PLaylist-The Best',
        songs: [

          { name: 'Lose it', duration: 1345 },
          { name: 'Lose it', duration: 1345 },
          { name: 'Lose it', duration: 1345 }
        ]
      },
      {
        name: 'Playlist',
        songs: [

          { name: 'Lose it', duration: 1345 },
          { name: 'Lose it', duration: 1345 },
          { name: 'Lose it', duration: 1345 }
        ]
      }
    ]
  }
};
class PlaylistConter extends Component {
  render() {
    return (
      <div style={{ ...defaultStyle, width: "40%", display: "inline-block" }}>
        <h2>{this.props.playlists.length} Playlist</h2>
      </div>
    );
  }
}
class HoursCounter extends Component {
  render() {
    let allsongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, [])
    let totalDuration = allsongs.reduce((sum, eachsongs) => {
      return sum + eachsongs.duration
    }, 0)
    return (
      <div style={{ ...defaultStyle, width: "40%", display: "inline-block" }}>
        <h2>{Math.round(totalDuration / 60)} Hours</h2>
      </div>
    );
  }
}
class Filter extends Component {
  render() {
    return (
      <div style={{ defaultStyle }}>
        <img />
        <input type="text" onKeyUp={event => this.props.onTextChange(event.target.value)}/>
      </div>
    );
  }
}
class Playlist extends Component {
  render() {
    let playlist = this.props.playlist
    return (
      <div style={{ ...defaultStyle, display: "inline-block", width: '25%' }}>
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
    this.state = {
      serverData: {},
      filterString: ''
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ serverData: fakeServerData })
    }, 1000);
  }
  render() {

    return (
      <div className="App">
        {this.state.serverData.user ?
          <div> <h1 style={{ ...defaultStyle, 'font-size': ' 54px' }}>
            {this.state.serverData.user
              &&
              this.state.serverData.user.name}'s Playlist
        </h1>}

        <PlaylistConter playlists={this.state.serverData.user
              && this.state.serverData.user.playlists} />
            <HoursCounter playlists={this.state.serverData.user
              && this.state.serverData.user.playlists} />
            <Filter onTextChange={text =>this.setState({filterString: text})}/>
            {
              this.state.serverData.user.playlists.filter(
                playlist => playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase())
              ).map(playlist => <Playlist playlist={playlist} />)
            }
          </div> : <h1 style={defaultStyle}>Loading...</h1>
        }
      </div>
    );
  }
}

export default App;
