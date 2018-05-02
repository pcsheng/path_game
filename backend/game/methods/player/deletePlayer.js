// This function deletes a player with playerId from the game
const deletePlayer = (state) => ({
    deletePlayer: (playerId) => {
        state.players = state.players.filter((player) => {
            return player !== playerId;
        });

        // gives the player's hand back to the deck
        state.deck.unshift(JSON.parse(JSON.stringify(state.playerHands[playerId])))
        // deletes the player from playerHands
        delete state.playerHands[playerId];

        // deletes the player from playerPositions
        delete state.playerPositions[playerId];

        break;
    }
});

module.exports = deletePlayer;