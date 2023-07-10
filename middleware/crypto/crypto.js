const crypto = require("node:crypto");
const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");

const saltRight = "gjhasodjfhsdijhlDJBbhjohavpwl";
const saltLeft = ";@!$--mnlcfsjlbhda;kjhu1y27912y79";


function hashPassword(password) {

    if (!password) {
        throw new ServerError(ErrorType.INVALID_PASSWORD)
    }

    let hashedPassword = crypto.createHash("md5").update(saltLeft + password + saltRight).digest("hex");

    return hashedPassword;
}

module.exports = {
    hashPassword
};

