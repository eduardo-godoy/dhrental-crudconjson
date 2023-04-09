// MULTER DE USUARIOS

const path = require ('path');
const multer = require('multer');

const storage = multer.diskStorage({

    destination: (req, file, callback) => {

        let folder = path.join(__dirname, '../../public/images/users');
        callback(null,folder);

    },
    filename: (req, file, callback) => {

        let imageName = 'user-' + Date.now() + path.extname(file.originalname);
        callback(null,imageName);

    }

});

let upload = multer ({ storage : storage });

module.exports = upload;
