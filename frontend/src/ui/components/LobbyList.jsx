import React from 'react';

const LobbyList = ({ children }) => (
  <div className="col s12 m8 offset-m2">
    <div className="collection">
      {children}
    </div>
  </div>
);

export default LobbyList;