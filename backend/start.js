/*
    each tile looks like this:
       F  T
    T        F
    F        T
       T  F
    with the sides going 0, 1, 2, 3 clockwise

    this starter will have a set number of possibilities to random from
*/


let start = [
    [1, 2, 0, false],
    [1, 5, 0, false],
    [2, 6, 1, false],
    [5, 6, 1, false],
    [6, 5, 2, false],
    [6, 2, 2, false],
    [5, 1, 3, false],
    [2, 1, 3, false],
];

module.exports = start;