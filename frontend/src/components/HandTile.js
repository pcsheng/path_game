import React from 'react';

function HandTile(props){
    return (
        <img src={"/assets/" + props.tileId + ".svg"} style={{width: 15 + "%", marginLeft: 2 + "%", marginRight: 2 + "%", cursor: "pointer", transform: "rotate(" + (props.position * 0.25) + "turn)"}} onClick={()=>props.playTile(props.tileId, props.position, props.gameId)} />
    )
}

export default HandTile;