const { json } = require("express");

class BadRequestException extends Error {
    constructor(userMessage, developerMessage) {
        super(userMessage, developerMessage);
        this.status = 400;
        this.userMessage = userMessage;
        this.developerMessage = developerMessage;
    }
}

class NotFoundException extends Error {
    constructor(userMessage){
        super(userMessage);
        this.status = 404;
        this.userMessage = userMessage;
    };
}

module.exports = {
    BadRequestException,
    NotFoundException
};