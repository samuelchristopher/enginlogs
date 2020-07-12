import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'
const HomePage = () => (
    <div className="mobile__bg">
        <div className="mobile__content home__content">
            <div className="logo__white home__logo"></div>
            <div className="home__tagline">loaning made simple</div>
            <Link to="/sign-in" className="home__button">sign in</Link>
            <Link to="/sign-up" className="home__account">or create an account</Link>
        </div> 
    </div>
)

export default HomePage