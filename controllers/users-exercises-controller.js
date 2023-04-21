const express = require("express");
const router = express.Router();
const userExercisesLogic = require("../logic/users-exercises-logic");
const jwtToken = require("../middleware/auth/token");


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

router.get("/contest", async (request, response, next) => {

    try {
        let exerciseForContest = await userExercisesLogic.getExercisesForContest();
        response.json(exerciseForContest);
    }
    catch (error) {
        return next(error);
    }
})

// add exercise to user 
router.post("/addExercise", async (request, response, next) => {

    let userId = jwtToken.decodeToken(request.headers.authorization).userId;
    let userExerciseDetails = request.body;

    try {
        let addExercisesToUser = await userExercisesLogic.addUserExercise(userId, userExerciseDetails);
        response.json(addExercisesToUser);
    }
    catch (error) {
        return next(error);
    }
})

// delete exercises 
router.delete("/deleteExercise", async (request, response, next) => {
    try {
        let removeOneExerciseOfUser = await userExercisesLogic.deleteExercises();
        response.json(removeOneExerciseOfUser);
    }
    catch (error) {
        return next(error);
    }
})



module.exports = router;