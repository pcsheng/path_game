const app = require('express')(),
      server = require('http').Server(app),
      // the wsEngine is a fix for windows UGH
      io = require('socket.io')(server, { wsEngine: 'ws' }),
      bodyParser = require('body-parser'),
      cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// this is the main storage of the application state
const manager = require("./manager/manager");
let currentGames = manager();

io.on('connection', (socket)=>{
    console.log('user connection');
    // console.log(io.sockets.adapter.rooms);
    // console.log(socket);

    socket.on('joinLobby', () => {
        console.log('join lobby');
        socket.join('lobby');
        socket.emit('lobbyData', currentGames.getLobby());
    });

    socket.on('leaveLobby', () => {
        socket.leave('lobby');
    });

    socket.on('makeGame', (data) => {
        console.log('make game');
        currentGames.newGame();
        io.in('lobby').emit('lobbyData', currentGames.getLobby());
    });
});

server.listen(8080, ()=>{
    console.log('server online');
});