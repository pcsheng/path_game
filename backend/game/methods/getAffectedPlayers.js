const getBoardIndex = require("./methods/boardIndex");

// this function is used to determine which players need to be moved when a tile is played
// it takes the return value of the boardIndex function and looks at which players should be moved
const getAffectedPlayers = (state) => ({
    getAffectedPlayers: (boardIndex) => {
        let affectedPlayers = [];
        for (playerId in state.playerPositions) {
            if (getBoardIndex(state)(playerId) === boardIndex) {
                affectedPlayers.push(playerId)
            }
        }
        return affectedPlayers;
    }
});

module.exports = getAffectedPlayers;
