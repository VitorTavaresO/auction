import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
        <h1>Home</h1>
        <Link to="/login">Login</Link>
        </div>
    );
};

export default Home;