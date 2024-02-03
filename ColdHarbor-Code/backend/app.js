const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const {MONGO_DB_URL} = require('./config');
global.__basedir = __dirname;

mongoose.connect(MONGO_DB_URL);

mongoose.connection.on('connected', ()=>{
    console.log("Connected to Database successfully..!");
})

mongoose.connection.on('error', (error)=>{
    console.log("some error while connecting to Database!.");
})

app.use(cors());
app.use(express.json());

require('./models/user_model');
require('./models/slot_model');
app.use(require('./routes/user_route')); 
app.use(require('./routes/file_route'));
app.use(require('./routes/slot_route'));


// listening on the port 3000 while server is on,
app.listen(3001, () => {
    console.log("server started on port: 3001 --- [ok]!");
})