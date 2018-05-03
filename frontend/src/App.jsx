import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Home from './ui/pages/Home';
import Lobby from './ui/pages/Lobby';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="container center-align" >
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/games" component={Lobby} />
          </Switch>
        </div>
      </div>
    );
  };
}

export default App;
