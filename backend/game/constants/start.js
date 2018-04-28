/*
    each tile looks like this:
       F  T
    T        F
    F        T
       T  F
    with the sides going 0, 1, 2, 3 clockwise

    this starter will have a set number of possibilities to random from
*/


const start = [
    [0, 1, 0, false],
    [0, 4, 0, false],
    [1, 5, 1, false],
    [4, 5, 1, false],
    [5, 4, 2, false],
    [5, 1, 2, false],
    [4, 0, 3, false],
    [1, 0, 3, false],
];

module.exports = start;