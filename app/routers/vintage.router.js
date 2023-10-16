module.exports = app => {
    var router = require('express').Router();
    const controller = require('../controllers/book.controller')
    const middleware = require('../middleware/auth.middleware');

    var appRoot = require('app-root-path')
    const multer = require('multer')
    const path = require('path')

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            // console.log(appRoot)
            cb(null, appRoot + "/Public/upload");
        },

        // By default, multer removes file extensions so let's add them back
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
        }
    });


    let upload = multer({ storage: storage });
    // fileFilter: imageFilter

    router.get('/', (req, res) => {
        res.render('introduction.ejs')
    })

    router.get('/home', middleware.loggedin, (req, res) => {
        res.render('home.ejs')
    })

    router.get('/form_add_book', controller.showDataCategory)
        .post('/add_book', upload.fields([{ name: 'fileElem' }, { name: 'myImage' }]), controller.createNewBook)

    router.get('/book', middleware.loggedin, controller.ShowBook)
        .get('/detail_book/:id', middleware.loggedin, controller.detailBooK)
        .post('/remove_book/:id', middleware.loggedin, controller.removeBook)
        .get('/category/:id', controller.categoryBook)
    // .post('/upload/booK/:id', upload.fields([{ name: 'fileElem' }, { name: 'myImage' }]), controller.uploadFile)
    app.use(router);
}