const connection = require("../db/connection-wrapper");
const ErrorType = require("../middleware/errors/error-type");
const ServerError = require("../middleware/errors/server-error");

async function getFiles() {
    let sql = `SELECT * FROM files`;

    let files;
    try {
        files = await connection.execute(sql);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
    return files;
}

async function addFile(filePath, filename) {
    let sql = `INSERT INTO files (file_path,file_name) VALUES(?,?)`;

    let parameters = [filePath, filename];

    let savedFile;
    try {
        savedFile = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
    return savedFile;
}

async function deleteFile(filename) {
    let sql = `DELETE FROM files WHERE file_name=?`;

    let parameters = [filename];

    let removeFile;
    try {
        removeFile = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR);
    }
    return removeFile;
}

module.exports = {
    getFiles,
    addFile,
    deleteFile
}