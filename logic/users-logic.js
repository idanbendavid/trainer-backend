const usersDao = require("../dao/users-dao");
const userRole = require("../models/roles");
const cryptation = require("../middleware/crypto/crypto");
const jwtToken = require("../middleware/auth/token");
const ServerError = require("../middleware/errors/server-error");
const ErrorType = require("../middleware/errors/error-type");
const outgoingEmail = require("../middleware/emails/send-email");

// get list of all users
async function getUsers(role) {
    if (role !== userRole[1]) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }

    let getAllUsers = await usersDao.getUsers();
    return getAllUsers;
}

// login
async function login(loginDetails) {

    validateLoginEmailAndPassword(loginDetails);

    loginDetails.password = cryptation.hashPassword(loginDetails.password);

    let user = await usersDao.login(loginDetails);

    user.token = jwtToken.createToken(user);

    return user
}

// login validation
function validateLoginEmailAndPassword(loginDetails) {
    if (!loginDetails.email) {
        throw new ServerError(ErrorType.INVALID_EMAIL);
    }
    if (!loginDetails.password) {
        throw new ServerError(ErrorType.INVALID_PASSWORD);
    }
}

// register
async function addNewUser(newUser) {

    addUserValidation(newUser);

    let isEmailExist = await usersDao.isEmailExist(newUser.email);

    if (isEmailExist) {
        throw new ServerError(ErrorType.EMAIL_ALREADY_EXIST);
    }

    newUser.password = cryptation.hashPassword(newUser.password);

    let registerUser = await usersDao.addNewUser(newUser);

    let tokenDetails = {
        id: registerUser.insertId,
        firstName: newUser.firstName,
        birthDate: newUser.birthDate,
        userRole: newUser.userRole,
        lastName: newUser.lastName,
        email: newUser.email
    }
    newUser.id = registerUser.insertId;
    newUser.token = jwtToken.createToken(tokenDetails);

    if (newUser.token) {
        outgoingEmail.sendRegisterEmail(newUser.email);
    }
    return newUser;
}

// validation of add user
function addUserValidation(newUser) {
    if (!newUser.email) {
        throw new ServerError(ErrorType.INVALID_EMAIL);
    }
    if (!newUser.password) {
        throw new ServerError(ErrorType.INVALID_PASSWORD);
    }

    newUser.userRole = userRole[2]
}

// update user password
async function updateUserPassword(newUserPassword, email) {
    newPassword = cryptation.hashPassword(newUserPassword);

    let changedUserPassword = await usersDao.updateUserPassword(newPassword, email);

    if (changedUserPassword) {
        outgoingEmail.updateUserPassword(email);
    }
    return changedUserPassword;
}

async function checkEmailValidation(EmailValidition) {
    if (EmailValidition.includes('admin')) {
        throw new ServerError(ErrorType.UNAUTHORIZED)
    }

    checkEmail = await usersDao.checkEmailValidation(EmailValidition);
    return checkEmail;
}


module.exports = {
    getUsers,
    login,
    addNewUser,
    updateUserPassword,
    checkEmailValidation
}