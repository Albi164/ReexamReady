import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import TvChannels from "./components/TvChannels";
import Programs from "./components/Programs";
import Program from "./components/Program";
import Login from "./components/Login";
import FavoriteList from "./components/FavoriteList";


class App extends Component{
    constructor(props) {
        super(props);

        this.state = {
            tvchannels: [],
            programs: [],
            favorite: []
        }
        ;
    }

    channelsStore(){
        let tvchannels = this.state.tvchannels;
        localStorage.setItem("tvchannels", JSON.stringify(tvchannels))
    }

    programStore(){
        let programs = this.state.programs;
        localStorage.setItem("programs", JSON.stringify(programs))
    }

    favoriteStore(){
        let favorite = this.state.favorite;
        localStorage.setItem("favorite", JSON.stringify(favorite))
    }


    componentDidMount() {
        //await data.
        this.getTvChannels();
        this.getPrograms();
        this.getFavorites();
    }
    componentWillReceiveProps(nextProp) {
        this.setState({tvchannels: nextProp})
    }
    async getPrograms () {
        const response = await fetch(
            `https://jobappexam.herokuapp.com/api/programs`
        );
        const json = await response.json();
        this.setState({ programs: json });
        this.programStore();
    }

    async getTvChannels(){
        try {
            const response = await fetch(`https://jobappexam.herokuapp.com/api/tvchannel` );
            const json = await response.json();
            this.channelsStore();
            this.state["tvchannels"] = json;
            this.componentWillReceiveProps(this.state.tvchannels);
            console.log(this.state.tvchannels)
        } catch (error) {
            console.log(error);
        }
    }

    async getFavorites(){
        const response = await fetch(`https://jobappexam.herokuapp.com/api/favorite/Programs`);
        const json = await response.json();
        this.setState({favorite: json});
        this.favoriteStore();
    }

    getProgramId (id)  {
        let programPosition = this.state.programs.find(el => el._id === id);
        return programPosition;
    };

    renderProgram = (props, id) => {
        let program = this.getProgramId(id);
        return <Program {...props}
                    program={program}
                    programs={this.state.programs}
                        tvchannel={this.state.tvchannels}
        />
    };




    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path={'/'}
                               render={(props) =>
                                   <div>
                                       <TvChannels {...props} programs={this.state.programs}
                                                       tvchannels={this.state.tvchannels}/>
                                   </div>
                               }
                        />

                        <Route exact path={`/programs/:tvchannels`}
                               render={(props) =>
                                   <Programs {...props}
                                                 programs={this.state.programs}
                                                tvchannels ={this.state.tvchannels}

                                   />
                               }
                        />



                        <Route exact path={'/program/:id'}
                               render={(props) =>
                                   this.renderProgram(props, props.match.params.id)

                               }
                        />
                        <Route exact path={'/login'}
                               render={(props) =>
                                   <div>
                                       <Login {...props}/>
                                   </div>
                               }
                        />
                        <Route exact patch ={`/userSchedule`}
                               render ={(props) =>
                                   <FavoriteList{...props}
                                                favorite = {this.state.favorite}
                                                programs ={this.state.programs}
                                                tvchannels = {this.state.tvchannels}

                                   />
                               }

                        />
                    </Switch>
                </Router>
            </div>

        );
    }
}

export default App;