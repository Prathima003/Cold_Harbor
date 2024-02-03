const express = require('express');
const multer = require('multer');
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// const Slot = mongoose.model("Slot");
const Slot = mongoose.model("Slot");

const { JWT_SECRET } = require('../config');
const protectedRoute = require("../middleware/protectedResourceColdStoreAdmin");
const protectedRoute2 = require("../middleware/protectedResourceFarmerAdmin");

// Route for adding a new slot
router.post('/add_slot', protectedRoute, async (req, res) => {
    try {
      const { slot_image, slot_title, slot_area, slot_price } = req.body;
  
      // Get the Coldstore Admin ID from the token (assuming you have the ID stored in the token)
      const coldstoreAdminId = req.user._id;
  
      const slot = new Slot({
        slot_image,
        slot_title,
        slot_area,
        slot_price,
        slot_owner: coldstoreAdminId,
      });
  
      const savedSlot = await slot.save();
  
      if (savedSlot) {
        return res.status(201).json(savedSlot);
      } else {
        return res.status(500).json({ error: 'Failed to save the slot.' });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Route to list slots based on owner_id
router.get('/view_slots/:owner_id', async (req, res) => {
    const { owner_id } = req.params;
  
    try {
      // Find slots owned by the specified owner_id
      const slots = await Slot.find({ slot_owner: owner_id });
  
      // Send the slots data as a response
      res.status(200).json(slots);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Route for booking a slot
router.post('/book_slot/:user_id/:slot_id', protectedRoute2, async (req, res) => {
  try {
    const { user_id, slot_id } = req.params;

    // Check if the user is authorized (optional, based on your authentication logic)
    if (req.user._id.toString() !== user_id) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    // Find the slot by ID
    const slot = await Slot.findById(slot_id);

    // Check if the slot exists
    if (!slot) {
      return res.status(404).json({ error: 'Slot not found' });
    }

    // Check if the slot is already booked or pending
    if (slot.slot_status === 'occupied' || slot.slot_status === 'pending') {
      return res.status(400).json({ error: 'Slot is not available for booking' });
    }

    // Update booked_user with user_id and username
    slot.booked_user.user_id = user_id;
    slot.booked_user.username = req.user.firstName;

    // Change the slot_status to pending
    slot.slot_status = 'pending';

    // Save the updated slot
    const updatedSlot = await slot.save();

    res.status(200).json(updatedSlot);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/approve_slot/:slot_id', protectedRoute, async (req, res) => {
  try {
      const { slot_id } = req.params;

      // Find the slot by ID
      const slot = await Slot.findById(slot_id);

      // Check if the slot exists
      if (!slot) {
          return res.status(404).json({ error: 'Slot not found' });
      }

      // Check if the slot is already occupied or pending
      if (slot.slot_status === 'occupied' || slot.slot_status === 'empty') {
          return res.status(400).json({ error: 'Slot is not available for approval' });
      }

      // Change the slot_status to occupied
      slot.slot_status = 'occupied';

      // Save the updated slot
      const updatedSlot = await slot.save();

      res.status(200).json(updatedSlot);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
  }
});



// Add this route to your existing router

// Route for declining a slot
router.post('/decline_slot/:slot_id', protectedRoute, async (req, res) => {
  try {
    const { slot_id } = req.params;

    // Find the slot by ID
    const slot = await Slot.findById(slot_id);

    // Check if the slot exists
    if (!slot) {
      return res.status(404).json({ error: 'Slot not found' });
    }

    // Check if the slot is already occupied or empty
    if (slot.slot_status === 'pending' || slot.slot_status === 'empty') {
      return res.status(400).json({ error: 'Slot is not available for decline' });
    }

    // Remove the booked_user entry
    slot.booked_user = undefined;

    // Change the slot_status to empty
    slot.slot_status = 'empty';

    // Save the updated slot
    const updatedSlot = await slot.save();

    res.status(200).json(updatedSlot);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Route to get all slots
router.get('/all_slots', async (req, res) => {
  try {
    // Find all slots in the database
    const allSlots = await Slot.find();

    // Send the slots data as a response
    res.status(200).json(allSlots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

  
module.exports = router;


