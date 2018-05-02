// This function moves activePlayer to the next player in the game
const nextPlayer = (state) => ({
    nextPlayer: () => {
        if (state.players.length > 1) {
            const curIndex = state.players.reduce((accu, player, index) => {
                (player === state.activePlayer) && (accu = index);
                return accu;
            }) + 1;

            while (curIndex >= state.players.length) {
                curIndex -= state.players.length;
            }

            state.activePlayer = state.players[curIndex];
        }
    }
});

module.exports = nextPlayer;