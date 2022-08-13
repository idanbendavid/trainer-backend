const express = require("express");
const router = express.Router();
const userExercisesLogic = require("../logic/user-exercises-logic");
const jwtToken = require("../middleware/auth/token")

// get exercises of user by user id
router.get("/exercisesOfUser", async (request, response, next) => {

    let userId = jwtToken.decodeToken(request.headers.authorization).userId;
    try {
        let userExercises = await userExercisesLogic.getExercisesOfUser(userId);
        response.json(userExercises);
    }
    catch (error) {
        return next(error);
    }
})

// add exercise to user 
router.post("/addExercise", async (request, response, next) => {

    let userId = jwtToken.decodeToken(request.headers.authorization).userId;
    let newExercise = request.body.newExercise;
    let exerciseDate = request.body.fixedDate;
    try {
        let addExercisesToUser = await userExercisesLogic.userAcquiresExercise(userId, newExercise, exerciseDate);
        response.json(addExercisesToUser);
    }
    catch (error) {
        return next(error);
    }
})

// change date of exercise by user id and exercise id
router.patch("/:exerciseId", async (request, response, next) => {

    let userId = jwtToken.decodeToken(request.headers.authorization).userId;
    let exerciseId = request.params.exerciseId;
    let exerciseDate = request.body.exerciseDate;

    try {
        let updatedExerciseDate = await userExercisesLogic.changeExerciseDate(userId, exerciseId, exerciseDate);
        response.json(updatedExerciseDate);
    }
    catch (error) {
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
        return next(error);
    }
})

// delete all user exercises
router.delete("/deleteAllUserExercises", async (request, response, next) => {

    let userId = jwtToken.decodeToken(request.headers.authorization).userId;

    try {
        let deleteAllExercisesOfUser = await userExercisesLogic.deleteAllUserExercises(userId);
        response.json(deleteAllExercisesOfUser);
    }
    catch (error) {
        return next(error);
    }
})

module.exports = router;