const userPracticesDao = require("../dao/user-practices-dao");
const userRole = require("../models/roles");
const ServerError = require("../middleware/errors/server-error");
const ErrorType = require("../middleware/errors/error-type");
const uuid = require("uuid");

async function getPracticesOfUser(userId) {
    let userPractices = await userPracticesDao.getPracticesOfUser(userId);
    return userPractices;
}

async function userAcquiresPractice(userId, practiceId, coachId, practiceDate) {

    while (coachId !== null) {
        if (!uuid.validate(coachId)) {
            throw new ServerError(ErrorType.INVALID_COACH);
        }

        else {
            let addPracticeToUser = await userPracticesDao.userAcquiresPractice(userId, practiceId, coachId, practiceDate);
            return addPracticeToUser;
        }
    }

    let addPracticeToUser = await userPracticesDao.userAcquiresPractice(userId, practiceId, coachId, practiceDate);
    return addPracticeToUser;
}

async function changePracticeDate(practiceDate, userId, practiceId) {
    let newPracticeDate = await userPracticesDao.changePracticeDate(practiceDate, userId, practiceId);
    return newPracticeDate;
}

async function assignCoachToAUserSpecificPractice(coachId, userId, practiceId) {

    if (!uuid.validate(coachId)) {
        throw new ServerError(ErrorType.INVALID_COACH);
    }

    else {
        let addCoachToOneUserPractice = await userPracticesDao.assignCoachToAUserSpecificPractice(coachId, userId, practiceId);
        return addCoachToOneUserPractice;
    }
}

async function assignCoachToAllUserPractices(coachId, userId) {

    if (!uuid.validate(coachId)) {
        throw new ServerError(ErrorType.INVALID_COACH);
    }

    else {
        let addCoachToAllUserPractice = await userPracticesDao.assignCoachToAllUserPractices(coachId, userId);
        return addCoachToAllUserPractice;
    }
}

async function deleteOnePracticeOfUser(userId, practiceId) {
    let removeOnePracticeOfUser = await userPracticesDao.deleteOnePracticeOfUser(userId, practiceId);
    return removeOnePracticeOfUser;
}

async function deleteAllUserPractices(userId) {
    let deleteAllPracticesOfUser = await userPracticesDao.deleteAllUserPractices(userId);
    return deleteAllPracticesOfUser;
}


module.exports = {
    getPracticesOfUser,
    userAcquiresPractice,
    changePracticeDate,
    assignCoachToAUserSpecificPractice,
    assignCoachToAllUserPractices,
    deleteOnePracticeOfUser,
    deleteAllUserPractices
}