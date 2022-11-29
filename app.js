const dotenv = require("dotenv");
dotenv.config();
global.config = process.env.NODE_ENV === "production" ? require("./config.json").production : require("./config.json").development;

const express = require("express");
const path = require('path');

const usersController = require("./controllers/users-controller");
const userExercisesController = require("./controllers/user-exercises-controller");
const filesController = require("./controllers/files-controller");
const publicComplaintController = require("./controllers/public-complaints-controller");
const adminController = require("./controllers/admin-controller");

const errorHandler = require("./middleware/errors/error-handler");
const loginFilter = require("./middleware/filters/login-filter");
const fileupload = require("express-fileupload");
// const socketConnection = require('./socket-io');

const server = express();

const cors = require("cors");

// server.use(cors({
//     "Access-Control-Allow-Origin" : "http://34.65.141.75:3001"
// }));

server.use(cors({ origin: "http://localhost:3000" }));


server.use(fileupload());

const port = process.env.PORT || 3001;

server.use(express.static("files"));
server.use(express.json());

server.use("/users", usersController);
server.use("/userExercises", userExercisesController);
server.use("/files", filesController);
server.use("/complaint", publicComplaintController);
server.use("/adminTasks", adminController);

server.use(errorHandler);
server.use(loginFilter);


server.listen(port, () => { console.log(`server is listening`) })