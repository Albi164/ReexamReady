import React, {Component} from 'react';

import { Link } from 'react-router-dom';

class Navigation extends  Component{
    render() {
        return(
            <div>
                <Link to ={"/"}> <p>Go back Home</p></Link>
                <Link to={`/usersSchedule`}/>
            </div>
        )
    }

}
export default Navigation;