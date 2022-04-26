const express = require("express");
const expressServer = express();
const http = require("http"); 
const httpServer = http.createServer(expressServer);
const jwt = require('jsonwebtoken');
const config = require("../config.json");
const logRequests = require("../middleware/logger/log-requests");

const socketPort = process.env.SOCKET_PORT || 8000;

const socketIO = require("socket.io")(httpServer, {
    cors: {
        origin: ['http://localhost:3000'],
    },
});

let userIdToSocketsMap = new Map();

socketIO.on("connection", socket => {
    console.log("Connection request");

    let handshakeData = socket.request;
    
    console.log(handshakeData, "handshakeData");
    
    let token = handshakeData._query.token;
    
    console.log(token,"token");

    if (token) {
        let verifiedAndDecodedToken = jwt.verify(token, config.secret);
        
        let userId = verifiedAndDecodedToken.userId;
     
        console.log(userId);
     
        userIdToSocketsMap.set(userId, socket);
     
        console.log(userIdToSocketsMap,"socket users map");
     
        console.log("One client has been connected... Total clients: " + userIdToSocketsMap.size);
    }


    socket.on("msg-from-client", msg => {

        console.log("Client sent message: " + JSON.stringify(msg));

        let senderId = msg.senderId;
        let targetId = msg.targetId;
        let parameters = msg.parameters;
        
        console.log(senderId, "sender id");
        console.log(targetId, "target id");
        console.log(parameters, "mssagge parameters");

        let socket = userIdToSocketsMap.get(targetId);

        socket.emit("msg-from-server", parameters);

        httpServer.use(logRequests)
    });


    socket.on("disconnect", () => {

        let handshakeData = socket.request;
        let token = handshakeData._query.token;

        if (token) {
            let verifiedAndDecodedToken = jwt.verify(token, config.secret);

            let userId = verifiedAndDecodedToken.userId;

            userIdToSocketsMap.delete(userId);

            httpServer.use(logRequests);

            console.log(userId + " client has been disconnected. Total clients: " + userIdToSocketsMap.size);
        }
    });

});

httpServer.listen(socketPort, () => console.log("Listening..."));

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