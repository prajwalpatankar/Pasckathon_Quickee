import React from 'react'
import "../App.css";
//import { Link, NavLink } from 'react-router-dom' <li><Link to="/">Home</Link></li> <li><Link to="/login">Login</Link></li>

const Navbar = () => {
    return(
        <nav className="navbar-orig">
            
                <ul className="navbar">
                    <li><a href="/">Home</a></li>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/register">Register</a></li>
                    <li><a href="/webcam">Webcam</a></li>
                </ul>           
        </nav>
    )
}
export default Navbar;