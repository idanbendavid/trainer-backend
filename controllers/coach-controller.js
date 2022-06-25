const express = require("express");
const router = express.Router();
const coachLogic = require("../logic/coach-logic");
const jwtToken = require("../middleware/auth/token")

// get list of all coaches
router.get("/", async (request, response, next) => {

    let getAllCoaches;

    try {
        getAllCoaches = await coachLogic.getCoaches();
        response.json(getAllCoaches)
    }
    catch (error) {
        return next(error);
    }
})

// get data about coach athletes
router.get("/:coachId", async (request, response, next) => {

    let coachId = request.params.coachId;

    let role = jwtToken.decodeToken(request.headers.authorization).userRole;

    let coachAthletesDetails;

    try {
        coachAthletesDetails = await coachLogic.getDataAboutCoachAthlets(coachId,role);
        response.json(coachAthletesDetails)
    }
    catch (error) {
        return next(error);
    }
})




module.exports = router;