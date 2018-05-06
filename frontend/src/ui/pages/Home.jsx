import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import HomeCard from '../components/HomeCard';
import LearnCard from '../components/LearnCard';

class Home extends Component{

  render(){
    return (
      <div className="container center-align" >
        <div className="row">
          <HomeCard>
            <Link to="/games">Play</Link>
          </HomeCard>
          <LearnCard>
            <Link to="/rules">Learn</Link>
          </LearnCard>
        </div>
      </div>
    )
  }
}

export default Home;