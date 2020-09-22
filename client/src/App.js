import React, { Component } from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route } from 'react-router-dom'
import { Login, Register } from "./components/login/index.js";
import Home from './components/Home'
import Appstream from './components/Appstream'
import UploadVideo from './components/upload/upload';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Route exact path='/' component={Home} />
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/webcam' component={Appstream} />
                    <Route path='/upload' component= {UploadVideo}/>
                
                </div>
            </BrowserRouter>
    );
    }
}

export default App