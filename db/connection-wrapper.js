const mysql = require("mysql2");
const config = require("../config.json");

const connection = mysql.createPool({
    host: config.production.database.host,
    user: config.production.database.user,
    password: config.production.database.password,
    database: config.production.database.database,
    waitForConnections: true,   
    connectionLimit: 10,
    queueLimit: 0 
})


function execute(sql) {
    return new Promise((resolve, reject) => {
        connection.execute(sql, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

function executeWithParameters(sql, parameters) {
    return new Promise((resolve, reject) => {
        connection.execute(sql, parameters, (err, result) => {
            if (err) {
                console.log("Failed interacting with DB, calling reject");
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

module.exports = {
    execute,
    executeWithParameters
};