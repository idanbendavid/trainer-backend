const userExercisesDao = require("../dao/users-exercises-dao");
const ServerError = require("../middleware/errors/server-error");
const ErrorType = require("../middleware/errors/error-type");

async function getExercisesOfUser(userId) {
    if(typeof userId !== "number"){
        throw new ServerError(ErrorType.UNAUTHORIZED, error)
    }

    let userExercises = await userExercisesDao.getExercisesOfUser(userId);
    return userExercises;
}

async function getExercisesForContest() {
    let exerciseForContest = await userExercisesDao.getExercisesForContest();
    return exerciseForContest;
}

async function addUserExercise(userId, userExerciseDetails) {
    if(typeof userId !== "number"){
        throw ServerError(ErrorType.UNAUTHORIZED, error)
    }
    let addExerciseToUser = await userExercisesDao.addUserExercise(userId, userExerciseDetails);  
    return addExerciseToUser;
}

// activate function if the date is the first of the month
async function deleteExercises() {
    let date = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    
    if(firstDay.toString() === date.toString()) {
        let deleteOldExercises = await userExercisesDao.deleteExercises();
        return deleteOldExercises;
    }
    else{
        throw new ServerError(ErrorType.FORBIDDEN, error)
    }
}



module.exports = {
    getExercisesOfUser,
    addUserExercise,
    getExercisesForContest,
    deleteExercises,
}