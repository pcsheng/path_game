// responsible for shuffling the tiles array to form a deck 
const shuffle = (state) => ({
    shuffle: () => {
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

module.exports = shuffle;