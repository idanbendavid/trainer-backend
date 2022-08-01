const connection = require("../db/connection-wrapper");
const ErrorType = require("../middleware/errors/error-type");
const ServerError = require("../middleware/errors/server-error");

// get practices of user by user id
async function getPracticesOfUser(userId) {
    let sql = `SELECT u.first_name, u.last_name, up.practice_id, up.name, up.bodyPart, up.equipment, 
    up.target, up.practiceDate FROM users u 
    LEFT JOIN users_practices up 
    ON u.id = up.user_id
    WHERE up.user_id=?`;

    let parameters = [userId];

    let userPractices;
    try {
        userPractices = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
    return userPractices;
}


// add practice to user 
async function userAcquiresPractice(userId, newPractice) {
    let sql = `INSERT INTO users_practices(user_id,practice_id,name,bodyPart,equipment,target,practiceDate) VALUES(?,?,?,?,?,?,?,?)`;

    let parameters = [userId, newPractice.id, newPractice.name, newPractice.bodyPart, newPractice.equipment, newPractice.target, newPractice.practiceDate];
// practice date needs to be added in client

    let addExercise;

    try {
        addExercise = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
    return addExercise;
}

// patch - change  date of practice => using userId and practice id

async function changePracticeDate(userId, practiceId, practiceDate) {
    let sql = `UPDATE users_practices SET practiceDate=? WHERE user_id=? AND practice_id=?`;

    let parameters = [practiceDate, userId, practiceId];

    let newPracticeDate;
    try {
        newPracticeDate = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
    return newPracticeDate;
}

// delete one practice of user 
async function deleteOnePracticeOfUser(userId, practiceId) {
    let sql = `DELETE FROM users_practices WHERE user_id=? AND practice_id=?`;

    let parameters = [userId, practiceId];

    let deleteOneUserPractice;

    try {
        deleteOneUserPractice = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error)
    }

    return deleteOneUserPractice;
}

// delete all practices of a user
async function deleteAllUserPractices(userId) {
    let sql = `DELETE FROM users_practices WHERE user_id=?`;

    let parameters = [userId];

    let deleteAllUserPractices;

    try {
        deleteAllUserPractices = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error)
    }

    return deleteAllUserPractices;
}


module.exports = {
    getPracticesOfUser,
    userAcquiresPractice,
    changePracticeDate,
    deleteOnePracticeOfUser,
    deleteAllUserPractices
}
