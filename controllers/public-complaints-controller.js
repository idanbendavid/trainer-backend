const express = require("express");
const router = express.Router();
const jwtToken = require("../middleware/auth/token");
const publicComplaintsLogic = require("../logic/public-complaint-logic")
const developmentLogger = require("../middleware/logger/dev-logger");


router.get("/", async (request, response, next) => {

    let userId = jwtToken.decodeToken(request.headers.authorization).userId;
    let role = jwtToken.decodeToken(request.headers.authorization).userRole;

    try {
        let getComplaints = await publicComplaintsLogic.getAllComplaints(userId, role);
        response.json(getComplaints);
    }
    catch (error) {
        developmentLogger().error(error.errorType)
        return next(error);
    }
})

router.post("/", async (request, response, next) => {

    let userComplaint = request.body;

    try {
        userComplaint = await publicComplaintsLogic.newComplaint(userComplaint);
        response.json(userComplaint);
    }
    catch (error) {
        developmentLogger().error(error.errorType)
        return next(error);
    }
})

router.delete("/:complaintId", async (request, response, next) => {

    let complaintId = request.params.complaintId;

    try {
        let deleteComplaint = await publicComplaintsLogic.deleteUserComplaint(complaintId)
        response.json(deleteComplaint)
    }
    catch (error) {
        developmentLogger().error(error.errorType)
        return next(error)
    }
})
module.exports = router