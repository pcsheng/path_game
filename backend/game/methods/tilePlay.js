// responsible for playing a tile from a player's hand
const tilePlay = (state) => ({
    tilePlay: (playIndex) => {
        // this is the index on the board array that needs the tile added to
        const boardIndex = (state.playerPositions[state.activePlayer][0] * 6) + state.playerPositions[state.activePlayer][1];

        // adds a copy of the tile to the board at the index position
        state.board[boardIndex][2] = JSON.parse(JSON.stringify(state.playerHands[socketId][playIndex]));
    }
});

module.exports = tilePlay;