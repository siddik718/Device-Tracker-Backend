
const mongoose = require('mongoose');
const { DBURL } = require('../secret');


const connectToDatabase = async() => {
    try {
        await mongoose.connect(DBURL);
        console.log("Database Connected");
    }catch(error) {
        console.error(error);
    }
}

module.exports = connectToDatabase;