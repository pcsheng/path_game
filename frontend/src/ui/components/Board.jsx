import React from 'react';

import '../css/Board.css';

const Board = ({ children }) => (
  <div className="col s12 m8 offset-m2 center-align p-0" >
    <div className="fill-width" style={{width: 100 + "%", backgroundImage: "url(/assets/board2.svg)"}}>
      <div className="flexCont" >
        {children}
      </div>  
      <div className="gridLines" >
        <img src="/assets/grid.svg" style={{width: 100 + "%"}} alt="grid lines" />
      </div>
    </div>
  </div>
)

export default Board;