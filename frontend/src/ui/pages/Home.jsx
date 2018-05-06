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
            <Link to="/games" style={{margin: 0}} >Play</Link> {/* could not use className here */}
          </HomeCard>
          <LearnCard>
            <Link to="/rules" style={{margin: 0}} >Learn</Link> {/* could not use className here */}
          </LearnCard>
        </div>
      </div>
    )
  }
}

export default Home;