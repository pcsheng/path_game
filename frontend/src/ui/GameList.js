import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class GameList extends Component{
    render(){
        let showGames = this.props.games.map((curr)=>{
            return <Link to={"/games/" + curr} onClick={()=>this.props.joinGame(curr)} className="collection-item">{curr}</Link>
        });
        return (
            <div className="row">
                <div className="col s2"></div>
                <div className="col s8 collection">
                    <button className="waves-effect waves-light btn" onClick={this.props.createGame}>Make New Game</button>
                    {showGames}
                </div>
                <div className="col s2"></div>
            </div>
        )
    }
}

export default GameList;