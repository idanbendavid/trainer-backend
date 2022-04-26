const dotenv = require("dotenv");
dotenv.config();
global.config = process.env.NODE_ENV === "production" ? require("./config.json").production : require("./config.json").development;

const express = require("express");
const path = require('path');

const usersController = require("./controllers/users-controller");
const coachController = require("./controllers/coach-controller");
const practicesController = require("./controllers/practices-controller");
const userPracticesController = require("./controllers/user-practices-controller");
const filesController = require("./controllers/files-controller");

const errorHandler = require("./middleware/errors/error-handler");
const loginFilter = require("./middleware/filters/login-filter");
const fileupload = require("express-fileupload");

const server = express();

const cors = require("cors");

if (global.config.isDevelopment) {
    server.use(cors({ origin: ["http://localhost:3000"] }));
}

server.use(fileupload());

const port = process.env.PORT || 3001;

// production settings here

server.use(express.static("files"));
server.use(express.json());

server.use("/users", usersController);
server.use("/coach", coachController);
server.use("/practices", practicesController);
server.use("/userPractices", userPracticesController);
server.use("/files", filesController);

server.use(errorHandler);
server.use(loginFilter);


server.listen(port, () => { console.log(`listening on http://localhost:${port}`) })   