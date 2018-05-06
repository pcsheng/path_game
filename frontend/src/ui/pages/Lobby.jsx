import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LobbyList from '../components/LobbyList';
import NewGame from '../components/NewGame';

class Home extends Component{

  render(){

    const { lobby, newGame } = this.props;

    const listItems = lobby.map(({ id, players, status }) => {
      return <Link to={"/games/" + id} className="collection-item" key={id} >ID: {id}<br/>Players: {players}/8<br/>Status: {status}</Link>
    });

    return (
      <div className="container center-align" >
        <div className="row">
          <LobbyList>
            {listItems}
          </LobbyList>
          <NewGame newGame={newGame} />
        </div>
      </div>
    )
  }
}

export default Home;