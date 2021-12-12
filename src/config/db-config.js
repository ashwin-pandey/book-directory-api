const mongoose = require('mongoose');
const errorLog = require('../config/log-config').errorLogger;
const infoLog = require('../config/log-config').infoLogger;

const mongoUrl = process.env.MONGO_URL;

const connection = mongoose.connect(mongoUrl, { useNewUrlParser: true }, (error) => {
    if (error) {
        errorLog.error(`DB connection error: ${error}`);
    } else {
        infoLog.info(`Connected with database!`);
    }
});

module.exports = { connection };