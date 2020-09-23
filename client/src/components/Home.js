import React from 'react'
import "../App.css";
import Navbar from './Navbar'
import bg1 from './../bg1.svg';
import bg2 from './../bg2.png';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, NavLink } from 'react-router-dom'

const Home = () => {
    return(
        <div className="home">
            <div className="row">
                <nav className="navbar-orig col-sm-12 col-md-12 ">
            
                    <ul className="navbar">
                    
                        
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                        
                        
                    </ul>    
                    <br></br>     
                </nav>

            </div>
        
            <div className="row">
                <div className="col-md-6 col-sm-12">
                <h1>Violence Detector</h1>
                <h3>The rapid growth of surveillance cameras to monitor human activity demands a system that can recognize violent or suspicious activities without the requirement of constant attention by respective authorities. There are instances where the nuisance creators run away after causing disruption and the authorities face a difficult time trying to tackle the issues created by them - as it becomes difficult to hold them responsible because of the time required.</h3>

                </div>
                <div className="col-md-6 col-sm-12">
                <img src={bg1} ></img>
                </div>
            </div>
        </div>
    )
}

export default Home