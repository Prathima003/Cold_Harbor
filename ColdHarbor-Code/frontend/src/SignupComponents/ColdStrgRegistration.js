import React from 'react';
// import '../LoginComponents/Login.css'; // You can style your components in this CSS file
import BannerBackground from "../Assets/home-banner-background.png";
// import AboutBackgroundImage from "../Assets/about-background-image.png";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";

import {Link} from 'react-router-dom';



const ColdStrgRegistration = () => {
    return (
        <div className="App">
            {/* <Navbar /> */}
            <div className="home-bannerImage-container">
                <img src={BannerBackground} alt="" />
            </div>


            <div className="signup-container row">
                <div className="signup-left-container p-5 col my-5">
                    <h1 className='text-center'>Sign Up</h1>
                    <lable className="label-secondary-text">First Name</lable>
                    <input type='text' className='form-control mb-2 px-3 border-0 ' required />
                    <lable className="label-secondary-text">Last Name</lable>
                    <input type='text' className='form-control mb-2 px-3 border-0 ' />
                    <lable className="label-secondary-text">Email</lable>
                    <input type='email' className='form-control mb-2 px-3 border-0 ' />
                    <lable className="label-secondary-text">Phone no. </lable>
                    <input type='number' className='form-control mb-2 px-3 border-0 ' />
                    <lable className="label-secondary-text">User Name</lable>
                    <input type='text' className='form-control mb-2 px-3 border-0 ' />
                    <lable className="label-secondary-text">Password</lable>
                    <input type='password' className='form-control mb-2 px-3 border-0 ' />
                    <button className="mt-4 px-2 form-control login-button" >
                        Sign up{" "}
                    </button>
                    <div className=' text-center my-4 fs-4'>
                        <pre>0r SignUp Using</pre>
                    </div>
                    <div className='text-center d-flex justify-content-center'>
                        {/* <div ><BsFacebook size={33}/></div> */}
                        <div><FaFacebookF size={50} color='darkblue' /></div>
                        {/* <div className='mx-3'><AiFillTwitterCircle size={55}/></div> */}
                        <div className='mx-4'><FiTwitter size={55} /></div>
                        {/* <div><AiFillGoogleCircle size={33}/></div> */}
                        <div><FcGoogle size={55} /></div>
                    </div>
                    <div className='mt-3 mb-4 d-grid'>
                        <button className="custom-btn custom-btn-white mt-3">
                            <span className='text-muted fs-6'>Already have an account?</span>
                            <span className='ms-1 fw-bold '><Link to='/loginas' className='text-info'>Login</Link></span>
                        </button>
                    </div>
                </div>


                <div className="col signup-right-container mx-auto my-auto px-5 ">
                    <img src="https://wallpapercave.com/wp/wp5267493.jpg" className="shadow p-3 mb-5 bg-green rounded-circle" alt="" />
                </div>
            </div>
            {/* <Footer /> */}
        </div >
    );
}
export default ColdStrgRegistration;