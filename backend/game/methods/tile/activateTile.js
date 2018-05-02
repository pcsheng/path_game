import { stat } from "fs";

// get the boardIndex helper function
const getBoardIndex = require("./secondary/boardIndex");
const changeSide = require("../secondary/changeSide");
const changeTile = require("../secondary/changeTile");

// this function is used to process tile data and translate it into a move
const activateTile = (state) => ({
    activateTile: (playerId) => {
        const boardIndex = getBoardIndex(state)(playerId),
              tile = state.board[boardIndex][2];

        while (tile.length) {
            changeSide(state)(playerId, tile.values);
            changeTile(state)(playerId);
            boardIndex = getBoardIndex(state)(playerId);
            tile = state.board[boardIndex][2];
        }
    }
});

module.exports = activateTile;
