const express = require("express");
const router = express.Router();
const filesDao = require("../dao/files-dao");
const fs = require('fs');

// get files
router.get("/", async (request, response, next) => {
    let files;

    try {
        files = await filesDao.getFiles();
        response.json(files);
    }
    catch (error) {
        return next(error);
    }
});

// upload file
router.post("/", (request, response) => {
    const newpath = "files/";
    const file = request.files.file;
    const filename = file.name;

    file.mv(`${newpath}${filename}`, (err) => {
        if (err) {
            response.status(500).send({ message: "File upload failed", code: 445 });
            return
        }
        let filePath = `https://traininglogserver.onrender.com/${filename}`;

        filesDao.addFile(filePath, filename);
        response.json(filePath);
    });
});

// delete file
router.delete('/:fileName', async (request, response, next) => {
    let file = 'files/' + request.params.fileName;
    try {
        fs.unlinkSync(file);

        let removeFile = await filesDao.deleteFile(request.params.fileName);

        response.json(removeFile);
    }
    catch (error) {
        return next(error);
    }
});


module.exports = router;

