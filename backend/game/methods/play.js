// responsible for playing a tile from a player's hand
const play = (state) => ({
    play: (socketId, tileId) => {
        const playIndex = state.playerHands[socketId].reduce((accu, tile, index) => {
            tile.tileId === tileId ? accu = index : null;
            return accu;
        }, null);
        const boardIndex = (state.playerPositions[socketId][0] * 6) + state.playerPositions[socketId][1];

        playIndex !== null ? state.board[boardIndex][2] = state.playerHands[socketId][playIndex] : null;

        // this function returns the index because
            // 1. this will be used to check if that player will draw a card
            // 2. this needs to be fed into the draw function
        return playIndex;
    }
});

module.exports = play;