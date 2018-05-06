import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LobbyList from '../components/LobbyList';

class Home extends Component{

  render(){

    // const { lobbyData } = this.props;
    const lobbyData = [{id:"123", players:2, status:"waiting"}, {id:"321", players:3, status:"playing"}];

    // ***** need to declare lobby data before this *****
    const listItems = lobbyData.map(({ id, players, status }) => {
      return <Link to={"/games/" + id} className="collection-item" key={id} >ID: {id}<br/>Players: {players}/8<br/>Status: {status}</Link>
    });

    return (
      <div className="container center-align" >
        <div className="row">
          <LobbyList>
            {listItems}
          </LobbyList>
        </div>
      </div>
    )
  }
}

export default Home;