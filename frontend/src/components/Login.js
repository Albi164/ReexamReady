import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            userName: '',
            password: '',
            id: ''
        };
    }
    handleInputChange = (event) => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        });
    };
    onSubmit = event => {
      event.preventDefault();
      fetch('https://jobappexam.herokuapp.com/api/users/authenticate', {
          method: 'POST',
          body: JSON.stringify(this.state),
          headers: {
              'Content-Type': 'application/json'
          }
      }).then(res => {
          if (res.status === 200) {
              console.log('hello world');
              console.log(res);
              this.props.history.push(`/userSchedule`);

          }else{
              const error = new Error(res.error);
              throw error
          }
      }).catch(err => {
          console.error(err);
      })
    };
    render() {
        return(
            <form onSubmit={this.onSubmit}>
                <h1>Login</h1>
                <div>
                    <input
                        type="name"
                        name="userName"
                        value={this.state.userName}
                        onChange={this.handleInputChange}
                        placeholder="Username"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        placeholder="password "
                        required
                    />
                </div>
                <input type="submit" value="submit"/>
            </form>
        )
    }
}
export default Login;

