import React from "react";
import loginImg from "../../login.png";
import Loginform from "./Loginform.js"

export class Login extends React.Component {


  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="App">
          <div className="login">
            <div className="container">

              <div className="header">
                Login
              </div>

              <div className="content">

                <div className="image">
                  <img src={loginImg} />
                </div>

                <Loginform />

              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
