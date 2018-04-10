import React from 'react';
import './ShowPlayer.css';

function ShowPlayer(props){
    let activePlayer = 0;
    if (props.curPos){
        activePlayer = props.curPos.reduce((accu, curr, ind)=>{
            if (curr[2] === true){
                accu = ind + 1;
            }
            return accu;
        }, 0)
    }
    console.log(activePlayer);
    return (
        <div className="card playerFlex" style={{display: props.myId ? "flex" : "none"}} >
            <span style={{width: 25 + "%"}} >
                <img src={"/assets/players/" + props.myId + ".svg"} style={{maxWidth: 30 + "%"}} />
                <h4 >You</h4>
            </span>
            <span style={{width: 25 + "%"}} >
                <img src={"/assets/players/P" + activePlayer + ".svg"} style={{maxWidth: 30 + "%"}} />
                <h4 >Active Player</h4>
            </span>
        </div>
    )
}

export default ShowPlayer;