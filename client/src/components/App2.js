import React from "react";
import "../App.css";
import { Login, Register } from "./login/index.js";

class App2 extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: true
    };
  }

  render(){
    return(
      <div className="App">
        <div className="login">
          <div className="container">
              <Register />
          </div>
        </div>
        
      </div>
    )

  }
}


export default App2;