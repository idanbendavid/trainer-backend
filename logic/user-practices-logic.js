const userPracticesDao = require("../dao/user-practices-dao");
const userRole = require("../models/roles");
const ServerError = require("../middleware/errors/server-error");
const ErrorType = require("../middleware/errors/error-type");
const uuid = require("uuid");

async function getPracticesOfUser(userId) {
    let userPractices = await userPracticesDao.getPracticesOfUser(userId);
    return userPractices;
}

async function userAcquiresPractice(userId, practiceId, practiceDate) {
    let addPracticeToUser = await userPracticesDao.userAcquiresPractice(userId, practiceId, practiceDate);
    return addPracticeToUser;

}

async function changePracticeDate(practiceDate, userId, practiceId) {
    let newPracticeDate = await userPracticesDao.changePracticeDate(practiceDate, userId, practiceId);
    return newPracticeDate;
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
    deleteOnePracticeOfUser,
    deleteAllUserPractices
}