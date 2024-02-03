import React, { useState } from 'react';
import '../LoginComponents/Login.css';
// You can style your components in this CSS file
import BannerBackground from "../Assets/home-banner-background.png";
// import AboutBackgroundImage from "../Assets/about-background-image.png";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import './Signup.css';

import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import Swal from 'sweetalert2';

const SignupFarmer = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phno, setPhno] = useState();
    const [password, setPassword] = useState("");


    const [loading, setLoading] = useState(false);


    const signup = (event) => {
        event.preventDefault();

        setLoading(true);
        const requestData = { firstName, lastName, email, phno, password }
        axios.post(`${API_BASE_URL}/farmer_signup`, requestData)
            .then((result) => {
                if (result.status === 201) {
                    setLoading(false);
                    Swal.fire({
                        icon: 'success',
                        title: 'User successfully registered'
                    })
                }
                setFirstName('');
                setLastName('');
                setEmail('');
                setPhno(0);
                setPassword('');
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Some error occurred please try again later!'
                })
            })
    }


    return (
        <div className="App">
            {/* <Navbar /> */}
            <div className="home-bannerImage-container">
                <img src={BannerBackground} alt="" />
            </div>


            <div className="signup-container row">
                <div className="signup-left-container px-5 col my-5">
                    <form onSubmit={signup}>
                        <h1 className='text-center'>Sign Up</h1>
                        {loading ? <div className='col-md-12 mt-3 text-center'>
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div> : ''}
                        <lable className="label-secondary-text">First Name</lable>
                        <input type='text' className='form-control mb-2 px-3 border-0 ' value={firstName} onChange={(ev) => setFirstName(ev.target.value)} required />
                        <lable className="label-secondary-text">Last Name</lable>
                        <input type='text' className='form-control mb-2 px-3 border-0 ' value={lastName} onChange={(ev) => setLastName(ev.target.value)} required />
                        <lable className="label-secondary-text">Email</lable>
                        <input type='email' className='form-control mb-2 px-3 border-0 ' value={email} onChange={(ev) => setEmail(ev.target.value)} required />
                        <lable className="label-secondary-text">Phone no. </lable>
                        <input type='number' className='form-control mb-2 px-3 border-0 ' value={phno} onChange={(ev) => setPhno(ev.target.value)} required />

                        <lable className="label-secondary-text">Password</lable>
                        <input type='password' className='form-control mb-2 px-3 border-0 ' value={password} onChange={(ev) => setPassword(ev.target.value)} required />
                        <input className="mt-3 px-2 form-control login-button" type="submit" value='Sign Up' />
                    </form>
                    <div className=' text-center my-3 fs-4'>
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
                    <div className='mt-2 mb-4 d-grid'>
                        <button className="custom-btn custom-btn-white mt-3">
                            <span className='text-muted fs-6'>Already have an account?</span>
                            <span className='ms-1 fw-bold '><Link to='/farmer_login' className='text-info'>Login</Link></span>
                        </button>
                    </div>
                </div>


                <div className="col signup-right-container mx-auto my-auto px-5" style={{ borderRadius: "20px" }}>
                    <img src="https://www.echipozonators.com/wp-content/uploads/2018/08/Cold-Storage.jpg" className="shadow p-3 mb-5 bg-green image-rounded" alt="" style={{ height: "34vw" }} />
                </div>
            </div>
            {/* <Footer /> */}
        </div >
    );
}
export default SignupFarmer;