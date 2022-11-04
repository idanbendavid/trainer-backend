const express = require("express");
const router = express.Router();
const jwtToken = require("../middleware/auth/token");
const adminLogic = require("../logic/admin-logic")
const developmentLogger = require("../middleware/logger/dev-logger");


router.get("/", async (request, response, next) => {

    let userId = jwtToken.decodeToken(request.headers.authorization).userId;
    let role = jwtToken.decodeToken(request.headers.authorization).userRole;

    try {
        let getAdminTasks = await adminLogic.getTasksOfAdmin(userId, role);
        response.json(getAdminTasks);
    }
    catch (error) {
        developmentLogger().error(error.errorType)
        return next(error);
    }
})

router.post("/", async (request, response, next) => {

    let newTask = request.body.newTask;
    try {
        newTask = await adminLogic.addNewTasks(newTask);
        response.json(newTask);
    }
    catch (error) {
        developmentLogger().error(error.errorType)
        return next(error);
    }
})

router.delete("/:task", async (request, response, next) => {

    let task = request.params.task;

    try {
        let deleteTask = await adminLogic.deleteTask(task);
        response.json(deleteTask)
    }
    catch (error) {
        developmentLogger().error(error.errorType)
        return next(error)
    }
})
module.exports = router