const userExercisesDao = require("../dao/user-exercises-dao");
const ServerError = require("../middleware/errors/server-error");
const ErrorType = require("../middleware/errors/error-type");

async function getExercisesOfUser(userId) {
    let userExercises = await userExercisesDao.getExercisesOfUser(userId);
    return userExercises;
}

async function userAcquiresExercise(userId, newExercise, exerciseDate) {
    let addExerciseToUser = await userExercisesDao.userAcquiresExercise(userId, newExercise, exerciseDate);
    return addExerciseToUser;
}

async function changeExerciseDate(userId, exerciseId, exerciseDate) {
    let updatedExerciseDate = await userExercisesDao.changeExerciseDate(userId, exerciseId, exerciseDate);
    return updatedExerciseDate;
}


async function deleteOneExerciseOfUser(userId, exerciseId) {
    let removeOneExerciseOfUser = await userExercisesDao.deleteOneExerciseOfUser(userId, exerciseId);
    return removeOneExerciseOfUser;
}

async function deleteAllUserExercises(userId) {
    let deleteAllExercisesOfUser = await userExercisesDao.deleteAllUserExercises(userId);
    return deleteAllExercisesOfUser;
}


module.exports = {
    getExercisesOfUser,
    userAcquiresExercise,
    changeExerciseDate,
    deleteOneExerciseOfUser,
    deleteAllUserExercises
}