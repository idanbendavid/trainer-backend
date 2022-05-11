const uuid = require("uuid");
const usersDao = require("../dao/users-dao");
const userPracticesDao = require("../dao/user-practices-dao");
const coachDao = require("../dao/coach-dao");
const userRole = require("../models/roles");
const cryptation = require("../middleware/crypto/crypto");
const jwtToken = require("../middleware/auth/token");
const ServerError = require("../middleware/errors/server-error");
const ErrorType = require("../middleware/errors/error-type");
const email = require("../middleware/emails/send-email");


// get list of all users
async function getUsers(role) {
    if (role !== userRole[1]) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }

    getAllUsers = await usersDao.getUsers();
    return getAllUsers;
}

// get details of user by id
async function getDetailsOfUserById(userId) {
    getUserById = await usersDao.getDetailsOfUserById(userId);
    return getUserById;
}

// login
async function login(loginDetails) {

    validateLoginEmailAndPassword(loginDetails);

    loginDetails.password = cryptation.hashPassword(loginDetails.password);

    loginDetails = await usersDao.login(loginDetails);

    let token = jwtToken.createToken(loginDetails);

    let coachId;

    // if the user is a coach
    if (loginDetails.userRole === userRole[2]) {
        // get his coach id
        coachId = await coachDao.getCoachId(loginDetails.userId);
        return { token: token, loginDetails, coachId }
    }
    // if the user is not a coach
    else {
        return { token: token, loginDetails }
    }
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

    let isEmailExist = await usersDao.isEmailExist(newUser);

    if (isEmailExist) {
        throw new ServerError(ErrorType.EMAIL_ALREADY_EXIST);
    }

    newUser.password = cryptation.hashPassword(newUser.password);

    let registerUser = await usersDao.addNewUser(newUser);

    let newCoach;

    if (registerUser) {
        // if the registraition was completed
        if (newUser.userRole === userRole[2]) {
            // and if the role of the user is coach
            let coachId = uuid.v4();
            // create a uuid based coach id
            newCoach = await coachDao.addCoach(coachId, registerUser.insertId, newUser.firstName, newUser.lastName);
            // and add him to coaches table
        }
    }

    let tokenDetails = {
        userId: registerUser.insertId,
        firstName: newUser.firstName,
        birthDate: newUser.birthDate,
        userRole: newUser.userRole,
        lastName: newUser.lastName
    }

    let token = jwtToken.createToken(tokenDetails);

    email.sendRegisterEmail(newUser.email);
    
    return { token, newUser, registerUser, newCoach };
}

// validation of add user
function addUserValidation(newUser) {
    if (!newUser.email) {
        throw new ServerError(ErrorType.INVALID_EMAIL);
    }
    if (!newUser.password) {
        throw new ServerError(ErrorType.INVALID_PASSWORD);
    }

    // validate user role
    if (newUser.user_role === userRole[1]) {
        throw new ServerError(ErrorType.FORBIDDEN);
    }
}

// update user email
async function updateUserEmail(newUserEmail, userId, role) {
    let isEmailExist = await usersDao.isEmailExist(newUserEmail);

    if (isEmailExist) {
        throw new ServerError(ErrorType.EMAIL_ALREADY_EXIST);
    }

    if (role === userRole[1]) {
        throw new ServerError(ErrorType.FORBIDDEN);
    }

    let changedUserEmail = await usersDao.updateUserEmail(newUserEmail, userId);

    return changedUserEmail;
}

// update user password
async function updateUserPassword(newUserPassword, userId) {

    updateUser.password = cryptation.hashPassword(newUserPassword);

    let changedUserPassword = await usersDao.updateUserPassword(newUserPassword, userId);

    return changedUserPassword;
}

// delete user
async function deleteUser(userId, adminVerification) {

    deleteUserValidation(userId, adminVerification);

    let removeUser = {
        removePracticesOfUser: await userPracticesDao.deleteAllUserPractices(userId),
        goodbeyUser: await usersDao.deleteUser(userId)
    };

    return removeUser;
}

function deleteUserValidation(userId, adminVerification) {
    // check if the admin is making delete request
    if (adminVerification !== userRole[1]) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }

    // if the id of the user we want to delete does not exists
    if (!userId) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }

    // if user to delete is the admin or the recieved id is anything but number
    if (userId == 1 || isNaN(userId) === true) {
        throw new ServerError(ErrorType.FORBIDDEN);
    }
}

// delete user who is coach
async function deleteCoach(userId, adminVerification, coachId) {

    deleteCoachValidation(userId, adminVerification, coachId);

    let removeCoach = {
        unassignCoach: await userPracticesDao.unassignCoachFromUserPractice(coachId),
        deleteCoach: await coachDao.deleteCoach(userId),
        finalUserDeletion: await usersDao.deleteUser(userId)
    }

    return removeCoach;
}

function deleteCoachValidation(userId, adminVerification, coachId) {
    if (adminVerification !== userRole[1]) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }

    if (!userId) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }

    if (userId == 1 || isNaN(userId) === true) {
        throw new ServerError(ErrorType.FORBIDDEN);
    }

    if (!uuid.validate(coachId)) {
        throw new ServerError(ErrorType.INVALID_COACH);
    }
}


module.exports = {
    getUsers,
    getDetailsOfUserById,
    login,
    addNewUser,
    updateUserEmail,
    updateUserPassword,
    deleteUser,
    deleteCoach
}