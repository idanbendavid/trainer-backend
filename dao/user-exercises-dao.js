const connection = require("../db/connection-wrapper");
const ErrorType = require("../middleware/errors/error-type");
const ServerError = require("../middleware/errors/server-error");

// get exercises of user by user id
async function getExercisesOfUser(userId) {
    let sql = `SELECT ue.exercise_id, ue.name, ue.bodyPart, ue.equipment, ue.gifUrl,
    ue.target, ue.exerciseDate FROM users u 
    LEFT JOIN users_exercices ue 
    ON u.id = ue.user_id
    WHERE ue.user_id=?`;

    let parameters = [userId];

    let userExercises;
    try {
        userExercises = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
    return userExercises;
}


// add exercise to user 
async function userAcquiresExercise(userId, newExercise, exerciseDate) {
    let sql = `INSERT INTO users_exercices(user_id,exercise_id,name,bodyPart,equipment,target,gifUrl,exerciseDate) VALUES(?,?,?,?,?,?,?,?)`;

    let parameters = [userId, newExercise.id, newExercise.name, newExercise.bodyPart, newExercise.equipment, newExercise.target, newExercise.gifUrl, exerciseDate];
    let addExercise;

    try {
        addExercise = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
    return addExercise;
}

// patch - change date of exercise => using userId and exercise id

async function changeExerciseDate(userId, exerciseId, exerciseDate) {
    let sql = `UPDATE users_exercices SET exerciseDate=? WHERE user_id=? AND exercise_id=?`;

    let parameters = [exerciseDate, userId, exerciseId];

    let newExerciseDate;
    try {
        newExerciseDate = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
    return newExerciseDate;
}

// delete one exercise of user 
async function deleteOneExerciseOfUser(userId, exerciseId) {
    let sql = `DELETE FROM users_exercices WHERE user_id=? AND exercise_id=?`;

    let parameters = [userId, exerciseId];

    let deleteOneUserExercise;

    try {
        deleteOneUserExercise = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error)
    }

    return deleteOneUserExercise;
}

// delete all exercises of a user
async function deleteAllUserExercises(userId) {
    let sql = `DELETE FROM users_exercices WHERE user_id=?`;

    let parameters = [userId];

    let deleteAllUserExercises;

    try {
        deleteAllUserExercises = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error)
    }

    return deleteAllUserExercises;
}


module.exports = {
    getExercisesOfUser,
    userAcquiresExercise,
    changeExerciseDate,
    deleteOneExerciseOfUser,
    deleteAllUserExercises
}
