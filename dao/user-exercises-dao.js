const connection = require("../db/connection-wrapper");
const ErrorType = require("../middleware/errors/error-type");
const ServerError = require("../middleware/errors/server-error");
const developmentLogger = require("../middleware/logger/dev-logger");

// get exercises of user by user id
async function getExercisesOfUser(userId) {
    let sql = `SELECT ue.exercise_id, ue.name, ue.bodyPart, ue.equipment, ue.gifUrl,
    ue.target, ue.exerciseDate, ue.exercise_status FROM users u 
    LEFT JOIN users_exercises ue 
    ON u.id = ue.user_id
    WHERE ue.user_id=?`;

    let parameters = [userId];

    let userExercises;
    try {
        userExercises = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        developmentLogger().debug(error)
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
    return userExercises;
}

async function getAmountOfExercisesPerDateForUser(userId) {
    let sql = `SELECT exerciseDate, COUNT(exerciseDate) 
    FROM users_exercises
    WHERE user_id=?
    GROUP BY exerciseDate
    HAVING COUNT(*) >= 7`;

    let parameters = [userId];

    let exercisesPerDate;
    try {
        exercisesPerDate = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        developmentLogger().debug(error)
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
    return exercisesPerDate;
}


// add exercise to user 
async function userAcquiresExercise(userId, newExercise, exerciseDate, exerciseStatus) {
    let sql = `INSERT INTO users_exercises(user_id,exercise_id,name,bodyPart,equipment,target,gifUrl,exerciseDate,exercise_status) VALUES(?,?,?,?,?,?,?,?,?)`;

    let parameters = [userId, newExercise.id, newExercise.name, newExercise.bodyPart, newExercise.equipment, newExercise.target, newExercise.gifUrl, exerciseDate, exerciseStatus];
    let addExercise;

    try {
        addExercise = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        developmentLogger().debug(error)
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
    return addExercise;
}


// delete one exercise of user 
async function deleteOneExerciseOfUser(userId, exerciseId) {
    let sql = `DELETE FROM users_exercises WHERE user_id=? AND exercise_id=?`;

    let parameters = [userId, exerciseId];

    let deleteOneUserExercise;

    try {
        deleteOneUserExercise = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        developmentLogger().debug(error)
        throw new ServerError(ErrorType.GENERAL_ERROR, error)
    }

    return deleteOneUserExercise;
}

module.exports = {
    getExercisesOfUser,
    getAmountOfExercisesPerDateForUser,
    userAcquiresExercise,
    deleteOneExerciseOfUser,
}
