
module.exports = app => {
    var router = require('express').Router();
    const controller = require('../controllers/member/member.controller')
    const upload = require('../upload.muler')

    router.get('/member/formadd', controller.formAddInfor)
        .post('/member/add_infomation', upload.single('avatar'), controller.addNewInfor)

    app.use(router)
}