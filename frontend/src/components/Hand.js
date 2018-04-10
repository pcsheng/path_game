import React from 'react';
import HandTile from './HandTile';
import './Hand.css';

function Hand(props){
    let handRender = props.myHand.map((curr)=>{
        return <HandTile tileId={curr.tileId} position={curr.position} playTile={props.playTile} gameId={props.gameId} />
    })
    return (
        <div className="card" >
            <div className="card-content" >
                <div className="flexCont" >
                    <button className="btn-floating btn-large waves-effect waves-light indigo darken-4" style={{display: props.myHand.length ? "inline-block" : "none"}} onClick={props.turnCounterClock} >
                        <i class="material-icons" >rotate_left</i>
                    </button>
                    {handRender}
                    <button className="btn-floating btn-large waves-effect waves-light indigo darken-4" style={{display: props.myHand.length ? "inline-block" : "none"}} onClick={props.turnClock} >
                        <i class="material-icons" >rotate_right</i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Hand;