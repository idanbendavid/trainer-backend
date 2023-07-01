const express = require("express");
const router = express.Router();
const usersLogic = require("../logic/users-logic");
const jwtToken = require("../middleware/auth/token");

// get list of all users
router.get("/allUsers", async (request, response, next) => {

    let role = jwtToken.decodeToken(request.headers.authorization).userRole;
    let getAllUsers;

    try {
        getAllUsers = await usersLogic.getUsers(role);
        response.json(getAllUsers)
    }
    catch (error) {
        return next(error);
    }
})

// for surviving refresh
router.get("/verify_token", (request, response, next) => {

    let token = request.headers.authorization;

    let userDetails
    try {
        userDetails = jwtToken.decodeToken(token);
        response.json(userDetails);
    }
    catch (error) {
        return next(error)
    }
})

// login
router.post("/login", async (request, response, next) => {

    let loginDetails = request.body;

    try {
        let userLogin = await usersLogic.login(loginDetails);
        response.json(userLogin);
    }
    catch (error) {
        return next(error);
    }
})

// register
router.post("/register", async (request, response, next) => {

    let newUser = request.body;

    try {
        let registerUser = await usersLogic.addNewUser(newUser);
        response.json(registerUser);
    }
    catch (error) {
        return next(error);
    }
})


// update user password
router.put("/", async (request, response, next) => {

    let newUserPassword = request.body.newPassword;
    let email = request.body.email;

    try {
        let changedUserPassword = await usersLogic.updateUserPassword(newUserPassword, email);
        response.json(changedUserPassword);
    }
    catch (error) {
        return next(error);
    }
})

router.patch("/checkEmail", async (request, response, next) => {

    let EmailValidition = request.body.checkEmail;

    try {
        checkEmail = await usersLogic.checkEmailValidation(EmailValidition);
        response.json(checkEmail)
    }
    catch (error) {
        return next(error);
    }
})


module.exports = router;