const mongoose = require('mongoose');

const coldStoreAdminSchema = new mongoose.Schema({
    cld_str_name: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    mandal: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phno: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bannerImage: {
        type: String, // Store the URL for the banner image
        default: 'https://i.pinimg.com/originals/bd/a5/e2/bda5e2a411b87e0dc47feec461adb919.jpg', // Provide a default image link
    },
    profileImage: {
        type: String, // Store the URL for the profile image
        default: 'https://th.bing.com/th/id/OIP.CyZ0GGnQK4WA5hjScsSwpwHaGc?pid=ImgDet&rs=1', // Provide a default image link
    },
    rating:{
        type: Number,
        default: 3
    },
    address:{
        type: String
    },
    description: {
        type: String,
        default: "Lorem ipsum is placeholder text commonly used in the graphic"
    },
    price_per_slot: {
        type: Number,
        default: 150
    }
});
mongoose.model("ColdStoreAdmin", coldStoreAdminSchema);

const farmerAdminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phno: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
mongoose.model("FarmerAdmin", farmerAdminSchema);
