const start = JSON.parse(JSON.stringify(require('../../constants/start')));

// this function gives each player in the game their starting positions
const startingPositions = (state) => ({
    startingPositions: () => {
        let randomIndex;
        for (player in state.playerHands) {
            randomIndex = Math.floor(Math.random() * start.length);
            state.playerHands[player].push(start.splice(randomIndex, 1));
        }
    }
});

module.exports = startingPositions;