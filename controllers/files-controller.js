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
    const newpath = __dirname + "/../files/";
    const file = request.files.file;
    const filename = file.name;

    file.mv(`${newpath}${filename}`, (err) => {
        if (err) {
            response.status(500).send({ message: "File upload failed", code: 445 });
            return
        }
        let filePath = `https://localhost:3001/${filename}`;

        response.json(filePath);
    });

    filesDao.addFile(filename);
});

// delete file
router.delete('/:filename', async (request, response, next) => {
    let file = 'files/' + request.params.filename;

    try {
        fs.unlinkSync(file);

        let removeFile = await filesDao.deleteFile(request.params.filename);

        response.json(removeFile);
    }
    catch (error) {
        return next(error);
    }
});


module.exports = router;

