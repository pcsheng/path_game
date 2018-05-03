import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Home extends Component{

  render(){
    return (
      <div className="row">
        <HomeCard>
          <Link to="/games">Play</Link>
        </HomeCard>
        <LearnCard>
          <Link to="/rules">Learn</Link>
        </LearnCard>
      </div>
    )
  }
}

export default Home;