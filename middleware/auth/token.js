const jwt = require('jsonwebtoken');
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
const config = require("../../config.json");

function createToken(user) {

    if (!user) {
        throw new ServerError(ErrorType.FORBIDDEN)
    }

    const payload = {
        id: user.id,
        firstNme: user.firstName,
        lastName: user.lastName,
        userRole: user.userRole,
        birthDate: user.birthDate,
        email: user.email
    };
    let token = "Bearer " + jwt.sign(payload, config.secret);

    return token;
}

function decodeToken(token) {
    if (!token) {
        throw new ServerError(ErrorType.UNAUTHORIZED)
    }

    token = token.split(" ")[1];

    let verify = jwt.verify(token, config.secret);

    let userDetails = {
        id: verify.id,
        firstName: verify.firstNme,
        lastName: verify.lastName,
        userRole: verify.userRole,
        birthDate: verify.birthDate,
        email: verify.email
    }

    return userDetails;
}

module.exports = {
    createToken,
    decodeToken
}
