const connection = require("../db/connection-wrapper");
const ErrorType = require("../middleware/errors/error-type");
const ServerError = require("../middleware/errors/server-error");


async function getTasksOfAdmin() {
    let sql = `SELECT * FROM admin_tasks`;

    let getComplaints;

    try {
        getComplaints = await connection.execute(sql);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error);
    }
    return getComplaints;
}

async function addNewTasks(newTask) {
    let sql = `INSERT INTO admin_tasks (task) VALUES(?)`;

    let parameters = [newTask];

    try {
        newTask = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.INVALID_TASKS, JSON.stringify(newTask), error);
    }
    return newTask;
}

async function deleteTask(task) {
    let sql = `DELETE FROM admin_tasks WHERE task=?`;

    let parameters = [task];

    let deleteTask;

    try {
        deleteTask = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, error)
    }
    return deleteTask;
}

module.exports = {
    getTasksOfAdmin,
    addNewTasks,
    deleteTask
}