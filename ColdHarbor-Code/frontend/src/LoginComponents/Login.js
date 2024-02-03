import React from 'react';
// import 'Login.css'; // You can style your components in this CSS file
import './Login.css';
import BannerBackground from "../Assets/home-banner-background.png";
import AboutBackgroundImage from "../Assets/about-background-image.png";
import {FcGoogle} from "react-icons/fc";
import {FaFacebookF} from "react-icons/fa";
import {FiTwitter} from "react-icons/fi";


import {Link} from 'react-router-dom';


const Login = () => {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <div className="home-bannerImage-container">
        <img src={BannerBackground} alt="" />
      </div>
      <div className="home-banner-container login-container">
        <div className="home-image-section">
          <h1 className='text-center'>Login</h1>
          <lable className="label-primary-text">User Name</lable>
          <input type='text' className='form-control mb-3 p-3 border-0 ' />
          <lable className="label-primary-text">Password</lable>
          <input type='password' className='form-control mb-3 p-3 border-0 ' />
          <button className=" form-control login-button" >
            Login {" "}
          </button>
          <div className=' mt-3 fs-4' >
            <div style={{ float: 'left' }}><input type='checkbox' /><span> Remember me</span></div>
            <div style={{ float: 'right' }}><Link to="/forget_passsword" ><i>Forget Password ?</i></Link></div>
          </div>
          <div className='pt-5 text-center my-4 fs-4'>
            <pre>0r Login Using</pre>
          </div>
          <div className='text-center d-flex justify-content-center'>
            {/* <div ><BsFacebook size={33}/></div> */}
            <div><FaFacebookF size={50} color='darkblue'/></div>
            {/* <div className='mx-3'><AiFillTwitterCircle size={55}/></div> */}
            <div className='mx-4'><FiTwitter size={55}/></div>
            {/* <div><AiFillGoogleCircle size={33}/></div> */}
            <div><FcGoogle size={55}/></div>
          </div>
        </div>

        <div className="home-text-section">
          <div className="about-section-image-container login-image" style={{ marginLeft: "0px" }}>
            <img src={AboutBackgroundImage} alt="" />
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
export default Login;
