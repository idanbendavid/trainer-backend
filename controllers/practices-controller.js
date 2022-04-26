const express = require("express");
const router = express.Router();
const practiceLogic = require("../logic/practices-logic");
const jwtToken = require("../middleware/auth/token")

// get all practices
router.get("/", async (request, response, next) => {

    let getPractices;

    try {
        getPractices = await practiceLogic.getPractices();
        response.json(getPractices)
    }
    catch (error) {
        return next(error);
    }
})


// create practice
router.post("/", async (request, response, next) => {

    let createdPractice = request.body;
    let role = jwtToken.decodeToken(request.headers.authorization).role;

    try {
        let newPractice = await practiceLogic.createPractice(createdPractice,role);
        response.json(newPractice);
    }
    catch (error) {
        return next(error);
    }
})

// update practice 
router.put("/", async (request, response, next) => {

    let updatePractice = request.body;
    let role = jwtToken.decodeToken(request.headers.authorization).role;

    try {
        let changedPractice = await practiceLogic.updatePractice(updatePractice,role);
        response.json(changedPractice);
    }
    catch (error) {
        return next(error);
    }
})

// delete practice
router.delete("/:practiceId", async (request, response, next) => {

    let practiceToDelete = request.params.practiceId;
    let role = jwtToken.decodeToken(request.headers.authorization).role;

    try{
        practiceToDelete = await practiceLogic.deletePractice(practiceToDelete,role);
        response.json(practiceToDelete);
    }
    catch(error){
        return next(error);
    }
})


module.exports = router;