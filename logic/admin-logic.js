const adminDao = require("../dao/admin-dao");
const ServerError = require("../middleware/errors/server-error");
const ErrorType = require("../middleware/errors/error-type");
const userRole = require("../models/roles");

async function getTasksOfAdmin(userId, role) {
    if (userId !== 1 && role !== userRole[1]) {
        throw new ServerError(ErrorType.FORBIDDEN)
    }

    let getAdminTasks = await adminDao.getTasksOfAdmin();
    return getAdminTasks;
}

async function addNewTasks(newTasks) {
    
    if(!newTasks || newTasks === ""){
        throw new ServerError(ErrorType.INVALID_TASKS);

    }
    newTasks = await adminDao.addNewTasks(newTasks);
    
    return newTasks;
}

async function deleteTask(task) {
    let deleteTask = await adminDao.deleteTask(task);
    return deleteTask;
}

module.exports = {
    getTasksOfAdmin,
    addNewTasks,
    deleteTask
}