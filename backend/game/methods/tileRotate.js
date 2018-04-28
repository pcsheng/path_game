// this modifies the tile based on positional rotations before the play function
    // this function is here because it removes the inefficiency of adjusting original tile
    // based on position each time the tile gets activated
const tileRotate = (state) => ({
    tileRotate: (playIndex, position) => {     // the emit will feed in the position and the index from function

        // just in case some weird crap happens -- will also be validating on front end
        while (position > 3) {
            position -= 4;
        }
        while (position < 0 ) {
            position += 4;
        }
        
        // sets the new position for display purposes
        state.playerHands[state.activePlayer][playIndex].position = position;
        state.playerHands[state.activePlayer][playIndex].values.unshift(...state.playerHands[state.activePlayer][playIndex].values.splice(4 - position))
    }
});

module.exports = tileRotate;


