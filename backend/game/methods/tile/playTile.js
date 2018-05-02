// responsible for playing a tile from a player's hand
const playTile = (state) => ({
    playTile: (playIndex, boardIndex) => {
        // adds a copy of the tile to the board at the index position
        state.board[boardIndex][2] = JSON.parse(JSON.stringify(state.playerHands[socketId][playIndex]));
    }
});

module.exports = playTile;