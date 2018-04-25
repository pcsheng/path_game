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

// this function is going to take a current position as an input
    // in the format of the standard curPos [x, y, side, T/F]
// and modify that value recursively with theTile values
function changeTile(playerPos, theTile, whichGame){
    let ogSide = playerPos[2],
        ogTf = playerPos[3],
        changes = theTile.values[ogSide][ogTf*1];

    // updates the "side" that the player is on
    playerPos[2] += changes[0];
    while (playerPos[2] > 3){
        playerPos[2] -= 4;
    }
    while (playerPos[2] < 0){
        playerPos[2] += 4;
    }

    // flips the [3] value according to the tile feed
    if (changes[1]){
        playerPos[3] = !playerPos[3];
    }

    // takes the new position and changes the active tile
    if (playerPos[2] === 0){
        playerPos[0] -= 1;
        playerPos[2] = 2;
    }
    else if (playerPos[2] === 1){
        playerPos[1] += 1;
        playerPos[2] = 3;
    }
    else if (playerPos[2] === 2){
        playerPos[0] += 1;
        playerPos[2] = 0;
    }
    else if (playerPos[2] === 3){
        playerPos[1] -= 1;
        playerPos[2] = 1;
    }

    // recursive call if a tile exists at the spot that we want to move to
    let boardIndex = (playerPos[0] - 1) * 6 + (playerPos[1] - 1);
    // outer if statement to avoid recursive call crashing server
    if (boardIndex >= 0 && boardIndex < 36){
        let newTile = currentGames.games[whichGame].public.board[boardIndex][2];
        if (Object.keys(newTile).length){
            return changeTile(playerPos, newTile, whichGame);
        }
    }
    return playerPos;
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