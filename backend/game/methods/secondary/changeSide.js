// This function is to be used by tileActivate, it manages the first change for the tiles
    // i.e. the boardIndex will be exactly the same, but the other values will be changed
    // the second function will take it from there
const changeSide = (state) => (
    (playerId, tileValue) => {
        const playerSide = state.playerPositions[playerId][3],
              sideTf = state.playerPositions[playerId][4],
              applyValues = tileValue[playerSide][+sideTf];

        playerSide += applyValues[0];
        while (playerSide > 3) {
            playerSide -= 4;
        }
        state.playerPositions[playerId][3] = playerSide;

        // uses the && operator in control flow so that the second expression evaluates only when condition is met
            // at first glance this condition seems backwards, but the reason is that
            // once tileActivate runs changeTile, the T/F value gets flipped AGAIN
            // so in the grand scale of things, a change here means no change at all and vice versa
        applyValues[1] && (state.playerPositions[playerId][4] = !sideTf);
    }
);

module.exports = changeSide;