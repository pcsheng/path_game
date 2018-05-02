// this function takes the scoketId and adds that socket as a player
const addPlayer = (state) => ({
    addPlayer: (socketId) => {
        state.players.push(socketId);
        state.playerHands[socketId] = [];
        state.playerPositions[socketId] = [];
    }
});

module.exports = addPlayer;