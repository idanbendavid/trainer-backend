const express = require("express");
const router = express.Router();
const userExercisesLogic = require("../logic/user-exercises-logic");
const jwtToken = require("../middleware/auth/token");
const developmentLogger = require("../middleware/logger/dev-logger");


// get exercises of user by user id
router.get("/exercisesOfUser", async (request, response, next) => {

    let userId = jwtToken.decodeToken(request.headers.authorization).userId;
    try {
        let userExercises = await userExercisesLogic.getExercisesOfUser(userId);
        response.json(userExercises);
    }
    catch (error) {
        developmentLogger().error(error.errorType)
        return next(error);
    }
})

router.get("/amountOfExercises", async (request, response, next) => {

    let userId = jwtToken.decodeToken(request.headers.authorization).userId;

    try {
        let exercisesPerDate = await userExercisesLogic.getAmountOfExercisesPerDateForUser(userId);
        response.json(exercisesPerDate);
    }
    catch (error) {
        developmentLogger().error(error.errorType)
        return next(error);
    }
})

// add exercise to user 
router.post("/addExercise", async (request, response, next) => {

    let userId = jwtToken.decodeToken(request.headers.authorization).userId;
    let newExercise = request.body.newExercise;
    let exerciseDate = request.body.changedDate;
    let exercisesStatus = request.body.completed;

    try {
        let addExercisesToUser = await userExercisesLogic.userAcquiresExercise(userId, newExercise, exerciseDate, exercisesStatus);
        response.json(addExercisesToUser);
    }
    catch (error) {
        developmentLogger().error(error.errorType)
        return next(error);
    }
})

// delete one exercises
router.delete("/deleteExercise/:exerciseId", async (request, response, next) => {

    let userId = jwtToken.decodeToken(request.headers.authorization).userId;
    let exerciseId = request.params.exerciseId;

    try {
        let removeOneExerciseOfUser = await userExercisesLogic.deleteOneExerciseOfUser(userId, exerciseId);
        response.json(removeOneExerciseOfUser);
    }
    catch (error) {
        developmentLogger().error(error.errorType)
        return next(error);
    }
})



module.exports = router;