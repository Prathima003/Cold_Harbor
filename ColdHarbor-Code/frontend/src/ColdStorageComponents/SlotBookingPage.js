import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SlotBookingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSlots: 400,
      emptySlots: 200,
      pricePerQuintal: 150,
      slotDimensions: {
        width: '130px',
        height: '140px',
      },
    };
  }

  calculateSlotArea() {
    const { slotDimensions, totalSlots } = this.state;
    const slotWidth = parseFloat(slotDimensions.width);
    const slotHeight = parseFloat(slotDimensions.height);

    const slotArea = (slotWidth * slotHeight) / 10000; // Converting to square meters
    const totalArea = slotArea * totalSlots;

    return { slotArea, totalArea };
  }

  render() {
    const { totalSlots, emptySlots, pricePerQuintal } = this.state;
    const { slotArea, totalArea } = this.calculateSlotArea();
    // const slotsPerRow = 7; // Number of slots per row

    const slotStyle = {
      width: '130px', // Adjust the width as needed
      height: '140px', // Adjust the height as needed
      textAlign: 'center',
      position: 'relative',
    };

    const buttonStyle = {
      width: '100%', // Match the slot's width
    };

    return (
      <div className="container">
        {/* Cold Storage Title */}
        <h1 className="text-center">Cold Storage</h1>

        <div className="position-relative mt-4">
          {/* Display Empty Slots and Total Slots */}
          <div className="position-absolute top-0 start-0">
            {`Price Per Quintal: Rs. ${pricePerQuintal} /-`}
          </div>
          <div className="position-absolute top-0 end-0">
            {`Slots Empty: ${emptySlots} / Total Slots: ${totalSlots}`}
          </div>
        </div>

        <div className="mt-5">
          <div className="row row-cols-md-7 g-2"> {/* Adjusted to 7 slots per row */}
            {/* Loop to represent each slot */}
            {[...Array(totalSlots)].map((_, index) => {
              const sector = String.fromCharCode(65 + Math.floor(index / 100)); // A, B, C, D
              const slotNumber = (index % 100) + 1; // 1 to 100
              const slotTitle = `${sector}-${slotNumber}`;
              const isSlotEmpty = index < emptySlots;

              return (
                <div key={index} className="col">
                  <div
                    className={`rounded p-3 ${isSlotEmpty ? 'bg-success' : 'bg-light'}`}
                    style={slotStyle}
                  >
                    {`${slotTitle}`}
                    <div>
                      {/* Display area details */}
                      <p>Area: {slotArea.toFixed(2)} sq. meters</p>
                      <p>Occupied: {isSlotEmpty ? 'No' : 'Yes'}</p>
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <Link
                      to={`/choose_slots/slot_${slotTitle}`}
                    >
                      <button
                        className={`btn btn-primary ${isSlotEmpty ? '' : 'disabled'}`}
                        style={buttonStyle} // Set the button's width
                        disabled={!isSlotEmpty}
                      >
                        Choose Slot
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-3">
          {/* Display total area details */}
          <p>Total Area: {totalArea.toFixed(2)} sq. meters</p>
        </div>
      </div>
    );
  }
}

export default SlotBookingPage;
