const dotenv = require("dotenv");
dotenv.config();
global.config = process.env.NODE_ENV === "production" ? require("./config.json").production : require("./config.json").development;

const express = require("express");
const path = require('path');

const usersController = require("./controllers/users-controller");
const usersExercisesController = require("./controllers/users-exercises-controller");
const filesController = require("./controllers/files-controller");
const publicComplaintController = require("./controllers/public-complaints-controller");

const errorHandler = require("./middleware/errors/error-handler");
const loginFilter = require("./middleware/filters/login-filter");
const fileupload = require("express-fileupload");

const server = express();

const cors = require("cors");

server.use(cors({
    "origin": "https://traininglog.onrender.com",
    "methods": "GET,PUT,PATCH,POST,DELETE",
    "optionsSuccessStatus": 204,
    "credentials": true
}));

server.use(fileupload());

const port = process.env.PORT || 3001;

server.use(express.static("files"));
server.use(express.json());

server.use("/users", usersController);
server.use("/usersExercises", usersExercisesController);
server.use("/files", filesController);
server.use("/complaint", publicComplaintController);


server.get('*', (req, res) => {
    server.use('https://traininglog.onrender.com', express.static(path.join(__dirname, 'public')));
});

server.use(errorHandler);
server.use(loginFilter);

server.listen(port, () => { console.log(`server is listening`) })