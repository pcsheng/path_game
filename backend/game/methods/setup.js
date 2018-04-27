// this function is responsible to creating the game object
// **************** making this into a class for sure *******************
function setup(){
    let gameId = currentGames.gameCount + '-' + Date.now();
    // stringify parse ensures that this array is just a copy
    // and that an unedited version of the tiles exists still
    let deck = shuffle(JSON.parse(JSON.stringify(tiles)));
    currentGames.games[gameId] = {deck: deck, players: {}, public: {status: 'wait', board: JSON.parse(JSON.stringify(board)), curPos: []}};
    currentGames.gameCount++;
};

// deals the players their hands when the game starts
function dealHands(whichGame){
    let thisDeck = currentGames.games[whichGame].deck;
    // console.log(thisDeck);
    // console.log(currentGames.games[whichGame].players);
    for (let thisPlayer in currentGames.games[whichGame].players){
        currentGames.games[whichGame].players[thisPlayer][1].push(...thisDeck.splice(thisDeck.length-4, 3));
    }
    // console.log(thisDeck);
}

// randomly assigns sockets a starting position from the array
function startPos(whichGame){
    // copies an array of starter positions
    let thisStart = JSON.parse(JSON.stringify(start));
    for (let thisPlayer in currentGames.games[whichGame].players){
        // curPos is an array where each element looks like this:
            // [socketId, position, isActive?]
        currentGames.games[whichGame].public.curPos.push([thisPlayer, thisStart.splice(Math.random() * thisStart.length, 1)[0], false]);
    }
}

// handles sockets disconnecting from the room
function leaveGame(whichSocket, whichGame){
    // adds the player's current hand back into the deck
    let removedCards = currentGames.games[whichGame].players[whichSocket][1].splice(0, currentGames.games[whichGame].players[whichSocket][1].length);
    currentGames.games[whichGame].deck.unshift(...removedCards);
    let discIndex = currentGames.games[whichGame].public.curPos.reduce((accu, curr, ind)=>{
        if (curr[0] === whichSocket){
            accu = ind;
        }
        return accu;
    }, "");
    // throws the tile into the stratosphere
    // ****** need to reconsider how to delete the player object ******
    if (Number.isInteger(discIndex)){
        // if the disconnecting player is the active player
        if (currentGames.games[whichGame].public.curPos[discIndex][2] === true){
            let nextIndex = nextPlayer(discIndex, currentGames.games[whichGame].public.curPos);
            currentGames.games[whichGame].public.curPos[nextIndex][2] = true;
        }
        currentGames.games[whichGame].public.curPos[discIndex][1][0] = -1000;
        currentGames.games[whichGame].public.curPos[discIndex][1][1] = -1000;
        currentGames.games[whichGame].public.curPos[discIndex][2] = "disconnect";
    }
}