import React from 'react';

import '../css/Board.css';

const Board = ({ children }) => (
  <div className="col s12 m8 offset-m2 center-align p-0" >
    <div className="fill-width board-back">
      <div className="flexCont" >
        {children}
      </div>  
      <div className="gridLines" >
        <img src="/assets/grid.svg" className="fill-width" alt="grid lines" />
      </div>
    </div>
  </div>
)

export default Board;