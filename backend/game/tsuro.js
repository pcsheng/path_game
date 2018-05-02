// game constants
const tiles = require("./constants/tiles");
const board = require("./constants/board");

// game methods
const shuffle = require("./methods/shuffle");

// the game object will be an instance of the class game
// which should make it easier to make the games
const tsuro = (gameId) => {
    let state = {
        gameId,
        deck: JSON.parse(JSON.stringify(tiles)),    // each game is created with an unshuffled deck, to be modified when game starts
        players: [],                                // this array is necessary as it determines the order of assigning the active player
        playerHands: {},                            // this object will look like socketId: [...tiles]
        playerPositions: {},                        // this object will look like socketId: [...position]
        activePlayer: "",                           // a string value of the active socketId, middleware to check this when reading emits
        status: "lobby",                            // The mode of the room, defaults to "lobby" when created
        board: JSON.parse(JSON.stringify(board)),   // the board starts off empty and gets filled as the game goes on
    }

    return Object.assign(state, shuffle(state));
}