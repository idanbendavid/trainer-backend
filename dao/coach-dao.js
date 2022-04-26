const connection = require("../db/connection-wrapper");
const ErrorType = require("../middleware/errors/error-type");
const ServerError = require("../middleware/errors/server-error");


// get coach id - if coach is doing login return the coach id
async function getCoachId(userId) {
    let sql = `SELECT coach_id FROM coaches where userId=?`;

    let parameters = [userId];

    let idOfCoach;
    try {
        idOfCoach = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
    return idOfCoach[0].coach_id;
}

// get list of all coaches
async function getCoaches() {
    let sql = `SELECT * FROM coaches`;

    let getAllCoaches;
    try {
        getAllCoaches = await connection.execute(sql);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
    return getAllCoaches;
}

// get data about coach athletes
async function getDataAboutCoachAthlets(coachId) {
    let sql = `SELECT u.user_id, u.first_name, u.last_name, u.email, u.birth_date,  
    p.type AS "practice_type", p.location AS "practice_location",
    p.description AS "practice_description", p.duration AS "practice_duration",
    up.practiceDate AS "practice_date"
    FROM users u LEFT JOIN users_practices up
    ON u.user_id = up.user_id
    LEFT JOIN coaches c
    ON c.coach_id = up.coachId
    LEFT JOIN practice p 
    ON up.practice_id = p.id
    WHERE up.coachId=?`;

    let parameters = [coachId];

    let athletesOfCoach;

    try {
        athletesOfCoach = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error)
    }
    return athletesOfCoach;
}

// add coach function path: users-controller => users-logic => coach-dao 
// based on if statement in users-logic
async function addCoach(coachId, userId, firstName, lastName) {
    let sql = `INSERT INTO coaches (coach_id,userId,first_name,last_name) VALUES(?,?,?,?)`;

    let parameters = [coachId, userId, firstName, lastName];
    let defineCoach;
    try {
        defineCoach = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR)
    }
    return defineCoach, coachId;
}


async function deleteCoach(userId) {
    let sql = "DELETE FROM coaches where userId=?";

    let parameters = [userId];

    let removeCoach;

    try {
        removeCoach = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
    return removeCoach
}


module.exports = {
    getCoachId,
    getCoaches,
    getDataAboutCoachAthlets,
    addCoach,
    deleteCoach
}