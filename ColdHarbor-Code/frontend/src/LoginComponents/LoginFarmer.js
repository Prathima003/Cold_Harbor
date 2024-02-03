import { useState, React } from 'react';
// import 'Login.css'; // You can style your components in this CSS file
import './Login.css';
import BannerBackground from "../Assets/home-banner-background.png";

import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import Swal from 'sweetalert2'
import axios from 'axios';
import { API_BASE_URL } from '../config';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const LoginFarmer = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const login = (event) => {
    event.preventDefault();
    setLoading(true);
    const requestData = { email, password }
    axios.post(`${API_BASE_URL}/farmer_login`, requestData)
      .then((result) => {
        if (result.status === 200) {
          setLoading(false);
          localStorage.setItem("token", result.data.result.token);
          localStorage.setItem('user', JSON.stringify(result.data.result.user));
          dispatch({ type: 'LOGIN_SUCCESS', payload: result.data.result.user });
          setLoading(false);
          navigate('/mydashboard');
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: error.response.data.error
        })
      })
  }


  return (
    <div className="App">
      {/* <Navbar /> */}
      <div className="home-bannerImage-container">
        <img src={BannerBackground} alt="" />
      </div>
      <div className="home-banner-container login-container login-container-buyer">
        <div className="home-image-section p-5">
          <h1 className='text-center primary-heading mb-5'>Farmer Login</h1>
          {loading ? <div className='col-md-12 mt-3 text-center'>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div> : ''}
          <form onSubmit={login}>
            <lable className="label-primary-text">Email</lable>
            <input type='text' className='form-control mb-3 p-3 border-0 ' value={email} onChange={(e) => setEmail(e.target.value)} />
            <lable className="label-primary-text">Password</lable>
            <input type='password' className='form-control mb-3 p-3 border-0 ' value={password} onChange={(e) => setPassword(e.target.value)}/>

            <input className=" form-control login-button mt-5"  value={"Login"} type='submit' />
            
          </form>
          <div className=' mt-3 fs-6 px-3' >
            <div style={{ float: 'left' }}><input type='checkbox' /><span> Remember me</span></div>
            <div style={{ float: 'right' }}><Link to="/forget_password" ><i>Forget Password ?</i></Link></div>
          </div>
          <div className='pt-5 text-center my-4 fs-4'>
            <pre>0r Login Using</pre>
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
              <span className='text-muted fs-6'>Don't have an account?</span>
              <Link to='/farmer_signup'><span className='ms-1 fw-bold text-info'>Sign Up</span></Link>
            </button>
          </div>
        </div>

        <div className="login-text-section" style={{ paddingLeft: "80px ", height:"88vh", padding:"80px" }}>
          <div className="login-image-seller" style={{ marginLeft: "0px", alignItems: "left" }}>
            <img src="https://img.freepik.com/premium-vector/indian-farmer-with-crops-hand-illustration_635702-11.jpg?w=740" alt="" style={{ marginLeft: "auto !important", marginRight: "auto !important", borderRadius: "50px" }} />
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
export default LoginFarmer;