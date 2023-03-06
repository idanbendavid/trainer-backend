const connection = require("../db/connection-wrapper");
const ErrorType = require("../middleware/errors/error-type");
const ServerError = require("../middleware/errors/server-error");


async function getAllComplaints() {
    let sql = `SELECT * FROM complaints`;

    let getComplaints;

    try {
        getComplaints = await connection.execute(sql);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
    return getComplaints;
}

async function newComplaint(userComplaint) {
    let sql = `INSERT INTO complaints (firstName,lastName,email,complaintCategory,description,complaintDate) VALUES(?,?,?,?,?,?)`;

    let parameters = [userComplaint.firstName, userComplaint.lastName, userComplaint.email, userComplaint.complaintCategory, userComplaint.description, new Date().toDateString()];

    let newComplaint;

    try {
        newComplaint = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.INVALID_TASKS,JSON.stringify(userComplaint), error);
    }
    return newComplaint;
}

async function deleteUserComplaint(complaintId){
    let sql = `DELETE FROM complaints WHERE complaintId=?`;

    let parameters = [complaintId];

    let deleteComplaint; 

    try{
        deleteComplaint = await connection.executeWithParameters(sql,parameters);
    }
    catch(error){
        throw new ServerError(ErrorType.INVALID_TASKS,JSON.stringify(complaintId), error)
    }
    return deleteComplaint
}

module.exports = {
    getAllComplaints,
    newComplaint,
    deleteUserComplaint
}