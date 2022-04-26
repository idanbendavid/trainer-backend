const connection = require("../db/connection-wrapper");
const ErrorType = require("../middleware/errors/error-type");
const ServerError = require("../middleware/errors/server-error");

// get practices of user by user id
async function getPracticesOfUser(userId) {
    let sql = `SELECT up.coachId, concat(c.first_name, " ",c.last_name) AS "coach", 
    p.type AS "practice_type", p.location AS "practice_location", p.description AS "practice_description",
    p.duration AS "practice_duration", up.practiceDate AS "practice_date"
    FROM practice p LEFT JOIN users_practices up
    ON up.practice_id = p.id 
    LEFT JOIN coaches c 
    ON up.coachId = c.coach_id
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


// add practice to user => coach id will be optional means if user didn't selecet a coach enter null
async function userAcquiresPractice(userId, practiceId, coachId, practiceDate) {
    let sql = `INSERT INTO users_practices(user_id,practice_id,coachId,practiceDate) VALUES(?,?,?,?)`;

    let parameters = [userId, practiceId, coachId, practiceDate];

    let unassignCoach;

    try {
        unassignCoach = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
    return unassignCoach;
}

// patch - change  date of practice => using userId and practice id

async function changePracticeDate(practiceDate, userId, practiceId) {
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

// previously a user acquired one practice or more without a coach and now he wants to get help from a coach on a practice;
async function assignCoachToAUserSpecificPractice(coachId, userId, practiceId) {

    let sql = `UPDATE users_practices SET coachId=? WHERE user_id=? AND practice_id=?`;

    let parameters = [coachId, userId, practiceId];

    let connectToACoach;

    try {
        connectToACoach = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }

    return connectToACoach;
}

// assign coach to all practices of a user
async function assignCoachToAllUserPractices(coachId, userId) {

    let sql = `UPDATE users_practices SET coachId=? WHERE user_id=?`;

    let parameters = [coachId, userId];

    let connectAllPracticesToASpecificCoach;

    try {
        connectAllPracticesToASpecificCoach = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }

    return connectAllPracticesToASpecificCoach;
}

// ACCESS TO THIS FUNCTION ONLY FROM DELETE USER in users-logic
//  because we delete a coach remove him from all users practices where he is assigned
async function unassignCoachFromUserPractice(coachId) {
    let sql = `UPDATE users_practices SET coachId=replace(coachId,coachId,null) WHERE coachId=?`;

    let parameters = [coachId];

    let unassignCoach;
    try {
        unassignCoach = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }

    return unassignCoach;
}

// delete one practice of user 
async function deleteOnePracticeOfUser(userId, practiceId) {
    let sql = `DELETE FROM users_practices WHERE user_id=? AND practice_id=?`;

    let parameters = [userId,practiceId];

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
    assignCoachToAUserSpecificPractice,
    assignCoachToAllUserPractices,
    unassignCoachFromUserPractice,
    deleteOnePracticeOfUser,
    deleteAllUserPractices
}
