import React from "react";
import loginImg from "../../login.png";
import { register } from './UserFunction'

export class Register extends React.Component {

  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    
    e.preventDefault()

    const newUser = {
      
      username: this.state.username,
      password: this.state.password
    }
    console.log(this.state.username);
    register(newUser).then(res => {
      this.props.history.push(`/webcam`)
    })
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>

        <div className="header">
          Register
        </div>

        <div className="content">

          <div className="image">
            <img src={loginImg} />
          </div>

          <div className="form">
          <form noValidate onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label><br></br>
              <input type="text" name="username" placeholder="username" 
                value={this.state.first_name}
                onChange={this.onChange}
                />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label><br></br>
              <input type="text" name="email" placeholder="email" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label><br></br>
              <input type="text" name="password" placeholder="password" 
              value={this.state.password}
              onChange={this.onChange}
              />
            </div>
          </form>
          </div>

        </div>

        <div className="footer">
          <button type="submit" className="btn">
            Register
          </button>
        
        </div>

      </div>
      
    );
  }
}
