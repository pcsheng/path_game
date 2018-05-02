// responsible for drawing a new tile from the deck
// socketId can be fed manually -- mostly for game setup purposes
const drawTile = (state) => ({
    drawTile: (socketId = state.activePlayer, position = null) => {      // the position argument is here to specify where to insert the drawn tile
        if (state.deck.length) {
            switch (position) {
                case null:
                    state.playerHands[socketId].push(state.deck.pop());
                    break;
                default:
                    state.playerHands[socketId][position] = state.deck.pop();
            }
        }
    }
});

module.exports = drawTile;