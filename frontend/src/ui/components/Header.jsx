import React from "react";

import '../css/Header.css';

const Header = () => (
  <header className="flex-header" >
    <span className="center-align" >
      <img src={"/assets/players/P1.svg"} className="header-content" />
      <p className="center-align" >You</p>
    </span>
    <span className="center-align" >
      <img src={"/assets/players/P1.svg"} className="header-content" />
      <p className="center-align" >Active Player</p>
    </span>
  </header>
);

export default Header;