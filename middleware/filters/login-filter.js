const { expressJwt: jwt } = require("express-jwt");
const config = require("../../config.json");


function loginFilter() {
    return jwt({ secret: config.secret, algorithms: ["HS256"] }).unless({
        path: [
            { url: "/users/register", method: "POST"},
            { url: "/users/login", method: "POST" },
        ],
    });
}

module.exports = loginFilter;