const mysql = require("mysql2");

const connection = mysql.createPool({
    host: '34.165.25.120',
    user: 'root',
    password: 'trainer-1234',
    database:'trainer',
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