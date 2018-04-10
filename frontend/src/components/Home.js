import React, {Component} from 'react';
import axios from 'axios';

class Home extends Component{

    connectTo = (event)=>{
        event.preventDefault();
        if (event.target.nameIn.value){
            axios.post('/connect', {name: event.target.nameIn.value})
                .then(response=>{
                    console.log(response.data.token);
                    localStorage.jwt = response.data.token;
                    this.props.history.push('/games');
                })
                .catch(error=>{
                    console.log(error);
                });
        }
    }

    render(){
        return (
            <div className="row">
                <form className="col s12" onSubmit={this.connectTo} >
                    <div className="row">
                        <div className="col s3"></div>
                        <div className="input-field col s6">
                            <input type="text" 
                                   className="validate center-align" 
                                   placeholder="Choose Your Username" 
                                   name="nameIn" />
                            <button className="btn waves-effect waves-light" type="submit" >Connect
                                <i className="material-icons right">send</i>
                            </button>
                        </div>
                        <div className="col s3"></div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Home;