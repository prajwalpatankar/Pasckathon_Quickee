import React from 'react'
import "../App.css";
import Navbar from './Navbar'

const Home = () => {
    return(
        <div className="container">
            <Navbar />
            <div className="center">
                <h4 className="center">HOME</h4>
                <p>lorem 5</p>
            </div>
        </div>
    )
}

export default Home