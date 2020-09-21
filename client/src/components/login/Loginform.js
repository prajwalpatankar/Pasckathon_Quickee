import React, { Component } from "react";
import { Button, FormGroup, Input} from "reactstrap";
import { login } from './UserFunction'
import axios from 'axios'
import { withRouter } from 'react-router';
class Loginform extends React.Component {


    state = {
        username: '',
        password: ''
    }


    handleChangeusername = (e) => {
        this.setState({
            username: e.target.value
        });
    };


    handleChangepassword = (e) => {
        this.setState({
            password: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        // const user = {
        //     email: this.state.email,
        //     password: this.state.password
        //   }
          console.log(this.state.username);
          return axios
      .post('/login', {
        "username": this.state.username,
        "password": this.state.password
      })
      .then(response => {
        localStorage.setItem('usertoken', response.data)
        return response.data
      }).then(res=>{
          if(!res.error){
              this.props.history.push('/webcam')
          }
      })
      .catch(err => {
        console.log(err)
      })
        //   login(user).then(res => {
        //     if (!res.error) {
        //       this.props.history.push(`/webcam`)
        //     }
        //   })
        
    };

    render() {
        return(
            <div className="app-content">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <label>Username</label>
                        <input type="text" placeholder="Username" onChange={this.handleChangeusername} required />
                    </FormGroup>
                    <FormGroup>
                        <label>Password</label>
                        <input type="password" placeholder="Password" onChange={this.handleChangepassword}  required />
                    </FormGroup>
                    <br />
                    <button type="submit" className="btn">Login</button>
                </form>


            </div>
        )
    }
}

export default withRouter(Loginform);

