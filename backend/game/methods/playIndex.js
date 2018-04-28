// This function determines the index for the tile that gets played
    // also somewhat acts as middleware to check if they have the tile
const playIndex = (state) => ({
    playIndex: (tileId) => {
        // this is the index for the tile on the hand to play
        return state.playerHands[state.activePlayer].reduce((accu, tile, index) => {
            tile.tileId === tileId ? accu = index : null;
            return accu;
        }, null);
    }
});

module.exports = playIndex;