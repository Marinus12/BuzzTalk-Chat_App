import React from 'react';
import './Homepage.css';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';


function HomePage() {

  return (
    <>
    <div>
      <p className='para'>Welcome to BUZZTALK</p>
    </div>
    <div className="image-container">
      <div className='grid'>
        <div className="image" id='image1'></div>
        <div className="image"></div>
        <div className="image"></div>
        <div className="image"></div>
      </div>
      <p className="text">Enjoy the new experience of chatting with friends around your location </p>
      <Link to="/register">
        <button className="get-started-button">Get Started</button>
      </Link>
    </div>
    <Footer />
    </>
  )
}

export default HomePage;