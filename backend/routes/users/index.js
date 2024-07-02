const express = require("express");
const router = express.Router();
const { register, login, logout } = require('./controller')
const multer = require('multer');
const path = require('path')
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const profilePhotosDir = path.join(__dirname, '../', '../', '../', 'frontend/', 'public/', "/profilePhotos");
        if (!fs.existsSync(profilePhotosDir)) {
            fs.mkdirSync(profilePhotosDir);
        }

        cb(null, profilePhotosDir);
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

// Initialize upload
const upload = multer({
    storage: storage,
}).single("profilePhoto");

router.post('/register', upload, register);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router