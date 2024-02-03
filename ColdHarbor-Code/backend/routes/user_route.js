const express = require('express');
const multer = require('multer');
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const ColdStoreAdmin = mongoose.model("ColdStoreAdmin");
const FarmerAdmin = mongoose.model("FarmerAdmin");

const { JWT_SECRET } = require('../config');
const protectedRoute = require("../middleware/protectedResourceColdStoreAdmin");


// let's retrieve the all users data and print it on '/cold_store_usr_signup' route on browser
router.get('/cold_store_usr_signup', async (req, res) => {
    // console.log(ColdStoreAdmin.find());

    const query = ColdStoreAdmin.find({});

    // Execute the query and handle the results using Promises or async/await
    query
        .then(coldstoreadmins => {
            // Print or use the retrieved data as needed
            console.log('All entries in coldstoreadmins:', coldstoreadmins);
            res.send(coldstoreadmins);
        })
        .catch(err => {
            console.error('Error:', err);
        })
        .finally(() => {
            // mongoose.connection.close();
            console.log("finally block...");
        });

})

// let's retrieve the all users data and print it on '/cold_store_usr_signup' route on browser
router.get('/farmer_signup', async (req, res) => {
    // console.log(ColdStoreAdmin.find());

    const query = FarmerAdmin.find({});

    // Execute the query and handle the results using Promises or async/await
    query
        .then(farmeradmins => {
            // Print or use the retrieved data as needed
            console.log('All entries in coldstoreadmins:', farmeradmins);
            res.send(farmeradmins);
        })
        .catch(err => {
            console.error('Error:', err);
        })
        .finally(() => {
            // mongoose.connection.close();
            console.log("finally block...");
        });

})






// User Signup Routes
router.post("/cld_str_signup", (req, res) => {
    const { cld_str_name, state, district, mandal, email, phno, password } = req.body;
    if (!cld_str_name || !state || !district || !mandal || !email || !phno || !password) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }
    ColdStoreAdmin.findOne({ email: email })
        .then((userInDB) => {
            if (userInDB) {
                return res.status(500).json({ error: "User with this email already registered" });
            }
            bcryptjs.hash(password, 16)
                .then((hashedPassword) => {
                    const user = new ColdStoreAdmin({ cld_str_name, state, district, mandal, email, phno, password: hashedPassword });
                    user.save()
                        .then((newUser) => {
                            res.status(201).json({ result: "User Signed up Successfully!" });
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }).catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        })
});
router.post("/farmer_signup", (req, res) => {
    const { firstName, lastName, email, phno, password } = req.body;
    if (!firstName || !lastName || !password || !email || !phno) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }
    FarmerAdmin.findOne({ email: email })
        .then((userInDB) => {
            if (userInDB) {
                return res.status(500).json({ error: "User with this email already registered" });
            }
            bcryptjs.hash(password, 16)
                .then((hashedPassword) => {
                    const user = new FarmerAdmin({ firstName, lastName, email, phno, password: hashedPassword });
                    user.save()
                        .then((newUser) => {
                            res.status(201).json({ result: "User Signed up Successfully!" });
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }).catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        })
});




// User Login Routes
router.post("/cld_str_login", (req, res) => {
    const { email, password } = req.body;
    if (!password || !email) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }
    ColdStoreAdmin.findOne({ email: email })
        .then((userInDB) => {
            if (!userInDB) {
                return res.status(401).json({ error: "Invalid Credentials" });
            }
            bcryptjs.compare(password, userInDB.password)
                .then((didMatch) => {
                    if (didMatch) {
                        const jwtToken = jwt.sign({ _id: userInDB._id }, JWT_SECRET);
                        const userInfo = { "_id": userInDB._id, "email": userInDB.email, "cld_str_name": userInDB.cld_str_name, "user_type": "cld_str" };
                        res.status(200).json({ result: { token: jwtToken, user: userInfo } });
                    } else {
                        return res.status(401).json({ error: "Invalid Credentials" });
                    }
                }).catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        })
});


router.post("/farmer_login", (req, res) => {
    const { email, password } = req.body;
    if (!password || !email) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }
    FarmerAdmin.findOne({ email: email })
        .then((userInDB) => {
            if (!userInDB) {
                return res.status(401).json({ error: "Invalid Credentials" });
            }
            bcryptjs.compare(password, userInDB.password)
                .then((didMatch) => {
                    if (didMatch) {
                        const jwtToken = jwt.sign({ _id: userInDB._id }, JWT_SECRET);
                        const userInfo = { "_id": userInDB._id, "email": userInDB.email, "firstName": userInDB.firstName, "user_type": "farmer" };
                        res.status(200).json({ result: { token: jwtToken, user: userInfo } });
                    } else {
                        return res.status(401).json({ error: "Invalid Credentials" });
                    }
                }).catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        })
});



// Define a route to get the currently logged-in user's details
router.get('/cldStrAdminInfo', protectedRoute, (req, res) => {
    // req.user contains the details of the logged-in user
    const currentUser = req.user;

    if (currentUser) {
        // Return the user details
        res.status(200).json(currentUser);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

router.get('/coldstore_admin/:admin_id', async (req, res) => {
    const adminId = req.params.admin_id;

    try {
        // Find the ColdStore Admin by their admin_id
        const coldstoreAdmin = await ColdStoreAdmin.findById(adminId);

        if (!coldstoreAdmin) {
            return res.status(404).json({ message: 'ColdStore Admin not found' });
        }

        // Return the ColdStore Admin details
        res.status(200).json(coldstoreAdmin);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.post('/bannerUpload/:user_id', protectedRoute, async (req, res) => {
    const userId = req.params.user_id;
    const bannerImageUrl = req.body.image; // Use 'image' as the property to get the image path

    try {
        const updatedUser = await ColdStoreAdmin.findByIdAndUpdate(
            userId,
            { bannerImage: bannerImageUrl },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/bannerProfileImage/:user_id', protectedRoute, async (req, res) => {
    const userId = req.params.user_id;
    const profileImageUrl = req.body.image; // Use 'image' as the property to get the image path

    try {
        const updatedUser = await ColdStoreAdmin.findByIdAndUpdate(
            userId,
            { profileImage: profileImageUrl },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// PUT route to update cold store admin information
router.put('/edit_cld_str_info/:id', protectedRoute, async (req, res) => {
    const { id } = req.params;

    try {
        // Find the cold store admin by ID
        const admin = await ColdStoreAdmin.findById(id);

        if (!admin) {
            return res.status(404).json({ error: 'Cold store admin not found' });
        }

        // Update the fields you want to modify
        if (req.body.cld_str_name) {
            admin.cld_str_name = req.body.cld_str_name;
        }
        if (req.body.phno) {
            admin.phno = req.body.phno;
        }
        if (req.body.description) {
            admin.description = req.body.description;
        }
        if (req.body.address) {
            admin.address = req.body.address;
        }


        // Save the updated information
        await admin.save();

        return res.status(200).json({ message: 'Cold store admin information updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


// Define a route to get all cold storage details
router.get('/all_cold_storages', async (req, res) => {
    try {
        const coldStorages = await ColdStoreAdmin.find({}).exec();
        
        if (!coldStorages || coldStorages.length === 0) {
            return res.status(404).json({ message: 'No cold storages found' });
        }

        res.status(200).json(coldStorages);
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/all_cold_storages/:mandal', async (req, res) => {
    const mandal = req.params.mandal; // Get the mandal parameter from the URL

    try {
        // Find all cold storages that belong to the specified mandal
        const coldStorages = await ColdStoreAdmin.find({ mandal: mandal }).exec();

        if (!coldStorages || coldStorages.length === 0) {
            return res.status(404).json({ message: 'No cold storages found for the specified mandal' });
        }

        res.status(200).json(coldStorages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router;