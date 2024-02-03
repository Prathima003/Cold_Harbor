import React from "react";
import PickMeals from "../Assets/pick-meals-image.png";
import ChooseMeals from "../Assets/choose-image.png";
import DeliveryMeals from "../Assets/delivery-image.png";

const Work = () => {
    const workInfoData = [
        {
            image: PickMeals,
            title: "Select Cold Storage",
            text: "Selecting the perfect cold storage facility is the key to preserving your products' freshness and value.",
        },
        {
            image: ChooseMeals,
            title: "Book Your Slot",
            text: "Don't let your perishable goods lose their freshness – reserve your storage slot now! ",
        },
        {
            image: DeliveryMeals,
            title: "Fast Deliveries",
            text: "Partner with us for a delivery experience that guarantees the freshness and quality of your products.",
        },
    ];
    return (
        <div className="work-section-wrapper">
            <div className="work-section-top">
                <p className="primary-subheading">Work</p>
                <h1 className="primary-heading">How It Works</h1>
                <p className="primary-text text-right">
                    selecting the right cold storage solution involves a careful evaluation of your specific needs and the capabilities of the facility.
                    By considering factors such as temperature range, capacity, energy efficiency, security, and compliance,
                    you can ensure that your perishable products remain fresh and of the highest quality throughout their storage period.
                </p>
            </div>
            <div className="work-section-bottom">
                {workInfoData.map((data) => (
                    <div className="work-section-info" key={data.title}>
                        <div className="info-boxes-img-container">
                            <img src={data.image} alt="" />
                        </div>
                        <h2>{data.title}</h2>
                        <p>{data.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Work;