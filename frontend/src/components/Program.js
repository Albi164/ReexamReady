import React, { Component } from 'react'
import {Link} from "react-router-dom";


export class Program extends Component {


    render() {
        // const program = this.props.match.params.id;
        // let programinfo = this.props.program;
        // let channels =this.props.tvchannel;
        // console.log(channels);
        // console.log(programinfo);

        function addToFavorites(data) {
            fetch('https://jobappexam.herokuapp.com/api/favorite/add', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
        }

        if(this.props.programs <=0) {
            return <p>Loading ...</p>
        } else {
            let programid = this.props.match.params.id;
            let programs = this.props.programs;
            let ourProgram = programs.find(prog => prog._id === programid);
           let ourChannelID;
            let ourChannel = this.props.tvchannel.find( channel => channel._id = ourProgram )
            let ourChannelName = ourChannel.name;

        // if (!program) {
        //     return <p>Waiting for program</p>
        // }
        return (
            <div>
                <Link to ={"/"}> <p>Home</p></Link>
                <header>
                    <h1>Title : {ourProgram.title}</h1>
                    <p>Description: {ourProgram.description}</p>
                    <p>First on air: {ourProgram.first}</p>
                    <p>Next time in your tv: {ourProgram.next}</p>
                    <p>Tv channel that it will be on: {ourChannelName}</p>
                    <button onClick={() => addToFavorites({program: programid})}>add</button>
                </header>
            </div>
        )
    }}
}

export default Program