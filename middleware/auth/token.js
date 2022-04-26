const jwt = require('jsonwebtoken');
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
const config = require("../../config.json");

function createToken(user) {

    if (!user) {
        throw new ServerError(ErrorType.FORBIDDEN)
    }

    const payload = {
        id: user.userId,
        first_name: user.firstName,
        birthDate: user.birthDate,
        role: user.userRole
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
        firstName: verify.first_name,
        birthDate: verify.birthDate,
        role: verify.role
    }

    return userDetails;
}

module.exports = {
    createToken,
    decodeToken
}
