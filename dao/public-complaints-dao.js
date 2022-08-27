const connection = require("../db/connection-wrapper");
const ErrorType = require("../middleware/errors/error-type");
const ServerError = require("../middleware/errors/server-error");
const developmentLogger = require("../middleware/logger/dev-logger");


async function getAllComplaints() {
    let sql = `SELECT complaintId,first_name,last_name,email,complaint_category,description
    FROM complaints`;

    let getComplaints;

    try {
        getComplaints = await connection.execute(sql);
    }
    catch (error) {
        developmentLogger().error(error)
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
    return getComplaints;
}

async function newComplaint(userComplaint) {
    let sql = `INSERT INTO complaints (first_name,last_name,email,complaint_category,description) VALUES(?,?,?,?,?)`;

    console.log(userComplaint)

    let parameters = [userComplaint.firstName, userComplaint.lastName, userComplaint.email, userComplaint.complaintCategory, userComplaint.description];

    let newComplaint;

    try {
        newComplaint = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
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
        throw new ServerError(ErrorType.GENERAL_ERROR, error)
    }
    return deleteComplaint
}

module.exports = {
    getAllComplaints,
    newComplaint,
    deleteUserComplaint
}