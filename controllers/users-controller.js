const express = require("express");
const router = express.Router();
const usersLogic = require("../logic/users-logic");
const jwtToken = require("../middleware/auth/token")

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

// get details of user by id => using token not query 
router.get("/specificUser", async (request, response, next) => {

    let userId = jwtToken.decodeToken(request.headers.authorization).userId;

    try {
        userId = await usersLogic.getDetailsOfUserById(userId);
        response.json(userId)
    }
    catch (error) {
        return next(error);
    }
})

// for surviving refresh
router.get("/verify_token", (request, response, next) => {

    let token = request.headers.authorization

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

// update user email
router.patch("/changeEmail", async (request, response, next) => {

    let userId = jwtToken.decodeToken(request.headers.authorization).userId;
    let role = jwtToken.decodeToken(request.headers.authorization).userRole;
    let newUserEmail = request.body.newUserEmail;

    try {
        let changedUserEmail = await usersLogic.updateUserEmail(newUserEmail, userId, role);
        response.json(changedUserEmail);
    }
    catch (error) {
        return next(error);
    }
})

// update user password
router.patch("/", async (request, response, next) => {

    let userId = jwtToken.decodeToken(request.headers.authorization).id;
    let newUserPassword = request.body;

    try {
        let changedUserPassword = await usersLogic.updateUserPassword(newUserPassword, userId);
        response.json(changedUserPassword);
    }
    catch (error) {
        return next(error);
    }
})

// delete user - only admin can delete user
router.delete("/:userId", async (request, response, next) => {

    let userId = request.params.userId;

    let adminVerification = jwtToken.decodeToken(request.headers.authorization).userRole;

    try {
        let removeUser = await usersLogic.deleteUser(userId, adminVerification);
        response.json(removeUser);
    }
    catch (error) {
        return next(error);
    }
})

// delete coach
router.delete("/:userId/:coachId", async (request, response, next) => {

    let userId = request.params.userId;
    let coachId = request.params.coachId;

    let adminVerification = jwtToken.decodeToken(request.headers.authorization).userRole;

    try {
        let removeCoach = await usersLogic.deleteCoach(userId, adminVerification, coachId);
        response.json(removeCoach);
    }
    catch (error) {
        return next(error);
    }
})


module.exports = router;