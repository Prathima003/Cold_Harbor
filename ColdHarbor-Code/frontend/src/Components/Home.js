import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/home-banner-image.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import About from './About';
import Work from './Work';
import Testimonial from './Testimonial';
import Contact from './Contact';
import Footer from './Footer';

import {Link} from 'react-router-dom';


const Home = () => {


  return (
    <div className="home-container" >
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
          Book Your Slots,  In Your Nearest Cold Storage...!
          </h1>
          <p className="primary-text">
          Preserving Freshness, Embracing Time: Our Cold Storage Solutions Ensure Your Goods Remain Crisp and Flavorful, Ready to Delight Every Palate, All Year Round.
          </p>
          <Link to="/slt_storage">
            <button className="secondary-button" >
              Book Your Slot Now <FiArrowRight />{" "}
            </button>
          </Link>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
      <About />
      <Work />
      <Testimonial />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;