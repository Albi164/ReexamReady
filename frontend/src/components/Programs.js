import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Programs extends Component{
    render() {
        if(this.props.programs.length <=0) {
            return <p>Loading ...</p>
        } else {

            const tvchannelName = this.props.match.params.tvchannels;
            let programs = this.props.programs;
            let tvchannels = this.props.tvchannels;
            var channelsID = tvchannels.filter(tvchannel => (tvchannel.name === tvchannelName));
            if (channelsID.length <= 0) {
                return <p>Loading ......</p>
            } else {
                var tvchannelID=channelsID[0]._id


                programs = programs.filter (program => ( tvchannelID === program.tvchannel ));


                return(
                    <div>
                        <h3>{tvchannelName}</h3>
                        <h4>List of programs</h4>
                        <ul>
                            {programs.map(program => {
                                    return(
                                        <Link to={`/program/${program._id}`}>
                                            <li>{program.title}</li>
                                        </Link>
                                    )
                                }
                            )
                            }
                        </ul>
                    </div>
                )
            }
        }
    }
}
export default Programs;