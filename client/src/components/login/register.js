import React from "react";
import loginImg from "../../login.png";
import Registerform from "./Registerform.js"

export class Register extends React.Component {

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

          <Registerform />

        </div>

      </div>
      
    );
  }
}
