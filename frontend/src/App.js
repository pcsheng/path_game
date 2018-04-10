import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Lobby from './components/Lobby';


class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="container center-align" >
          <Switch>
            <Route exact path="/" render={(props)=>{return !localStorage.getItem("jwt") ? <Home match={props.match} history={props.history} />
                                                                                        : <Redirect to="/games" />}} />
            <Route path="/games" render={(props)=>{return localStorage.getItem("jwt") ? <Lobby match={props.match} history={props.history} />
                                                                                      : <Redirect to="/" />}} />
          </Switch>
        </div>
      </div>
    );
  };
}

export default App;
