const connection = require("../db/connection-wrapper");
const ErrorType = require("../middleware/errors/error-type");
const ServerError = require("../middleware/errors/server-error");

// get exercises of user by user id - for user profile
async function getExercisesOfUser(userId) {
    let sql = `SELECT ue.exerciseName, ue.type, ue.numberOfSets, ue.numberOfRepeats, ue.notes, ue.exerciseDate, ue.duration
    FROM users u LEFT JOIN users_exercises ue 
    ON u.id = ue.userId
    WHERE ue.userId=?`;

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

async function getExercisesForContest() {
    let sql = `SELECT CONCAT(u.first_name," ",u.last_name) AS 'name',COUNT(ue.exerciseName) AS 'completed exercises'
    FROM users u LEFT JOIN users_exercises ue 
    ON u.id = ue.userId
    GROUP BY name`;

    // optional - subquery to calc how many times in a week the user trained for bouns points in the contest table

    let exercisesPerDate;
    try {
        exercisesPerDate = await connection.execute(sql);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
    return exercisesPerDate;
}


// add exercise to user 
async function addUserExercise(userId, userExerciseDetails) {
    let sql = `INSERT INTO users_exercises(userId,exerciseName,type,numberOfSets,numberOfRepeats,notes,exerciseDate,duration) VALUES(?,?,?,?,?,?,?,?)`;

    let parameters = [userId, userExerciseDetails.exerciseName, userExerciseDetails.type, userExerciseDetails.numberOfSets, userExerciseDetails.numberOfRepeats, userExerciseDetails.notes, userExerciseDetails.exerciseDate, userExerciseDetails.duration];

    let addExercise;

    try {
        addExercise = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
    return addExercise;
}

// delete exercises on the first of each month based on the sql query
async function deleteExercises() {
    let sql = `DELETE FROM users_exercises WHERE exerciseDate < now() - INTERVAL 40 DAY`;

    let deleteOldExercises;

    try {
        deleteOldExercises = await connection.execute(sql);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error)
    }

    return deleteOldExercises;
}

module.exports = {
    getExercisesOfUser,
    getExercisesForContest,
    addUserExercise,
    deleteExercises,
}
