const app = require('express')(),
      server = require('http').Server(app),
      // the wsEngine is a fix for windows UGH
      io = require('socket.io')(server, { wsEngine: 'ws' }),
      socketioJwt = require('socketio-jwt'),
      jwt = require('jsonwebtoken'),
      jwtKey = require('./config.json')['jwt-key'],
      bodyParser = require('body-parser'),
      cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const tiles = JSON.parse(JSON.stringify(require('./tiles'))),
      board = JSON.parse(JSON.stringify(require('./board'))),
      start = JSON.parse(JSON.stringify(require('./start')));
      

// this array is going to contain all the ongoing games
// each game will be an object in the array detailing stuff about the game
// like a game id, board state, player hands, etc
let currentGames = {gameCount: 0, games: {}};

function shuffle(deckArr){
    let currentIndex = deckArr.length, randomIndex, placeholder;
    while (currentIndex){
        // interesting to note here that even though currentIndex is fed in with --
        // into another operation, the function still knows to change its value with each loop
        randomIndex = Math.floor(Math.random() * currentIndex--);

        placeholder = deckArr[currentIndex];
        deckArr[currentIndex] = deckArr[randomIndex];
        deckArr[randomIndex] = placeholder;
    }
    return deckArr;
};

// this function is responsible to creating the game object
function setup(){
    let gameId = currentGames.gameCount + '-' + Date.now();
    // stringify parse ensures that this array is just a copy
    // and that an unedited version of the tiles exists still
    let deck = shuffle(JSON.parse(JSON.stringify(tiles)));
    currentGames.games[gameId] = {deck: deck, players: {}, public: {status: 'wait', board: JSON.parse(JSON.stringify(board)), curPos: []}};
    currentGames.gameCount++;
};

// this function adds the player info into the selected game
// depends on being fed that particular socket and the gameId
function addPlayer(whichSocket, whichGame){
    if (currentGames.games[whichGame]){
        // the players object will look like this
            // {playerId: [playerName, handArray]}
        currentGames.games[whichGame].players[whichSocket.id] = [whichSocket.playerName, []];
    }
};

// deals the players their hands when the game starts
function dealHands(whichGame){
    let thisDeck = currentGames.games[whichGame].deck;
    // console.log(thisDeck);
    // console.log(currentGames.games[whichGame].players);
    for (let thisPlayer in currentGames.games[whichGame].players){
        currentGames.games[whichGame].players[thisPlayer][1].push(...thisDeck.splice(thisDeck.length-4, 3));
    }
    // console.log(thisDeck);
}

// randomly gives people starting positions
function startPos(whichGame){
    // copies an array of starter positions
    let thisStart = JSON.parse(JSON.stringify(start));
    for (let thisPlayer in currentGames.games[whichGame].players){
        // curPos is an array where each element looks like this:
            // [socketId, position, isActive?]
        currentGames.games[whichGame].public.curPos.push([thisPlayer, thisStart.splice(Math.random() * thisStart.length, 1)[0], false]);
    }
}

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

function leaveGame(whichSocket, whichGame){
    // adds the player's current hand back into the deck
    let removedCards = currentGames.games[whichGame].players[whichSocket][1].splice(0, currentGames.games[whichGame].players[whichSocket][1].length);
    currentGames.games[whichGame].deck.unshift(...removedCards);
    let discIndex = currentGames.games[whichGame].public.curPos.reduce((accu, curr, ind)=>{
        if (curr[0] === whichSocket){
            accu = ind;
        }
        return accu;
    }, "");
    // throws the tile into the stratosphere
    if (Number.isInteger(discIndex)){
        // if the disconnecting player is the active player
        if (currentGames.games[whichGame].public.curPos[discIndex][2] === true){
            let nextIndex = nextPlayer(discIndex, currentGames.games[whichGame].public.curPos);
            currentGames.games[whichGame].public.curPos[nextIndex][2] = true;
        }
        currentGames.games[whichGame].public.curPos[discIndex][1][0] = -1000;
        currentGames.games[whichGame].public.curPos[discIndex][1][1] = -1000;
        currentGames.games[whichGame].public.curPos[discIndex][2] = "disconnect";
    }
}

// this path is responsible for issuing JWT for users upon connecting
app.post('/connect', (req, res)=>{
    // the body is going to come with a name field
    let token = jwt.sign({name: req.body.name, iat: Date.now()}, 
                         jwtKey, 
                         { expiresIn: '99y' });
    res.json({token: token});
});

// i don't fully understand the handshake thing, so for now
// going to use a separate api to handle the middleware auth stuff
io.use(socketioJwt.authorize({
    secret: jwtKey,
    handshake: true
}));

io.on('connection', (socket)=>{
    // sets the player's selected name to their socket
    jwt.verify(socket.handshake.query.token, jwtKey, (err, decoded)=>{
        socket.playerName = decoded.name;
    });
    // console.log(io.sockets.adapter.rooms);
    // console.log('user connection');
    // console.log(socket);
    socket.join('lobby');
    socket.emit('gameData', Object.keys(currentGames.games));

    socket.on('makeGame', (data)=>{
        console.log('make game');
        setup();
        io.in('lobby').emit('gameData', Object.keys(currentGames.games));
    });

    socket.on('joinGame', (data)=>{
        // leave whatever game they were in to join to current game id
        for (let roomName in socket.rooms){
            if (roomName !== socket.id){
                socket.leave(roomName);
            }
        }
        socket.join(data);
        console.log(socket.id, "joined room", data)
        // console.log(io.sockets.adapter.rooms);
        addPlayer(socket, data);
        // console.log(currentGames);
        if (currentGames.games[data]){
            console.log('joinGame -> thisGame emit');
            io.in(data).emit('thisGame', currentGames.games[data].public);
        }
    });

    socket.on('joinLobby', ()=>{
        // leave whatever game they were in to join lobby
        for (let roomName in socket.rooms){
            if (roomName !== socket.id){
                socket.leave(roomName);
                if (currentGames.games[roomName]){
                    leaveGame(socket.id, roomName);
                    io.to(roomName).emit('thisGame', currentGames.games[roomName].public);
            }
            }
        }
        socket.join('lobby');
        io.to(socket.id).emit('gameData', Object.keys(currentGames.games));
    })

    socket.on('startGame', (data)=>{
        if (currentGames.games[data] && currentGames.games[data].public.status === 'wait'){
            // this will be used to determine what happens
            // when someone connects to this gameId
            currentGames.games[data].public.status = 'play';
            dealHands(data);
            startPos(data);
            // makes P1 the active player
            currentGames.games[data].public.curPos[0][2] = true;
            for (let socketId in currentGames.games[data].players){
                io.to(socketId).emit('giveHand', currentGames.games[data].players[socketId][1]);
            }
            for (let i = 0 ; i < currentGames.games[data].public.curPos.length ; i++){
                io.to(currentGames.games[data].public.curPos[i][0]).emit('setPlayer', "p" + (i + 1));
            }
            console.log('startGame -> thisGame emit');
            io.in(data).emit('thisGame', currentGames.games[data].public);
        }
    });

    socket.on('playTile', (data)=>{
        // console.log(data);
        // copy of the curPos array with all the players
        let curPositions = JSON.parse(JSON.stringify(currentGames.games[data.gameId].public.curPos));
        // a check on whether the player emitting the playTile
        // is in fact the active player that's able to play tiles
        let playerIndex = curPositions.reduce((accu, curr, ind)=>{
            if (curr[0] === socket.id){
                accu = ind;
            }
            return accu;
        }, "");
        if (Number.isInteger(playerIndex) && curPositions[playerIndex][2] === true){
            // finds the tile to apply
            let applyTile = JSON.parse(JSON.stringify(tiles.filter((curr)=>{
                return curr.tileId === data.tileId;
            })[0]));
            // adjusts the tile based on rotations
            applyTile.position = data.position;
            for (let i = 0; i < applyTile.position ; i++){
                applyTile.values.unshift(applyTile.values.pop());
            }
            // finds the location to apply to tile at
            let applyLocation = curPositions.filter((curr)=>{
                return curr[0] === socket.id;
            })[0][1];
            let boardIndex = (applyLocation[0] - 1) * 6 + (applyLocation[1] - 1);
            // applies the tile to the board location
            currentGames.games[data.gameId].public.board[boardIndex][2] = applyTile;

            newHand(data.tileId, socket.id, data.gameId);

            // console.log(currentGames.games[data.gameId].public.curPos);
            // console.log(curPositions);

            // returns an array with the last index as the index of
            // the original curPos array that needs to change
            let affectPlayers = curPositions.map((curr, ind)=>{
                curr.push(ind);
                return curr;
            })
            .filter((curr)=>{
                return (curr[1][0] - 1) * 6 + (curr[1][1] - 1) === boardIndex;
            });

            // changes the position of all the affected players
            let isThisValid, elimSocket;
            for (let i = 0 ; i < affectPlayers.length ; i++){
                currentGames.games[data.gameId].public.curPos[affectPlayers[i][3]][1] = changeTile(affectPlayers[i][1], applyTile, data.gameId);
                isThisValid = JSON.parse(JSON.stringify(currentGames.games[data.gameId].public.curPos[affectPlayers[i][3]][1]));
                // if this new position falls outside the board
                // change their eligibility to play tiles in the game
                if (isThisValid[0] > 6 || isThisValid[0] < 1 || isThisValid[1] > 6 || isThisValid[1] < 1){
                    currentGames.games[data.gameId].public.curPos[affectPlayers[i][3]][2] = "eliminated";
                    console.log(currentGames.games[data.gameId].public.curPos[affectPlayers[i][3]]);
                    console.log(currentGames.games[data.gameId].public.curPos);
                    // ********* this part needs to also return that player's hand to the deck *********
                    elimSocket = currentGames.games[data.gameId].public.curPos[affectPlayers[i][3]][0]
                    let removeCards = currentGames.games[data.gameId].players[elimSocket][1].splice(0, currentGames.games[data.gameId].players[elimSocket][1].length);
                    currentGames.games[data.gameId].deck.unshift(...removeCards);
                    io.to(elimSocket).emit('giveHand', currentGames.games[data.gameId].players[elimSocket][1]);     
                }
            }

            // if this player is not eliminated, then remove active status
            if (currentGames.games[data.gameId].public.curPos[playerIndex][2] === true){
                currentGames.games[data.gameId].public.curPos[playerIndex][2] = false;
            }
            // makes the next player still in the game the active player
            currentGames.games[data.gameId].public.curPos[nextPlayer(playerIndex, curPositions)][2] = true;

            console.log('playTile -> giveHand emit');
            io.to(socket.id).emit('giveHand', currentGames.games[data.gameId].players[socket.id][1]);        
            console.log('playTile -> thisGame emit');
            io.in(data.gameId).emit('thisGame', currentGames.games[data.gameId].public);
            }
    });

    /*
    // amitious stretch stuff for possible reconnections
    socket.on('recon', (data)=>{
        if(currentGames.games[data].public.status === 'play' && currentGames.games[data].players.hasOwnProperty(socket.id)){
            console.log('giveHand')
            io.to(socket.id).emit('giveHand', currentGames.games[data].players[socket.id][1])
        }
    });
    */

    socket.on('disconnecting', ()=>{
        for (let roomName in socket.rooms){
            if (roomName !== socket.id && roomName !== 'lobby'){
                console.log('wtf leave the game pls');
                leaveGame(socket.id, roomName);
                io.to(roomName).emit('thisGame', currentGames.games[roomName].public);
            }
        }
        console.log('user disconnect');
        // will try to allow for disconnects later
    })
});

server.listen(8080, ()=>{
    console.log('server online');
});