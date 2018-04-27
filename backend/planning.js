import tiles from "./game/constants/tiles.js";
import board from "./game/constants/board.js";

// the game object will be an instance of the class game
// which should make it easier to make the games
const tsuro = (gameId) => {
    let state = {
        gameId,
        deck: tiles,
        players: [],
        status: "lobby",
        board: Object.assign({}, board),
        
    }
}