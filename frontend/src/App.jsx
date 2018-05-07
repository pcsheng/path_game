import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import io from 'socket.io-client';

import Home from './ui/pages/Home';
import Lobby from './ui/pages/Lobby';
import Game from './ui/pages/Game';

class App extends Component {

  constructor() {
    super();
    this.state = {
      lobby: [],
      game: {},
      hand: [],
      playerNumber: ""
    }
    this.socket = io('http://localhost:8080/');
  }

  componentDidMount() {
    this.socket.on('lobbyData', (data)=>{
      this.setState({
        lobby: data
      });
    });
    this.socket.on('thisGame', (data)=>{
      this.setState({
        game: data
      });
    });
    this.socket.on('giveHand', (data)=>{
      if (this.state.hand.length){
        for (let i = 0 ; i < data.length ; i++){
          if (data[i].tileId === this.state.hand[i].tileId){
            data[i].position = this.state.hand[i].position;
          }
        }
      }

      this.setState({
        hand: data
      });
    });
    this.socket.on('setPlayer', (data)=>{
      this.setState({
        playerNumber: data
      });
    });
  }

  // joins the lobby
  joinLobby = () => {
    this.socket.emit('joinLobby');
  }

  // leaves the lobby
  leaveLobby = () => {
    this.socket.emit('leaveLobby');
  }

  // makes a game
  newGame = () => {
    this.socket.emit('makeGame');
  }

  // joins a game
  joinGame = (gameId) => {
    this.socket.emit('joinGame', gameId);
  }

  // leaves a game
  leaveGame = (gameId) => {
    this.socket.emit('leaveGame', gameId);
  }

  render() {

    const { lobby, game, hand, playerNumber } = this.state;

    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/games" render={(props) => <Lobby {...props} 
                                                               lobby={lobby}
                                                               joinLobby={this.joinLobby}
                                                               leaveLobby={this.leaveLobby}
                                                               newGame={this.newGame}
                                                               joinGame={this.joinGame}
                                                               leaveGame={this.leaveGame} />} />
          <Route path="/games/:gameId" component={Game} />
        </Switch>
      </div>
    );
  };
}

export default App;
