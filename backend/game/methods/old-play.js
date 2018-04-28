// handles when a socket plays a tile, dealing them a new hand
function newHand(whichTile, whichSocket, whichGame){
    // finds the index of the tile that was used
    let updatedHand = JSON.parse(JSON.stringify(currentGames.games[whichGame].players[whichSocket][1]));
    let replaceIndex = updatedHand.reduce((accu, curr, ind)=>{
        if (curr.tileId === whichTile){
            accu = ind;
        }
        return accu;
    }, "");
    // replaces the spent tile with a new tile drawn from the shuffled deck
    // if there are no tiles left in the deck, delete the spent tile
    if (currentGames.games[whichGame].deck.length){
        updatedHand[replaceIndex] = currentGames.games[whichGame].deck.pop();
    }else{
        updatedHand.splice(replaceIndex, 1);
    }

    // replaces the hand
    currentGames.games[whichGame].players[whichSocket][1] = updatedHand;
}

// finds the next player to make the active player
function nextPlayer(currIndex, gamePositions){
    // this variable makes sure that we are not infinite looping
    // if everyone but 1 player lost or disconnected
    let shouldThisRun = gamePositions.reduce((accu, curr)=>{
        if (!curr[2]){
            accu = true;
        }
        return accu;
    }, false);
    // if there is more than 1 player, and there's at least 1 other 
    if (gamePositions.length > 1 && shouldThisRun){
        // determines the next index value
        let nextIndex;
        if (currIndex === gamePositions.length - 1){
            nextIndex = 0;
        }else{
            nextIndex = currIndex + 1;
        }

        // if the player at that index is *NOT ACTIVE*
            // i.e. their [2] value is FALSE
        // return this index value to make active
        // i intend to change this [2] value upon loss or disconnect
        // so if this value is anything other than FALSE, move on to the next value
        if (gamePositions[nextIndex][2] === false){
            return nextIndex;
        }else{
            return nextPlayer(nextIndex, gamePositions);
        }
    }
    return currIndex;
}