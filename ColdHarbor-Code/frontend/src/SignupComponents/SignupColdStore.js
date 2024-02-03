import React, { useState } from 'react';
import './../LoginComponents/Login.css';
import BannerBackground from "../Assets/home-banner-background.png";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import './Signup.css';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import Swal from 'sweetalert2';

const SignupColdStore = () => {
    const [cld_str_name, setCldStrName] = useState("");
    const [email, setEmail] = useState("");
    const [state, setState] = useState("");
    const [district, setDistrict] = useState("");
    const [mandal, setMandal] = useState("");
    const [phno, setPhno] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const states = ["-- select an option --", "Andhra Pradesh", "Tamil Nadu"];
    const andhraDistricts = ["-- select an option --", "Guntur", "Krishna", "Prakasam", "Visakhapatnam"];
    const gunturMandals = [
        "-- select an option --",
        "Guntur East",
        "Mangalagiri",
        "Tadepalle",
        "Kollipara",
        "Chebrolu",
        "Kakumanu",
        "Ponnur",
        "Tenali",
    ];
    const krishnaMandals = [
        "-- select an option --",
        "Agiripalli",
        "A Konduru",
        "Avanigadda",
        "Bantumilli",
        "Bapulapadu",
        "Gampalagudem",
        "Gannavaram",
        "Ghantasala",
        "G Konduru",
        "Gudivada",
        "Gudlavalleru",
    ];
    const prakasamMandals = ["-- select an option --", "Ongole", "Chirala", "Karamchedu", "Chinaganjam"];
    const visakhapatnamMandals = [
        "-- select an option --",
        "Anandapuram",
        "Bheemunipatnam",
        "Gajuwaka",
        "Gopalapatnam",
        "Maharanipeta",
        "Mulagada",
    ];

    const handleStateChange = (event) => {
        const selectedState = event.target.value;
        setState(selectedState);
        setDistrict("");
        setMandal("");
    };

    const handleDistrictChange = (event) => {
        const selectedDistrict = event.target.value;
        setDistrict(selectedDistrict);
        setMandal("");
    };

    const handleMandalChange = (event) => {
        const selectedMandal = event.target.value;
        setMandal(selectedMandal);
    };

    const signup = (event) => {
        event.preventDefault();

        setLoading(true);
        const requestData = { cld_str_name, email, state, district, mandal, phno, password };
        axios.post(`${API_BASE_URL}/cld_str_signup`, requestData)
            .then((result) => {
                if (result.status === 201) {
                    setLoading(false);
                    Swal.fire({
                        icon: 'success',
                        title: 'User successfully registered'
                    });
                }
                setCldStrName('');
                setEmail('');
                setState('');
                setDistrict('');
                setMandal('');
                setPhno('');
                setPassword('');
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Some error occurred, please try again later!'
                });
            });
    };

    return (
        <div className="App">
            <div className="home-bannerImage-container">
                <img src={BannerBackground} alt="" />
            </div>

            <div className="signup-container row">
                <div className="signup-left-container px-5 col my-5">
                    <form onSubmit={signup}>
                        <h1 className='text-center'>Signup ColdStore</h1>
                        {loading ? <div className='col-md-12 mt-3 text-center'>
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div> : ''}
                        <label className="label-secondary-text">Cold Store Name </label>
                        <input type='text' className='form-control mb-2 px-3 border-0 ' value={cld_str_name} onChange={(ev) => setCldStrName(ev.target.value)} required />
                        <label className="label-secondary-text">Select State</label>
                        <select
                            className="form-control mb-3 p-1 border-0 text-center"
                            value={state}
                            onChange={handleStateChange}
                        >
                            {states.map((stateName, index) => (
                                <option key={index} value={stateName}>
                                    {stateName}
                                </option>
                            ))}
                        </select>
                        <label className="label-secondary-text">Select District</label>
                        <select
                            className="form-control mb-3 p-1 border-0 text-center"
                            value={district}
                            onChange={handleDistrictChange}
                        >
                            {state === "Andhra Pradesh" &&
                                andhraDistricts.map((districtName, index) => (
                                    <option key={index} value={districtName}>
                                        {districtName}
                                    </option>
                                ))}
                            
                        </select>
                        <label className="label-secondary-text">Select Mandal</label>
                        <select
                            className="form-control mb-3 p-1 border-0 text-center"
                            value={mandal}
                            onChange={handleMandalChange}
                        >
                            {district === "Guntur" &&
                                gunturMandals.map((mandalName, index) => (
                                    <option key={index} value={mandalName}>
                                        {mandalName}
                                    </option>
                                ))}
                            {district === "Krishna" &&
                                krishnaMandals.map((mandalName, index) => (
                                    <option key={index} value={mandalName}>
                                        {mandalName}
                                    </option>
                                ))}
                            {district === "Prakasam" &&
                                prakasamMandals.map((mandalName, index) => (
                                    <option key={index} value={mandalName}>
                                        {mandalName}
                                    </option>
                                ))}
                            {district === "Visakhapatnam" &&
                                visakhapatnamMandals.map((mandalName, index) => (
                                    <option key={index} value={mandalName}>
                                        {mandalName}
                                    </option>
                                ))}
                        </select>
                        <label className="label-secondary-text">Email</label>
                        <input type='email' className='form-control mb-2 px-3 border-0 ' value={email} onChange={(ev) => setEmail(ev.target.value)} required />
                        <label className="label-secondary-text">Phone no. </label>
                        <input type='number' className='form-control mb-2 px-3 border-0 ' value={phno} onChange={(ev) => setPhno(ev.target.value)} required />
                        <label className="label-secondary-text">Password</label>
                        <input type='password' className='form-control mb-2 px-3 border-0 ' value={password} onChange={(ev) => setPassword(ev.target.value)} required />
                        <input className="mt-3 px-2 form-control login-button" type="submit" value='Sign Up' />
                    </form>
                    <div className=' text-center my-3 fs-4'>
                        <pre>Or Sign Up Using</pre>
                    </div>
                    <div className='text-center d-flex justify-content-center'>
                        <div><FaFacebookF size={50} color='darkblue' /></div>
                        <div className='mx-4'><FiTwitter size={55} /></div>
                        <div><FcGoogle size={55} />
                        </div>
                    </div>
                    <div className='mt-2 mb-4 d-grid'>
                        <button className="custom-btn custom-btn-white mt-3">
                            <span className='text-muted fs-6'>Already have an account?</span>
                            <span className='ms-1 fw-bold'><Link to='/cld_str_login' className='text-info'>Login</Link></span>
                        </button>
                    </div>
                </div>
                <div className="col signup-right-container mx-auto my-auto px-5" style={{ borderRadius: "20px" }}>
                    <img src="https://www.echipozonators.com/wp-content/uploads/2018/08/Cold-Storage.jpg" className="shadow p-3 mb-5 bg-green image-rounded" alt="" style={{ height: "34vw" }} />
                </div>
            </div>
        </div>
    );
};

export default SignupColdStore;
