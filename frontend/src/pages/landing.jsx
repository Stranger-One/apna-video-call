import React from 'react';
import { Link, useNavigate } from 'react-router-dom';



export default function LandingPage() {
  const router = useNavigate()
  return (
    <div className="landingContainer">
      <nav>
        <div className='navHeader'>
          <h2>Apna Video Call</h2>
        </div>
        <div className='navlist'>
          <p onClick={() => {
            router("/algftydg")
          }}>Join as Guest</p>
          <p  onClick={() => {
              router("/auth")
            }}>Register</p>
          <div role='button'>
            <p onClick={() => {
              router("/auth")
            }}>Login</p>
          </div>
        </div>
      </nav>
      <nav className="landingMainContainer">
        <div>
          <h1><span style={{color: "#FF9839"}}>Connect</span> with your loved ones</h1>
          <p>Cover a distance by Apna Video Call</p>
          <div className='getStartedButton'>
            <Link to={"/auth"}>Get Started</Link>
          </div>
          
        </div>

        <div role='button'>
          <img src="/mobile-transformed.png" alt=""  />
        </div>
       

      </nav>

    </div>
  )
}

