// this function is used to process tile data and translate it into a move
const tileActivate = (state) => ({
    tileActivate: (socketId, position = null) => {
        if (state.deck.length) {
            switch (position) {
                case null:
                    state.playerHands[socketId].push(state.deck.pop());
                    break;
                default:
                    state.playerHands[socketId][position] = state.deck.pop();
            }
        }
    }
});

module.exports = tileActivate;



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