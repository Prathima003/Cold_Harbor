import React from 'react';
import { BsFillStarFill, BsStar } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const StrgCard = (props) => {
  const navigate = useNavigate(); // Get the navigate function

  const getRatingStars = (rating) => {
    const ratingStars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        ratingStars.push(<BsFillStarFill key={i} color={'orange'} />);
      } else {
        ratingStars.push(<BsStar key={i} color={'orange'} />);
      }
    }
    return ratingStars;
  };

  const handleBookSlotClick = () => {
    navigate(`/view_slots/${props._id}`); // Navigate to "/view_slots" when the button is clicked
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={props.src} className="card-img-top" alt={props.title} style={{ height: "250px" }} />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.description}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Price per Slot - ₹{props.price}</li>
        <li className="list-group-item">{getRatingStars(props.rating)}</li>
      </ul>
      <div className="card-body">
        <button className="secondary-button" style={{ marginLeft: "auto", marginRight: 'auto' }} onClick={handleBookSlotClick}>
          Book Your Slot
        </button>
      </div>
    </div>
  );
}

export default StrgCard;
