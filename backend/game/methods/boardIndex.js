// This function determines the index for the board block where the tile is getting placed
const boardIndex = (state) => ({
    boardIndex: (playerId = state.activePlayer) => {
        return (state.playerPositions[playerId][0] * 6 + state.playerPositions[playerId][1]);
    }
});

module.exports = boardIndex;