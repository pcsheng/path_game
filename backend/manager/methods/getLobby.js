// this is going to be used to collect lobby data to be sent to frontend
const getLobby = (state) => ({
  getLobby: () => {
    const lobbyData = [];
    for (game in state.games) {
      lobbyData.push({id: state.games[game].gameId, players: state.games[game].players.length, status: state.games[game].status})
    }
    return lobbyData;
  }
});

module.exports = getLobby;