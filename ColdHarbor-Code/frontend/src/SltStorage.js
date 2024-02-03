import {React, useEffect} from "react";
import Navbar from "./ColdStorageComponents/ColdStrgNav";
import StrgCard from "./ColdStorageComponents/StrgCard";
import { useState } from "react";
import BannerBackground from "./Assets/home-banner-background.png";
import { FiArrowRight } from "react-icons/fi";
import { BsFillStarFill, BsStar } from "react-icons/bs";
import axios from "axios";
import {API_BASE_URL} from './config'
// import StarRating from "./StarRating";
// import BannerImage from "./Assets/home-banner-image.png";
import Footer from './Components/Footer';
import './SltStorage.css'
// import { colors } from "@mui/material";








const ratingSymbols = {
  1: <div><BsFillStarFill color={'orange'} /><BsStar color={'orange'} /><BsStar color={'orange'} /><BsStar color={'orange'} /><BsStar color={'orange'} /></div>,
  2: <div><BsFillStarFill color={'orange'} /><BsFillStarFill color={'orange'} /><BsStar color={'orange'} /><BsStar color={'orange'} /><BsStar color={'orange'} /></div>,
  3: <div><BsFillStarFill color={'orange'} /><BsFillStarFill color={'orange'} /><BsFillStarFill color={'orange'} /><BsStar color={'orange'} /><BsStar color={'orange'} /></div>,
  4: <div><BsFillStarFill color={'orange'} /><BsFillStarFill color={'orange'} /><BsFillStarFill color={'orange'} /><BsFillStarFill color={'orange'} /><BsStar color={'orange'} /></div>,
  5: <div><BsFillStarFill color={'orange'} /><BsFillStarFill color={'orange'} /><BsFillStarFill color={'orange'} /><BsFillStarFill color={'orange'} /><BsFillStarFill color={'orange'} /></div>
};


function SltStorage() {



  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [mandal, setMandal] = useState("");



  const [coldStorages, setColdStorages] = useState([]);
  useEffect(() => {
    // Load cold storages initially
    fetchColdStorages();
  }, []);

  useEffect(() => {
    // Make a GET request to your backend API to fetch cold storages
    axios.get(`${API_BASE_URL}/all_cold_storages`).then((response) => {
      // Assuming the response.data is an array of cold storages
      setColdStorages(response.data);
    });
  }, []);





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


  const fetchColdStorages = () => {
    if (mandal) {
      // Make a GET request to your backend API to fetch cold storages for the selected mandal
      axios
        .get(`${API_BASE_URL}/all_cold_storages/${mandal}`)
        .then((response) => {
          setColdStorages(response.data);
        })
        .catch((error) => {
          console.error("Error fetching cold storages:", error);
          setColdStorages([]);
        });
    }
  };

  return (
    <div className="App">

      <div className="home-container" >
        <Navbar />
        <div className="home-banner-container" >
          <div className="home-bannerImage-container">
            <img src={BannerBackground} alt="" />
          </div>

          {/* ****************************************************************************************************************** */}
          <div className="home-text-section      for-scr-big-desc" style={{ paddingTop: "0", paddingBottom: "0", marginTop: "0%", marginBottom: "0%" }}>
            <h1 className="primary-heading">
              Find Best Cold Storage Near You!
            </h1>
            <p className="primary-text">
              Please select your state,District and Mandal from below selectors
            </p>
            <a href="#">
              <button className="secondary-button" onClick={fetchColdStorages} >
                Find Cold Storage <FiArrowRight />{" "}
              </button>
            </a>
          </div>

          <div className="home-image-section   for-scr-big-selectors">
            <lable className="label-primary-text">Select Your State</lable>
            <select
              className="form-control mb-3 p-3 border-0 text-center"
              value={state}
              onChange={handleStateChange}
            >
              {states.map((stateName, index) => (
                <option key={index} value={stateName}>
                  {stateName}
                </option>
              ))}
            </select>
            <lable className="label-primary-text">Select Your District</lable>
            <select
              className="form-control mb-3 p-3 border-0 text-center"
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
            <lable className="label-primary-text">Select Your Mandal</lable>
            <select
              className="form-control mb-3 p-3 border-0 text-center"
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
          </div>







          <div className="home-image-section   for-scr-sm-selectors">
          <lable className="label-primary-text">Select Your State</lable>
            <select
              className="form-control mb-3 p-3 border-0 text-center"
              value={state}
              onChange={handleStateChange}
            >
              {states.map((stateName, index) => (
                <option key={index} value={stateName}>
                  {stateName}
                </option>
              ))}
            </select>
            <lable className="label-primary-text">Select Your District</lable>
            <select
              className="form-control mb-3 p-3 border-0 text-center"
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
            <lable className="label-primary-text">Select Your Mandal</lable>
            <select
              className="form-control mb-3 p-3 border-0 text-center"
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
            <a href="#">
              <button className="secondary-button"  onClick={fetchColdStorages} >
                Find Cold Storage <FiArrowRight />{" "}
              </button>
            </a>
          </div>

          <div className="contact-page-wrapper slt-strg for-scr-sm-desc " style={{ marginTop: "0% !important", marginBottom: "0% !important" }}>
            <h1 className="slt_strg_primary_heading">
              Find Best Cold Storage Near You!
            </h1>
            <h1 className="primary-text">
              Please select your state,District and Mandal from below selectors
            </h1>
          </div>
          {/* ****************************************************************************************************************** */}

        </div>
        <div className="contact-page-wrapper slt-strg" id="contact">
          <h1 className="slt_strg_primary_heading">
            Featured Cold Storages
          </h1>
          <h1 className="primary-text">
            Please select suitable cold storage for your crop..!
          </h1>
          <div className="container text-center mt-4">
          <div className="row">
            {coldStorages.map((storage, index) => (
              <div className="col mb-4" key={index}>
                <StrgCard
                  src={storage.profileImage} // Updated to profileImage
                  title={storage.cld_str_name} // Updated to cld_str_name
                  description={storage.description} // Updated to description
                  price={storage.price_per_slot} // Updated to price_per_slot
                  rating={storage.rating}
                  _id={storage._id}
                />
              </div>
            ))}
          </div>
        </div>
        </div>
        <Footer />
      </div>


    </div>
  );
}

export default SltStorage;
