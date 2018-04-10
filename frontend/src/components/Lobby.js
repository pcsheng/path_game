import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import io from 'socket.io-client';
import GameList from './GameList';
import Board from './Board';

let socket;

class Lobby extends Component{

    constructor(){
        super();
        this.state = {
            games: [],
            myGame: {},
            myHand: [],
            myId: ""
        }
    }

    componentDidMount(){
        socket = io('http://localhost:8080/', {query: 'token=' + localStorage.getItem('jwt')});
        socket.on('gameData', (data)=>{
            this.setState({
                games: data
            });
        });
        socket.on('thisGame', (data)=>{
            this.setState({
                myGame: data
            });
        });
        socket.on('giveHand', (data)=>{
            if (this.state.myHand.length){
                for (let i = 0 ; i < data.length ; i++){
                    if (data[i].tileId === this.state.myHand[i].tileId){
                        data[i].position = this.state.myHand[i].position;
                    }
                }
            }

            this.setState({
                myHand: data
            });
        });
        socket.on('setPlayer', (data)=>{
            this.setState({
                myId: data
            })
        })
    }
    
    // will be passing down methods instead of the socket itself
    // passing the socket has some unintended effects due to component lifecycle

    // sends a request to server to create a game
    createGame = ()=>{
        socket.emit('makeGame');
    }

    joinLobby = ()=>{
        socket.emit('joinLobby');
    }

    // joins a game
    joinGame = (whichGame)=>{
        socket.emit('joinGame', whichGame);
    }

    // starts the game you are in
    startGame = (whichGame)=>{
        socket.emit('startGame', whichGame);
    }

    turnClock = ()=>{
        let handCopy = JSON.parse(JSON.stringify(this.state.myHand));
        handCopy = handCopy.map((curr)=>{
            curr.position += 1;
            while (curr.position > 3){
                curr.position -= 4;
            }
            return curr;
        });
        this.setState({
            myHand: handCopy
        });
    }

    turnCounterClock = ()=>{
        let handCopy = JSON.parse(JSON.stringify(this.state.myHand));
        handCopy = handCopy.map((curr)=>{
            curr.position -= 1;
            while (curr.position < 0){
                curr.position += 4;
            }
            return curr;
        });
        this.setState({
            myHand: handCopy
        });
    }

    playTile = (tileId, position, whichGame)=>{
        socket.emit('playTile', {tileId: tileId, position: position, gameId: whichGame});
    }

    clearGame = ()=>{
        this.setState({
            myGame: {},
            myHand: [],
            myId: ""
        })
    }

    render(){
        console.log(this.state.myHand);
        return (
            <Switch>
                <Route exact path={this.props.match.path} render={(props)=>{return <GameList match={props.match} 
                                                                                             history={props.history} 
                                                                                             games={this.state.games} 
                                                                                             createGame={this.createGame} 
                                                                                             joinGame={this.joinGame} />}} />
                <Route path={this.props.match.path + '/:gameId'} render={(props)=>{return <Board match={props.match} 
                                                                                                 history={props.history} 
                                                                                                 myGame={this.state.myGame}
                                                                                                 myId={this.state.myId}
                                                                                                 joinGame={this.joinGame}
                                                                                                 clearGame={this.clearGame}
                                                                                                 joinLobby={this.joinLobby} 
                                                                                                 startGame={this.startGame} 
                                                                                                 turnClock={this.turnClock} 
                                                                                                 turnCounterClock={this.turnCounterClock} 
                                                                                                 playTile={this.playTile}
                                                                                                 myHand={this.state.myHand} />}} />
            </Switch>
        )
    }
}

export default Lobby;