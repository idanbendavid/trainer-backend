const connection = require("../db/connection-wrapper");
const ErrorType = require("../middleware/errors/error-type");
const ServerError = require("../middleware/errors/server-error");
const nodemailer = require("nodemailer");

// get
async function getUsers() {
    let sql = `SELECT id, first_name, last_name, birth_date, user_role, email FROM users where user_role NOT LIKE '%admin%'`;

    let getAllUsers;
    try {
        getAllUsers = await connection.execute(sql);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
        // change error type
    }
    return getAllUsers
}

// get details of user by id
async function getDetailsOfUserById(userId) {
    let sql = "SELECT * FROM users WHERE id=?";

    let parameters = [userId]

    let detailsOfSpecificUser;
    try {
        detailsOfSpecificUser = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
    return detailsOfSpecificUser
}

// post - login
async function login(user) {
    let sql = "SELECT * FROM users WHERE email =? AND password =?";

    let parameters = [user.email, user.password];

    let usersLoginResult;
    try {
        usersLoginResult = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), error);
    }

    if (usersLoginResult === null || usersLoginResult.length === 0) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }

    console.log("user is connected");

    let loggedIn = {
        email: usersLoginResult[0].email,
        userId: usersLoginResult[0].id,
        userRole: usersLoginResult[0].user_role,
        firstName: usersLoginResult[0].first_name,
        lastName: usersLoginResult[0].last_name,
        birthDate: usersLoginResult[0].birth_date
    }

    return loggedIn;
}

// post - register
async function addNewUser(newUser) {
    let sql = "INSERT INTO users (first_name,last_name,birth_date,user_role,email,password) VALUES(?,?,?,?,?,?)";

    let parameters = [newUser.firstName, newUser.lastName, newUser.birthDate,
    newUser.userRole, newUser.email, newUser.password];

    let createUser;

    try {
        createUser = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
        // change error type
    }
    return createUser
}

// patch - edit user email
async function updateUserEmail(newUserEmail, userId) {
    let sql = "UPDATE users SET email=? WHERE id=?";

    let parameters = [newUserEmail, userId];

    let changedUserEmail;
    try {
        changedUserEmail = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.UPDATE_USER, error);
    }
    return changedUserEmail
}

// patch - edit user password
async function updateUserPassword(newUserPassword, userId) {
    let sql = "UPDATE users SET password=? WHERE id=?";

    let parameters = [newUserPassword, userId];

    let changedUserPassword;
    try {
        changedUserPassword = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.UPDATE_USER, error);
    }
    return changedUserPassword
}


// validate if email is exist 
async function isEmailExist(email) {

    let sql = "SELECT * FROM users WHERE email=?";

    let parameters = [email];

    let emailValidationResult;

    try {
        emailValidationResult = await connection.executeWithParameters(sql, parameters);
        return emailValidationResult[0];
    }
    catch (error) {
        throw new ServerError(ErrorType.EMAIL_ALREADY_EXIST, error);
    }
}

// delete user
async function deleteUser(userId) {
    let sql = "DELETE FROM users WHERE id=?";

    let parameters = [userId];

    let deleteSpecificUser;

    try {
        deleteSpecificUser = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
    return deleteSpecificUser
}


module.exports = {
    getUsers,
    getDetailsOfUserById,
    login,
    addNewUser,
    updateUserEmail,
    updateUserPassword,
    isEmailExist,
    deleteUser
}