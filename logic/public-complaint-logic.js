const publicComplaintDao = require("../dao/public-complaints-dao");
const ServerError = require("../middleware/errors/server-error");
const ErrorType = require("../middleware/errors/error-type");
const userRole = require("../models/roles");
const outgoingEmail = require("../middleware/emails/send-email");

async function getAllComplaints(userId, role) {
    if(userId !== 1 && role !== userRole[1]){
        throw new ServerError(ErrorType.FORBIDDEN)
    }

    let getComplaints = await publicComplaintDao.getAllComplaints();
    return getComplaints;
}

async function newComplaint(userComplaint) {
    userComplaint = await publicComplaintDao.newComplaint(userComplaint);  
    if(userComplaint){
        outgoingEmail.recievedUserComplaint(userComplaint.email, userComplaint.firstName, userComplaint.lastName);
    }
    return userComplaint;
}

async function deleteUserComplaint(complaintId){
    let deleteComplaint = await publicComplaintDao.deleteUserComplaint(complaintId);
    return deleteComplaint;
}

module.exports = {
    getAllComplaints,
    newComplaint,
    deleteUserComplaint
}