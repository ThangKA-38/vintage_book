
module.exports = app => {
    var router = require('express').Router();
    const controller = require('../controllers/member/member.controller')

    var appRoot = require('app-root-path')
    const multer = require('multer')
    const path = require('path')

    const storages = multer.diskStorage({
        destination: function (req, file, cb) {
            // console.log(appRoot)
            cb(null, appRoot + "/public/Avatar");
        },

        // By default, multer removes file extensions so let's add them back
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, file.fieldname + '_' + Date.now() + ext);
        }
    });

    let upload = multer({ storage: storages });

    router.get('/member/formadd', controller.formAddInfor)
        .post('/member/add_infomation', upload.single('avatar'), controller.addNewInfor)

    app.use(router)
}