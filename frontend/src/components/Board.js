import React, {Component} from 'react';
import './Board.css';
import Tile from './Tile';
import Hand from './Hand';
import ShowPlayer from './ShowPlayer';

class Board extends Component{
    
    // using componentDidUpdate because componentWillUpdate timing
    // meant that 2 emits were being sent
    componentDidUpdate(){
        if (Object.keys(this.props.myGame).length === 0){
            this.props.joinGame(this.props.match.params.gameId);
        }
    }
    componentWillUnmount(){
        this.props.joinLobby();
        this.props.clearGame();
    }

    render(){
        console.log(this.props.myGame);
        let showBoard;
        if (Object.keys(this.props.myGame).length !== 0){
            showBoard = this.props.myGame.board.map((curr)=>{
                return <Tile tileData={curr} curPos={this.props.myGame.curPos} />
            })};
        let thisGame = this.props.match.params.gameId;
        return (
            <div className="row" style={{position: "relative", marginTop: 50}} >
                <div className="col s12 center-align" style={{padding: 0}} >
                    <div style={{width: 100 + "%", backgroundImage: "url(/assets/board2.svg)"}}>
                        <div className="flexCont" >
                            {showBoard}
                        </div>  
                        <div className="gridLines" >
                            <img src="/assets/grid.svg" style={{width: 100 + "%"}} alt="grid lines" />
                        </div>
                    </div>
                    <button className="col s12 btn waves-effect waves-light" 
                            style={{minHeight: 60, marginTop: 30, fontSize: 40, display: this.props.myHand.length ? "none" : "block"}} 
                            onClick={()=>{this.props.startGame(thisGame)}} >{this.props.myGame.status === 'play' ? "Viewer Mode" : "Start Game"}</button>
                    <Hand myHand={this.props.myHand} playTile={this.props.playTile} gameId={this.props.match.params.gameId} turnClock={this.props.turnClock} turnCounterClock={this.props.turnCounterClock} />
                    <ShowPlayer myId={this.props.myId} curPos={this.props.myGame.curPos} />
                </div>
            </div>
        )
    }
}

export default Board;