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