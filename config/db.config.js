const mongoose = require('mongoose');

const mongoUrl = process.env.MONGODB_URL;

const connection = mongoose.connect(mongoUrl, { useNewUrlParser: true }, (error) => {
    if (error) {
        console.log(`DB connection error: ${error}`);
    } else {
        console.log(`Connected with database!`);
    }
});

module.exports = { connection };