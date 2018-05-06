import React, { Component } from 'react';

import Board from "../components/Board";
import Header from "../components/Header";

import '../css/Game.css';

class Game extends Component{

  render(){
    return (
      <div>
        <Header />
        <div className="container center-align" >
          <div className="row board-contain">
            <Board />
          </div>
        </div>
      </div>
    )
  }
}

export default Game;