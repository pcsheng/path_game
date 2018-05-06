// methods
const getLobby = require("./methods/getLobby");
const newGame = require("./methods/newGame");

const manager = () => {
  const state = {
    gameCount: 0,
    games: {}
  }

  return Object.assign(state, getLobby(state), newGame(state));
}

module.exports = manager;