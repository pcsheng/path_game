// This function will be run after changeSide parses the tile move
// it adjusts the tile that is being targeted by the player
const changeTile = (state) => (
    (playerId) => {
        switch (state.playerPositions[playerId][2]) {
            case 0:
                state.playerPositions[playerId][0] -= 1;
                state.playerPositions[playerId][2] = 2;
                break;
            case 1:
                state.playerPositions[playerId][1] += 1;
                state.playerPositions[playerId][2] = 3;
                break;
            case 2:
                state.playerPositions[playerId][0] += 1;
                state.playerPositions[playerId][2] = 0;
                break;
            case 3:
                state.playerPositions[playerId][1] -= 1;
                state.playerPositions[playerId][2] = 1;
                break;
        }
    }
);

module.exports = changeTile;