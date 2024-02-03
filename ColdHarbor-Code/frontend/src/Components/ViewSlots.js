// ViewSlots.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert
import { API_BASE_URL } from '../config';
import generateAxiosConfig from '../generateAxiosConfig';

function ViewSlots() {
  const { owner_id } = useParams();
  const [slots, setSlots] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')); // Get the user object from local storage
  const navigate = useNavigate(); // Add useNavigate hook
  const axiosConfig = generateAxiosConfig();

  // Check if a user is logged in, show an error message, and return to the home page if not logged in
  useEffect(() => {
    if (!user) {
      Swal.fire({
        icon: 'error',
        title: 'Login Required',
        text: 'You need to log in to view this page.',
      }).then(() => {
        navigate('/'); // Use navigate to redirect to the home page
      });
    } else {
      // Make an API call to fetch slots based on owner_id
      axios.get(`${API_BASE_URL}/view_slots/${owner_id}`, axiosConfig)
        .then((response) => {
          setSlots(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [owner_id, user, axiosConfig, navigate]);

  // Function to handle slot booking
  const handleBookSlot = (slotId) => {
    if (axiosConfig) {
      axios.post(`${API_BASE_URL}/book_slot/${user._id}/${slotId}`, {}, axiosConfig)
        .then(response => {
          // Handle the response
          // navigate('/slot_verification'); // Use navigate to go to slot_verification page
        })
        .catch(error => {
          // Handle the error
        });
    } else {
      // Handle the case where the user is not logged in
    }
  };

  // Function to handle slot approval or decline
  const handleApproval = (slotId) => {
    if (axiosConfig) {
      const action = slots.find(slot => slot._id === slotId).slot_status === 'pending' ? 'approve' : 'decline';
      axios.post(`${API_BASE_URL}/${action}_slot/${slotId}`, {}, axiosConfig)
        .then(response => {
          // Handle the response
          // You may want to update the UI or take other actions after approving or declining a slot
        })
        .catch(error => {
          // Handle the error
        });
    } else {
      // Handle the case where the user is not logged in
    }
  };

  return (
    <div className="container mt-4">
      <h1>Slots List</h1>
      <div className="row">
        {slots.map((slot) => (
          <div key={slot._id} className="col-md-4 mb-4">
            <div className="card">
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

                {/* Add the "Book Now" button with a conditional disabled attribute */}
                <button
                  className="btn btn-primary"
                  disabled={user.user_type === 'cld_str' || slot.slot_status !== 'empty'} // Disable if user_type is "cld_str" or slot is not empty
                  onClick={() => handleBookSlot(slot._id)}
                >
                  Book Now
                </button>

                {/* Add the "Approve/Decline" button with conditional rendering */}
                {user._id === owner_id && ['pending', 'occupied'].includes(slot.slot_status) && (
                  <button
                    className={`btn ${slot.slot_status === 'pending' ? 'btn-success' : 'btn-danger'} float-end`}
                    onClick={() => handleApproval(slot._id)}
                  >
                    {slot.slot_status === 'pending' ? 'Approve' : 'Decline'}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewSlots;
