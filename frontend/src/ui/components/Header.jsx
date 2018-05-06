import React from "react";

import '../css/Header.css';

const Header = () => (
  <header className="flex-header" >
    <span style={{width: 25 + "%"}} >
                <img src={"/assets/players/P1.svg"} style={{maxWidth: 30 + "%"}} />
                <h4 >You</h4>
            </span>
            <span style={{width: 25 + "%"}} >
                <img src={"/assets/players/P1.svg"} style={{maxWidth: 30 + "%"}} />
                <h4 >Active Player</h4>
            </span>
  </header>
);

export default Header;