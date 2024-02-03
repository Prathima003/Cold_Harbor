const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  slot_image: {
    type: String,
    required: true,
  },
  slot_title: {
    type: String,
    required: true,
    unique: true,
  },
  slot_status: {
    type: String,
    enum: ['occupied', 'empty', 'pending'],
    default: 'empty', // Set the default status to 'empty'
    required: true,
  },
  slot_area: {
    type: Number, // Assuming you want to store the area in square units
    required: true,
  },
  slot_price: {
    type: Number, // You can adjust the data type as needed
    default: 150,
    required: true,
  },
  slot_owner: {
    type: mongoose.Schema.Types.ObjectId, // This will store the Coldstore Admin's ID
    ref: 'ColdstoreAdmin', // Reference to the Coldstore Admin model (update as per your model name)
    required: true,
  },
  booked_user: {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // Replace with your actual User model
      default: null,
    },
    username: String,  // New field to store username
  },
});

const Slot = mongoose.model('Slot', slotSchema);

