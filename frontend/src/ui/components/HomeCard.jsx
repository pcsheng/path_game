import React from 'react';

const HomeCard = ({ children }) => (
  <div className="col s12 m6 offset-m3">
    <div className="card">
      <div className="card-image">
        <img src="./assets/home-card.jpg" />
      </div>
      <div className="card-content">
        <p>
          This is a web based version of the board game
          <a href="https://en.wikipedia.org/wiki/Tsuro" target="_blank"> Tsuro</a>.
          The current build is very minimalistic, lacking extras like animations which I hope to implement through SVGs.
          If you enjoy the game, I highly recommend going out and picking up a copy at your local game store.
        </p>
      </div>
      <div className="card-action">
        {children}
      </div>
    </div>
  </div>
);

export default HomeCard