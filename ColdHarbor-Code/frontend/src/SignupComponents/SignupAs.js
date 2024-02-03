import React from "react";
import BannerBackground from "..//Assets/home-banner-background.png";
import { FiArrowRight } from "react-icons/fi";
import '../LoginComponents/LoginAs.css'
// import './SellerSiginUpAs.css'

import { Link } from 'react-router-dom';

function SignupAs() {


  return (
    <div className="App">

      <div className="home-bannerImage-container">
        <img src={BannerBackground} alt="" />
      </div>

      <div className="login-as-container" >

        <div className="home-banner-container  login-as-banner-container">

          <div className="login-as-text-section-left">
            <h1 className="login-as-primary-heading-left">
              For Cold Store
            </h1>
            <p className="loginas-primary-text-left">
              Welcome, dear farmers! Securely store crops and find eager buyers through our seller this login portal.
            </p>
            <Link to="/cld_str_signup">
              <button className="secondary-button" >
                Sign Up <FiArrowRight />{" "}
              </button>
            </Link>
          </div>
          <div className="vr m-4 shadow" style={{ padding: "1px", backgroundColor: "#e0e0eb" }}></div>
          <div className="login-as-text-section-right">
            <h1 className="login-as-primary-heading-right">
              For Farmer
            </h1>
            <p className="loginas-primary-text-right">
              Join over 21 million customers, buyying crops, slots, and utilzing lot more facilities like Loans upto 50%!..
            </p>
            <Link to="/farmer_signup">
              <button className="login-as-secondary-button" >
                Sign Up <FiArrowRight />{" "}
              </button>
            </Link>
          </div>
        </div>

      </div>

      <div className='mt-3 mb-4 d-grid' style={{ maxWidth: "450px", marginLeft: "auto", marginRight: "auto" }}>
        <button className="custom-btn custom-btn-white mt-3">
          <span className='text-muted fs-6'>Already have an account?</span>
          <Link to='/loginas'><span className='ms-1 fw-bold text-success'>LogIn</span></Link>
        </button>
      </div>

    </div>
  );
}

export default SignupAs;
