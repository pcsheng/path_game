// each tile is essentially a collection of values that maps each of 8 points to another point on the tile
    // each tile technically has 8 different values based on how the tile is turned
    // turning the tile rotates the values
    
    // the functionalities array of each tile contains the input values of
    // what to feed in to the change functions
    // the base indices of 0-3 represent the 4 sidesof each tile
    // this actually maps directly to curPos[3] which will come in handy
    // when determining which function to apply
    // the two nested arrays then map to false and true respectively
    // *** I NEED TO SET THE FUNCTIONALITY OF THE CURRENT TILE TO STATE SO I CAN ADJUST WITH ROTATIONS ***
    // on rotation, i would splice the first or last index of the base array and append it to the other side
const tiles = [
    {
        values:
            [
                [
                    [0, false],
                    [0, false]
                ],
                [
                    [0, false],
                    [0, false],
                ],
                [
                    [0, false],
                    [0, false]
                ],
                [
                    [0, false],
                    [0, false]
                ]
            ],
        position: 0,
        tileId: 1
    },
    {
        values:
            [
                [
                    [3, false],
                    [3, false]
                ],
                [
                    [0, false],
                    [0, false]
                ],
                [
                    [0, false],
                    [0, false]
                ],
                [
                    [1, false],
                    [1, false]
                ]
            ],
        position: 0,
        tileId: 2
    },
    {
        values:
            [
                [
                    [3, false],
                    [1, false]
                ],
                [
                    [3, false],
                    [2, false]
                ],
                [
                    [0, false],
                    [0, false]
                ],
                [
                    [2, false],
                    [1, false]
                ]
            ],
        position: 0,
        tileId: 3
    },
    {
        values:
            [
                [
                    [3, false],
                    [1, false]
                ],
                [
                    [3, false],
                    [1, false]
                ],
                [
                    [3, false],
                    [1, false]
                ],
                [
                    [3, false],
                    [1, false]
                ]
            ],
        position: 0,
        tileId: 4
    },
    {
        values:
            [
                [
                    [3, true],
                    [3, true]
                ],
                [
                    [0, false],
                    [0, false]
                ],
                [
                    [0, false],
                    [0, false]
                ],
                [
                    [1, true],
                    [1, true]
                ]
            ],
        position: 0,
        tileId: 5
    },
    {
        values:
            [
                [
                    [0, false],
                    [0, false]
                ],
                [
                    [2, false],
                    [2, false]
                ],
                [
                    [0, false],
                    [0, false]
                ],
                [
                    [2, false],
                    [2, false]
                ]
            ],
        position: 0,
        tileId: 6
    },
    {
        values:
            [
                [
                    [0, false],
                    [0, false]
                ],
                [
                    [2, true],
                    [2, true]
                ],
                [
                    [0, false],
                    [0, false]
                ],
                [
                    [2, true],
                    [2, true]
                ]
            ],
        position: 0,
        tileId: 7
    },
    {
        values:
            [
                [
                    [3, true],
                    [1, false]
                ],
                [
                    [3, false],
                    [2, true]
                ],
                [
                    [0, false],
                    [0, false]
                ],
                [
                    [1, true],
                    [2, true]
                ]
            ],
        position: 0,
        tileId: 8
    },
    {
        values:
            [
                [
                    [0, false],
                    [0, false]
                ],
                [
                    [2, true],
                    [1, false]
                ],
                [
                    [3, false],
                    [1, true]
                ],
                [
                    [2, true],
                    [3, true]
                ]
            ],
        position: 0,
        tileId: 9
    },
    {
        values:
            [
                [
                    [3, true],
                    [1, false]
                ],
                [
                    [3, false],
                    [1, false]
                ],
                [
                    [3, false],
                    [1, true]
                ],
                [
                    [1, true],
                    [3, true]
                ]
            ],
        position: 0,
        tileId: 10
    },
    {
        values:
            [
                [
                    [1, true],
                    [3, false]
                ],
                [
                    [3, true],
                    [1, false]
                ],
                [
                    [3, false],
                    [1, true]
                ],
                [
                    [1, false],
                    [3, true]
                ]
            ],
        position: 0,
        tileId: 11
    },
    {
        values:
            [
                [
                    [1, true],
                    [3, false]
                ],
                [
                    [3, true],
                    [2, true]
                ],
                [
                    [0, false],
                    [0, false]
                ],
                [
                    [1, false],
                    [2, true]
                ]
            ],
        position: 0,    
        tileId: 12
    },
    {
        values:
            [
                [
                    [1, true],
                    [3, true]
                ],
                [
                    [3, true],
                    [2, false]
                ],
                [
                    [0, false],
                    [0, false]
                ],
                [
                    [2, false],
                    [1, true]
                ]
            ],
        position: 0,
        tileId: 13
    },
    {
        values:
            [
                [
                    [1, false],
                    [3, true]
                ],
                [
                    [2, true],
                    [3, false]
                ],
                [
                    [0, false],
                    [0, false]
                ],
                [
                    [2, true],
                    [1, true]
                ]
            ],
        position: 0,
        tileId: 14
    },
    {
        values:
            [
                [
                    [1, false],
                    [3, false]
                ],
                [
                    [2, false],
                    [3, false]
                ],
                [
                    [0, false],
                    [0, false]
                ],
                [
                    [1, false],
                    [2, false]
                ]
            ],
        position: 0,
        tileId: 15
    },
    {
        values:
            [
                [
                    [1, false],
                    [1, false]
                ],
                [
                    [3, false],
                    [3, false]
                ],
                [
                    [1, false],
                    [1, false]
                ],
                [
                    [3, false],
                    [3, false]
                ]
            ],
        position: 0,
        tileId: 16
    },
    {
        values:
            [
                [
                    [1, false],
                    [1, false]
                ],
                [
                    [3, false],
                    [3, false]
                ],
                [
                    [1, true],
                    [1, true]
                ],
                [
                    [3, true],
                    [3, true]
                ]
            ],
        position: 0,
        tileId: 17
    },
    {
        values:
            [
                [
                    [2, true],
                    [1, false]
                ],
                [
                    [3, false],
                    [2, false]
                ],
                [
                    [2, true],
                    [1, true]
                ],
                [
                    [2, false],
                    [3, true]
                ]
            ],
        position: 0,
        tileId: 18
    },
    {
        values:
            [
                [
                    [2, true],
                    [1, false]
                ],
                [
                    [3, false],
                    [2, true]
                ],
                [
                    [2, true],
                    [1, false]
                ],
                [
                    [3, false],
                    [2, true]
                ]
            ],
        position: 0,
        tileId: 19
    },
    {
        values:
            [
                [
                    [2, false],
                    [3, true]
                ],
                [
                    [0, false],
                    [0, false]
                ],
                [
                    [1, true],
                    [2, false]
                ],
                [
                    [3, true],
                    [1, true]
                ]
            ],
        position: 0,
        tileId: 20
    },
    {
        values:
            [
                [
                    [2, false],
                    [3, false]
                ],
                [
                    [2, false],
                    [1, false]
                ],
                [
                    [3, false],
                    [2, false]
                ],
                [
                    [1, false],
                    [2, false]
                ]
            ],
        position: 0,
        tileId: 21
    },
    {
        values:
            [
                [
                    [2, false],
                    [1, false]
                ],
                [
                    [3, false],
                    [2, true]
                ],
                [
                    [1, true],
                    [2, false]
                ],
                [
                    [3, true],
                    [2, true]
                ]
            ],
        position: 0,
        tileId: 22
    },
    {
        values:
            [
                [
                    [2, false],
                    [1, true]
                ],
                [
                    [2, false],
                    [3, true]
                ],
                [
                    [1, true],
                    [2, false]
                ],
                [
                    [3, true],
                    [2, false]
                ]
            ],
        position: 0,
        tileId: 23
    },
    {
        values:
            [
                [
                    [2, false],
                    [1, true]
                ],
                [
                    [2, true],
                    [3, true]
                ],
                [
                    [1, false],
                    [2, false]
                ],
                [
                    [2, true],
                    [3, false]
                ]
            ],
        position: 0,    
        tileId: 24
    },
    {
        values:
            [
                [
                    [2, true],
                    [1, true]
                ],
                [
                    [2, true],
                    [3, true]
                ],
                [
                    [2, true],
                    [1, true]
                ],
                [
                    [2, true],
                    [3, true]
                ]
            ],
        position: 0,
        tileId: 25
    },
    {
        values:
            [
                [
                    [1, true],
                    [1, true]
                ],
                [
                    [3, true],
                    [3, true]
                ],
                [
                    [1, true],
                    [1, true]
                ],
                [
                    [3, true],
                    [3, true]
                ]
            ],
        position: 0,
        tileId: 26
    },
    {
        values:
            [
                [
                    [2, false],
                    [2, false]
                ],
                [
                    [2, false],
                    [2, false]
                ],
                [
                    [2, false],
                    [2, false]
                ],
                [
                    [2, false],
                    [2, false]
                ]
            ],
        position: 0,
        tileId: 27
    },
    {
        values:
            [
                [
                    [2, false],
                    [2, false]
                ],
                [
                    [2, true],
                    [2, true]
                ],
                [
                    [2, false],
                    [2, false]
                ],
                [
                    [2, true],
                    [2, true]
                ]
            ],
        position: 0,
        tileId: 28
    },
    {
        values:
            [
                [
                    [2, true],
                    [2, true]
                ],
                [
                    [2, true],
                    [2, true]
                ],
                [
                    [2, true],
                    [2, true]
                ],
                [
                    [2, true],
                    [2, true]
                ]
            ],
        position: 0,
        tileId: 29
    },
    {
        values:
            [
                [
                    [1, false],
                    [2, true]
                ],
                [
                    [2, true],
                    [3, false]
                ],
                [
                    [1, false],
                    [2, true]
                ],
                [
                    [2, true],
                    [3, false]
                ]
            ],
        position: 0,
        tileId: 30
    },
    {
        values:
            [
                [
                    [1, false],
                    [2, true]
                ],
                [
                    [2, false],
                    [3, false]
                ],
                [
                    [1, true],
                    [2, true]
                ],
                [
                    [3, true],
                    [2, false]
                ]
            ],
        position: 0,
        tileId: 31
    },
    {
        values:
            [
                [
                    [1, true],
                    [2, true]
                ],
                [
                    [3, true],
                    [2, true]
                ],
                [
                    [1, true],
                    [2, true]
                ],
                [
                    [3, true],
                    [2, true]
                ]
            ],
        position: 0,
        tileId: 32
    },
    {
        values:
            [
                [
                    [1, false],
                    [3, false]
                ],
                [
                    [1, true],
                    [3, false]
                ],
                [
                    [3, true],
                    [1, true]
                ],
                [
                    [1, false],
                    [3, true]
                ]
            ],
        position: 0,
        tileId: 33
    },
    {
        values:
            [
                [
                    [3, true],
                    [1, true]
                ],
                [
                    [1, true],
                    [3, true]
                ],
                [
                    [3, true],
                    [1, true]
                ],
                [
                    [1, true],
                    [3, true]
                ]
            ],
        position: 0,
        tileId: 34
    },
    {
        values:
            [
                [
                    [1, false],
                    [3, false]
                ],
                [
                    [1, false],
                    [3, false]
                ],
                [
                    [1, false],
                    [3, false]
                ],
                [
                    [1, false],
                    [3, false]
                ]
            ],
        position: 0,
        tileId: 35
    }
];

module.exports = tiles;