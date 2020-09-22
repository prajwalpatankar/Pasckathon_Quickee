import React from "react";
import { BrowserRouter } from "react-router-dom";
import loginImg from "../../login.png";
import Registerform from "./Registerform.js"

export class Register extends React.Component {

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="App">
          <div className="login">
            <div className="container">

              <div className="header">
                Register
              </div>

              <div className="content">

                <div className="image">
                  <img src={loginImg} />
                </div>

                <Registerform />

              </div>

            </div>
          </div>
        </div>
      </div>
      
    );
  }
}
