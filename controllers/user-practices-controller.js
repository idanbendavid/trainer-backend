const express = require("express");
const router = express.Router();
const userPracticesLogic = require("../logic/user-practices-logic");
const jwtToken = require("../middleware/auth/token")

// get practices of user by user id
router.get("/practicesOfUser", async (request, response, next) => {

    let userId = jwtToken.decodeToken(request.headers.authorization).id;

    try {
        let userPractices = await userPracticesLogic.getPracticesOfUser(userId);
        response.json(userPractices);
    }
    catch (error) {
        return next(error);
    }
})

// add practice to user 
router.post("/:practiceId", async (request, response, next) => {

    let userId = jwtToken.decodeToken(request.headers.authorization).id;
    let practiceId = request.params.practiceId;
    let coachId = request.body.coachId;
    let practiceDate = request.body.practiceDate;

    try {
        let addPracticeToUser = await userPracticesLogic.userAcquiresPractice(userId, practiceId, coachId, practiceDate);
        response.json(addPracticeToUser);
    }
    catch (error) {
        return next(error);
    }
})

// change date of practice by user id and practice id
router.patch("/:practiceId", async (request, response, next) => {

    let practiceDate = request.body.practiceDate;
    let userId = jwtToken.decodeToken(request.headers.authorization).id;
    let practiceId = request.params.practiceId;

    try {
        let newPracticeDate = await userPracticesLogic.changePracticeDate(practiceDate, userId, practiceId);
        response.json(newPracticeDate);
    }
    catch (error) {
        return next(error);
    }
})

// add coach to user practice
router.put("/:practiceId", async (request, response, next) => {

    let userId = jwtToken.decodeToken(request.headers.authorization).id;
    let practiceId = request.params.practiceId;
    let coachId = request.body.coachId;

    try {
        let addCoachToOneUserPractice = await userPracticesLogic.assignCoachToAUserSpecificPractice(coachId, userId, practiceId);
        response.json(addCoachToOneUserPractice);
    }
    catch (error) {
        return next(error);
    }
})

// add coach to all user practices
router.put("/", async (request, response, next) => {

    let userId = jwtToken.decodeToken(request.headers.authorization).id;
    let coachId = request.body.coachId;

    try {
        let addCoachToAllUserPractice = await userPracticesLogic.assignCoachToAllUserPractices(coachId, userId);
        response.json(addCoachToAllUserPractice);
    }
    catch (error) {
        return next(error);
    }
})

// delete one practice
router.delete("/onePracticeOfUser/:practiceId", async (request, response, next) => {

    let userId = jwtToken.decodeToken(request.headers.authorization).id;
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
router.delete("/allUserPractices", async (request, response, next) => {

    let userId = jwtToken.decodeToken(request.headers.authorization).id;

    try {
        let deleteAllPracticesOfUser = await userPracticesLogic.deleteAllUserPractices(userId);
        response.json(deleteAllPracticesOfUser);
    }
    catch (error) {
        return next(error);
    }
})

module.exports = router;