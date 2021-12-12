const express = require('express');
const app = express();
require('dotenv').config({path: __dirname + '/.env'});
require('./config/db-config');
const errorLog = require('./config/log-config').errorLogger;
const infoLog = require('./config/log-config').infoLogger;

const { connection } = require('./config/db-config');

const { BookRoutes } = require('./controller/book.controller');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* CORS HEADER MIDDLEWARE */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", `${process.env.FRONT_END_URI}`);
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/**
 * ROUTE HANDLERS
 */

/* BOOKS ROUTE */
app.use('/', BookRoutes);

/* START THE SERVER */
const port = process.env.PORT;
app.listen(port, (error) => {
    if (error) {
        errorLog.error(`Error listening on port ${port} - ${error}`);
    } else {
        infoLog.info(`Listening on port ${port}`);
    }
});