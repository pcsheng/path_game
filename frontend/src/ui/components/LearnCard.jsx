import React from 'react';

const LearnCard = ({ children }) => (
  <div className="col s12 m6 offset-m3">
    <div className="card">
      <div className="card-content">
        <p>
          First time hearing about the game? Click the button below.
        </p>
      </div>
      <div className="card-action">
        {children}
      </div>
    </div>
  </div>
);

export default LearnCard;