import React from "react";

import '../css/NewGame.css';

const NewGame = ({ newGame }) => (
  <button class="btn-floating btn-large waves-effect waves-light red add-button" onClick={newGame} ><i class="material-icons">add</i></button>
);

export default NewGame;