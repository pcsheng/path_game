const tsuro = require('../../game/tsuro');

// used to make a new game using the tsuro function
const newGame = (state) => ({
  newGame: () => {
      const gameId = state.gameCount + '-' + Date.now();
      state.games[gameId] = tsuro(gameId);
      state.gameCount ++;
  }
});

module.exports = newGame;