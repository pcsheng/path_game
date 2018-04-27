// responsible for shuffling the tiles array to form a deck 
const dealHands = (state) => ({
    dealHands: () => {
        let currentIndex = state.deck.length,
            randomIndex,
            placeholder;
        while (currentIndex) {
            // interesting to note here that even though currentIndex is fed in with --
            // into another operation, the function still knows to change its value with each loop
            randomIndex = Math.floor(Math.random() * currentIndex--);

            placeholder = state.deck[currentIndex];
            state.deck[currentIndex] = state.deck[randomIndex];
            state.deck[randomIndex] = placeholder;
        }
    }
});

module.exports = dealHands;




// deals the players their hands when the game starts
function dealHands(){
    let thisDeck = currentGames.games[whichGame].deck;
    // console.log(thisDeck);
    // console.log(currentGames.games[whichGame].players);
    for (let thisPlayer in currentGames.games[whichGame].players){
        currentGames.games[whichGame].players[thisPlayer][1].push(...thisDeck.splice(thisDeck.length-4, 3));
    }
    // console.log(thisDeck);
}