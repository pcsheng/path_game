import React, {Component} from 'react';

class Tile extends Component{
    render(){
        // this portion of the code handles rendering the player characters
        let thisTile = this.props.tileData[0] + "" + this.props.tileData[1];
        let playerRender = this.props.curPos.map((curr, ind)=>{
            return [curr[1][0] + "" + curr[1][1], "p" + (ind + 1), curr[1][2], curr[1][3]];
        }).filter((curr)=>{
            return curr[0] === thisTile;
        }).map((curr)=>{
            if (curr[2] === 0){
                return <img src={"/assets/players/" + curr[1] + ".svg"}
                            style={{zIndex: 2,
                                    position: "absolute",
                                    height: 30 + "%",
                                    left: curr[3] ? 51.6666667 + "%" : 18.3333333 + "%",
                                    top: -12.5 + "%"}} />
            }else if (curr[2] === 1){
                return <img src={"/assets/players/" + curr[1] + ".svg"}
                            style={{zIndex: 2,
                                    position: "absolute",
                                    height: 30 + "%",
                                    top: curr[3] ? 51.6666667 + "%" : 18.3333333 + "%",
                                    right: -12.5 + "%"}} />
            }else if (curr[2] === 2){
                return <img src={"/assets/players/" + curr[1] + ".svg"}
                            style={{zIndex: 2,
                                    position: "absolute",
                                    height: 30 + "%",
                                    right: curr[3] ? 51.6666667 + "%" : 18.3333333 + "%",
                                    bottom: -12.5 + "%"}} />
            }else if (curr[2] === 3){
                return <img src={"/assets/players/" + curr[1] + ".svg"}
                            style={{zIndex: 2,
                                    position: "absolute",
                                    height: 30 + "%",
                                    bottom: curr[3] ? 51.6666667 + "%" : 18.3333333 + "%",
                                    left: -12.5 + "%"}} />
            }
        });
        return (
            <div style={{position: "relative",
                         width: 16.6666666666667 + "%",
                         paddingTop: 16.6666666666667 + "%"}} >
                <img src={Object.keys(this.props.tileData[2]).length ? "/assets/" + this.props.tileData[2].tileId + ".svg"
                                                                     : "/assets/empty.svg"} 
                    alt={Object.keys(this.props.tileData[2]).length ? "game tile " + this.props.tileData[2].tileId
                                                                    : "empty tile"} 
                    style={{width: 100 + "%", 
                            height: 100 + "%", 
                            position: "absolute", 
                            top: 0, left: 0,
                            zIndex: 0,
                            transform: "rotate(" + (this.props.tileData[2].position * 0.25) + "turn)", 
                            opacity: Object.keys(this.props.tileData[2]).length ? 1 : 0}} />
                {playerRender}
            </div>
        )
    }
}

export default Tile;