// const express = require("express");
// const expressServer = express();
// const http = require("http");
// const httpServer = http.createServer(expressServer);
// const jwt = require('jsonwebtoken');
// const config = require("../config.json");
// const logRequests = require("../middleware/logger/log-requests");

// const socketPort = process.env.SOCKET_PORT || 8000;

// const socketIO = require("socket.io")(httpServer, {
//     cors: {
//         origin: ['http://localhost:3000'],
//         methods: ["GET", "POST", "DELETE", "PUT"]

//     },
// });

// let userIdToSocketsMap = new Map();

// socketIO.on("connection", socket => {
//     console.log("Connection request");

//     let handshakeData = socket.request;

//     console.log(handshakeData, "handshakeData");

//     let token = handshakeData._query.token;

//     console.log(token, "token");

//     if (token) {
//         let verifiedAndDecodedToken = jwt.verify(token, config.secret);

//         let userId = verifiedAndDecodedToken.userId;

//         console.log(userId);

//         userIdToSocketsMap.set(userId, socket);

//         console.log(userIdToSocketsMap, "socket users map");

//         console.log("One client has been connected... Total clients: " + userIdToSocketsMap.size);
//     }


//     socket.on("msg-from-client", msg => {

//         console.log("Client sent message: " + JSON.stringify(msg));

//         let senderId = msg.senderId;
//         let targetId = msg.targetId;
//         let parameters = msg.parameters;

//         console.log(senderId, "sender id");
//         console.log(targetId, "target id");
//         console.log(parameters, "mssagge parameters");

//         let socket = userIdToSocketsMap.get(targetId);

//         socket.emit("msg-from-server", parameters);

//     });


//     socket.on("disconnect", () => {

//         let handshakeData = socket.request;
//         let token = handshakeData._query.token;

//         if (token) {
//             let verifiedAndDecodedToken = jwt.verify(token, config.secret);

//             let userId = verifiedAndDecodedToken.userId;

//             userIdToSocketsMap.delete(userId);

//             console.log(userId + " client has been disconnected. Total clients: " + userIdToSocketsMap.size);
//         }
//     });

// });

// httpServer.listen(socketPort, () => console.log("Listening..."));

// function broadcastExceptSender(actionName, data, senderId) {

//     for (let [id, socket] of userIdToSocketsMap) {
//         if (id !== senderId) {
//             socket.emit(actionName, data);
//         }
//     }
// }

// module.exports = {
//     broadcastExceptSender
// };

const socketPort = process.env.SOCKET_PORT || 8000;

const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const config = require("./config.json");
const jwtToken = require("./middleware/auth/token");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
})


// io.on("connection", (socket)=> {
//     console.log(socket.id, "connection id")

//     socket.on("send_data", msg => {

//         console.log("Client sent message: " + JSON.stringify(msg));

//         let senderId = msg.senderId;
//         let targetId = msg.targetId;
//         let parameters = msg.parameters;

//         console.log(senderId, "sender id");
//         console.log(targetId, "target id");
//         console.log(parameters, "mssagge parameters");

//         // let socket = userIdToSocketsMap.get(targetId);

//         // socket.emit("msg-from-server", parameters);

//     });
// })


let userIdToSocketsMap = new Map();

io.on("connection", socket => {
    console.log("Connection request");

    let handshakeData = socket.request;

    let token = handshakeData._query.token;

    console.log(token, "token");

    if (token) {

        let userId = jwtToken.decodeToken(token).userId;

        console.log(userId, "user id");

        userIdToSocketsMap.set(userId, socket);

        // console.log(userIdToSocketsMap, "socket users map");

        console.log("One client has been connected... Total clients: " + userIdToSocketsMap.size);
    }


    socket.on("send_data", msg => {

        console.log("Client sent message: " + msg);

        let senderId = msg.senderId;
        let targetId = msg.targetId;
        let parameters = msg.parameters;

        console.log(senderId, "sender id");
        console.log(targetId, "target id");
        console.log(parameters, "mssagge parameters");

        let socket = userIdToSocketsMap.get(targetId);

        socket.emit("msg-from-server", parameters);

    });


    socket.on("disconnect", () => {

        let handshakeData = socket.request;
        let token = handshakeData._query.token;

        if (token) {
            let userId = jwtToken.decodeToken(token).userId;

            userIdToSocketsMap.delete(userId);

            console.log(userId + " client has been disconnected. Total clients: " + userIdToSocketsMap.size);
        }
    });

});

server.listen(socketPort, () => { console.log(`socket io, listening on http://localhost:${socketPort}`) });

function broadcastExceptSender(actionName, data, senderId) {

    for (let [id, socket] of userIdToSocketsMap) {
        if (id !== senderId) {
            socket.emit(actionName, data);
        }
    }
}

module.exports = {
    broadcastExceptSender
};