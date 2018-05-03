import React from 'react';

const LearnCard = ({ children }) => (
  <div class="col s12 m6 offset-m3">
    <div class="card">
      <div class="card-content">
        <p>
          First time hearing about the game? Click the button below.
        </p>
      </div>
      <div class="card-action">
        {children}
      </div>
    </div>
  </div>
);

export default LearnCard