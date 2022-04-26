const practicesDao = require("../dao/practices-dao");
const ServerError = require("../middleware/errors/server-error");
const ErrorType = require("../middleware/errors/error-type");
const userRole = require("../models/roles");
const practice = require("../models/practice");

// get list of all practices
async function getPractices() {
    getAllPractices = await practicesDao.getPractices();
    return getAllPractices;
}

// create new practice
async function createPractice(createdPractice, role) {

    NewPracticeValidation(createdPractice, role);

    let newPractice = await practicesDao.createPractice(createdPractice);

    return newPractice;
}

// validate fields of new practice
function NewPracticeValidation(createdPractice, role) {
    // if someone who is not admin or is not a coach tries to add practice
    if (role !== userRole[1] && role !== userRole[2]) {
        throw new ServerError(ErrorType.UNAUTHORIZED)
    }

    if (!createdPractice) {
        throw new ServerError(ErrorType.INVALID_PRACTICE)
    }
    // if the type of the practice does not exist in the practice object
    if (!Object.values(practice).includes(createdPractice.type)) {
        throw new ServerError(ErrorType.INVALID_PRACTICE)
    }
}

// update practice
async function updatePractice(updatePractice, role) {

    UpdatePracticeValidation(updatePractice, role);

    let changedPractice = await practicesDao.updatePractice(updatePractice);

    return changedPractice;
}

function UpdatePracticeValidation(updatePractice, role) {
    // if someone who is not admin or is not a coach tries to add practice
    console.log(role);

    if (role !== userRole[1] && role !== userRole[2]) {
        throw new ServerError(ErrorType.UNAUTHORIZED)
    }

    if (!updatePractice) {
        throw new ServerError(ErrorType.INVALID_PRACTICE)
    }

    // if the type of the practice does not exist in the practice object
    if (!Object.values(practice).includes(updatePractice.type)) {
        throw new ServerError(ErrorType.INVALID_PRACTICE)
    }
}


async function deletePractice(practiceToDelete, role) {

    let removePractice;
    // only admin can delete practice anyone else is unauthorized
    if (!practiceToDelete) {
        throw new ServerError(ErrorType.INVALID_PRACTICE);
    }

    if (role !== userRole[1]) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }

    else {
        removePractice = await practicesDao.deletePractice(practiceToDelete);
    }

    return removePractice
}


module.exports = {
    getPractices,
    createPractice,
    updatePractice,
    deletePractice
}