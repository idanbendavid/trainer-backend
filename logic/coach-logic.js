const coachDao = require("../dao/coach-dao");
const userRole = require("../models/roles");
const ServerError = require("../middleware/errors/server-error");
const ErrorType = require("../middleware/errors/error-type");
const uuid = require("uuid");

// get list of all coaches
async function getCoaches(getAllCoaches) {
    getAllCoaches = await coachDao.getCoaches();
    return getAllCoaches;
}

// get data about coach athletes
async function getDataAboutCoachAthlets(coachId, role) {

    let coachAthletesDetails;

    // validate the role of the user
    if (role !== userRole[2]) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }
    // validate if the coach id is uuid based
    if (uuid.validate(coachId) === false) {
        throw new ServerError(ErrorType.FORBIDDEN);
    }
    else {
        coachAthletesDetails = await coachDao.getDataAboutCoachAthlets(coachId);
    }

    return coachAthletesDetails;
}

module.exports = {
    getCoaches,
    getDataAboutCoachAthlets
}