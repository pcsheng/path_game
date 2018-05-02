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