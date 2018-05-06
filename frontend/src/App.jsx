import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './ui/pages/Home';
import Lobby from './ui/pages/Lobby';
import Game from './ui/pages/Game';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/games" component={Lobby} />
          <Route path="/games/:gameId" component={Game} />
        </Switch>
      </div>
    );
  };
}

export default App;
