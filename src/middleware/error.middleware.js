const { json } = require("express");

const BadRequestException = (userMessage, developerMessage) => {
    return JSON.stringify({
        "status": 400,
        "userMessage": userMessage,
        "developerMessage": developerMessage
    });
};

const NotFoundException = (userMessage) => {
    return JSON.stringify({
        "status": 404,
        "userMessage": userMessage,
    });
}

module.exports = {
    BadRequestException,
    NotFoundException
};
