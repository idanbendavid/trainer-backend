const connection = require("../db/connection-wrapper");
const ErrorType = require("../middleware/errors/error-type");
const ServerError = require("../middleware/errors/server-error");

// get
async function getPractices() {
    let sql = "SELECT * FROM practice";

    let getAllpracticess;
    try {
        getAllpracticess = await connection.execute(sql);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
        // change error type
    }
    return getAllpracticess
}

// post
async function createPractice(newPractice) {
    let sql = "INSERT INTO practice (type,location,description,duration) VALUES(?,?,?,?)";

    let parameters = [newPractice.type, newPractice.location, newPractice.description, newPractice.duration];

    let addNewPractice;
    try {
        addNewPractice = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
        // change error type
    }
    return addNewPractice
}

// put
async function updatePractice(editedPractice) {
    let sql = "UPDATE practice SET type=?, location=?, description=?, duration=? WHERE id=?";

    let parameters = [editedPractice.type, editedPractice.location, editedPractice.description, editedPractice.duration, editedPractice.id];

    let changedPractice;
    try {
        changedPractice = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
    return changedPractice
}

// delete
async function deletePractice(practiceId) {
    let sql = "DELETE FROM practice WHERE id=?";

    let parameters = [practiceId];

    let deltedPractice;
    try {
        deltedPractice = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
    return deltedPractice
}

module.exports = {
    getPractices,
    createPractice,
    updatePractice,
    deletePractice
}