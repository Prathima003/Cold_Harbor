// FarmerDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import FarmerNavbar from '../Components/FarmerNavbar';
import BannerBackground from "../Assets/home-banner-background.png";
import AboutBackground from "../Assets/about-background_wide.png";
import Footer from '../Components/Footer';

// SlotCard component
const SlotCard = ({ slot }) => (
  <div className="card mb-4">
    <img
      src={slot.slot_image}
      className="card-img-top"
      alt={slot.slot_title}
      style={{ height: '200px', width: '100%', objectFit: 'cover' }}
    />
    <div className="card-body">
      <h5 className="card-title">{slot.slot_title}</h5>
      <p className="card-text">Slot Area: {slot.slot_area} square units</p>
      <p className="card-text">Slot Price: ₹{slot.slot_price}</p>

      {/* Conditionally render username and slot status */}
      {['occupied'].includes(slot.slot_status) && (
        <p className="card-text" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ textAlign: 'left' }}>{`Slot Status: ${slot.slot_status}`}</span>
          <span style={{ textAlign: 'right' }}>{`Booked by: ${slot.booked_user.username}`}</span>
        </p>
      )}
      {['pending'].includes(slot.slot_status) && (
        <p className="card-text" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ textAlign: 'left' }}>{`Slot Status: ${slot.slot_status}`}</span>
          <span style={{ textAlign: 'right' }}>{`Hold by: ${slot.booked_user.username}`}</span>
        </p>
      )}
      {['empty'].includes(slot.slot_status) && (
        <p className="card-text" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ textAlign: 'left' }}>{`Slot Status: ${slot.slot_status}`}</span>
        </p>
      )}
    </div>
  </div>
);

// FarmerDashboard component
const FarmerDashboard = () => {
  const [user, setUser] = useState(null);
  const [pendingSlots, setPendingSlots] = useState([]);
  const [approvedSlots, setApprovedSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    setUser(currentUser);

    axios.get(`${API_BASE_URL}/all_slots`)
      .then(response => {
        const userPendingSlots = response.data.filter(slot =>
          slot.booked_user && slot.booked_user.user_id === currentUser._id && slot.slot_status === 'pending'
        );
        const userApprovedSlots = response.data.filter(slot =>
          slot.booked_user && slot.booked_user.user_id === currentUser._id && slot.slot_status === 'occupied'
        );

        setPendingSlots(userPendingSlots);
        setApprovedSlots(userApprovedSlots);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError('An error occurred while fetching data.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <FarmerNavbar />
      <div className="container mt-4">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>

        <h1>Welcome, {user && `${user.firstName} !`}</h1>

        <div>
          <div className="about-background-image-container">
            <img src={AboutBackground} alt="" />
          </div>

          <h2>Pending Slots</h2>

          <div className="row">
            {pendingSlots.map(slot => (
              <div key={slot._id} className="col-md-4">
                <SlotCard slot={slot} />
              </div>
            ))}
          </div>

        </div>

        <div>
          <h2>Approved Slots</h2>
          <div className="row">
            {approvedSlots.map(slot => (
              <div key={slot._id} className="col-md-4">
                <SlotCard slot={slot} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default FarmerDashboard;
