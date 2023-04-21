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
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(newUser), error);
        // change error type
    }
    return createUser
}

// patch - edit user password
async function updateUserPassword(newUserPassword, email) {
    let sql = "UPDATE users SET password=? WHERE email=?";

    let parameters = [newUserPassword, email];

    let changedUserPassword;
    try {
        changedUserPassword = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.UPDATE_USER,JSON.stringify(email), error);
    }
    return changedUserPassword
}


// validate if email is exist  and get date of user
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

async function checkEmailValidation(email) {
    let sql = `SELECT email FROM users where email=?`;

    let parameters = [email];
    let checkEmail;
    try {
        checkEmail = await connection.executeWithParameters(sql, parameters);
        return checkEmail[0].email;
    }
    catch (error) {
        throw new ServerError(ErrorType.INVALID_EMAIL, error);
    }
}

module.exports = {
    getUsers,
    login,
    addNewUser,
    updateUserPassword,
    isEmailExist,
    checkEmailValidation
}