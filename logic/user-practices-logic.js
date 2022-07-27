const userPracticesDao = require("../dao/user-practices-dao");
const ServerError = require("../middleware/errors/server-error");
const ErrorType = require("../middleware/errors/error-type");

async function getPracticesOfUser(userId) {
    let userPractices = await userPracticesDao.getPracticesOfUser(userId);
    return userPractices;
}

async function userAcquiresPractice(userId, newPractice) {
    let addPracticeToUser = await userPracticesDao.userAcquiresPractice(userId, newPractice);
    return addPracticeToUser;
}

async function changePracticeDate(userId, practiceId, practiceDate) {
    let updatedPracticeDate = await userPracticesDao.changePracticeDate(userId, practiceId, practiceDate);
    return updatedPracticeDate;
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