import React, {Component} from 'react';
import {Link} from "react-router-dom";

class TvChannels extends Component{

        render() {

            return(
            <div>
                <Link to ={"/login"}> <p>Login</p></Link>
                <h1>Tv Channels</h1>

                {this.props.tvchannels.map(el => {
                    return <Link key={el._id} to={`/programs/${el.namePath}`}><p>{el.name} <br></br>
                    </p></Link>
                })}
            </div>

        )
    }
}
export default TvChannels;