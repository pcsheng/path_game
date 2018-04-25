// this function adds the player info into the selected game
// depends on being fed that particular socket and the gameId
function addPlayer(whichSocket, whichGame){
    if (currentGames.games[whichGame]){
        // the players object will look like this
            // {playerId: [playerName, handArray]}
        currentGames.games[whichGame].players[whichSocket.id] = [whichSocket.playerName, []];
    }
};
