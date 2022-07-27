const express = require("express");
const router = express.Router();
const userPracticesLogic = require("../logic/user-practices-logic");
const jwtToken = require("../middleware/auth/token")

// get practices of user by user id
router.get("/practicesOfUser", async (request, response, next) => {

    let userId = jwtToken.decodeToken(request.headers.authorization).userId;

    try {
        let userPractices = await userPracticesLogic.getPracticesOfUser(userId);
        response.json(userPractices);
    }
    catch (error) {
        return next(error);
    }
})

// add practice to user 
router.post("/addPractice", async (request, response, next) => {

    let userId = jwtToken.decodeToken(request.headers.authorization).userId;
    let newPractice = request.body;

    try {
        let addPracticeToUser = await userPracticesLogic.userAcquiresPractice(userId, newPractice);
        response.json(addPracticeToUser);
    }
    catch (error) {
        return next(error);
    }
})

// change date of practice by user id and practice id
router.patch("/:practiceId", async (request, response, next) => {

    let userId = jwtToken.decodeToken(request.headers.authorization).userId;
    let practiceId = request.params.practiceId;
    let practiceDate = request.body.practiceDate;

    try {
        let updatedPracticeDate = await userPracticesLogic.changePracticeDate(userId, practiceId, practiceDate);
        response.json(updatedPracticeDate);
    }
    catch (error) {
        return next(error);
    }
})


// delete one practice
router.delete("/deletePractice/:practiceId", async (request, response, next) => {

    let userId = jwtToken.decodeToken(request.headers.authorization).userId;
    let practiceId = request.params.practiceId;

    try {
        let removeOnePracticeOfUser = await userPracticesLogic.deleteOnePracticeOfUser(userId, practiceId);
        response.json(removeOnePracticeOfUser);
    }
    catch (error) {
        return next(error);
    }
})

// delete all user practices
router.delete("/deleteAllUserPractices", async (request, response, next) => {

    let userId = jwtToken.decodeToken(request.headers.authorization).userId;

    try {
        let deleteAllPracticesOfUser = await userPracticesLogic.deleteAllUserPractices(userId);
        response.json(deleteAllPracticesOfUser);
    }
    catch (error) {
        return next(error);
    }
})

module.exports = router;