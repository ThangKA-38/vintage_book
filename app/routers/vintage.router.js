module.exports = app => {
    var router = require('express').Router();
    const cookieParser = require('cookie-parser');
    const controller = require('../controllers/book.controller')
    const middleware = require('../middleware/auth.middleware');
    const upload = require('../upload.muler')

    app.use(cookieParser());

    router.get('/', (req, res) => {
        res.render('introduction.ejs')
    })

    router.get('/home', (req, res) => {
        res.render('home.ejs')
    })

    router.get('/form_add_book', middleware.authBusiness, controller.showDataCategory)
        .post('/add_book', middleware.authBusiness, upload.fields([{ name: 'fileElem' }, { name: 'myImage' }]), controller.createNewBook)

    router.get('/book', controller.ShowBook)
        .get('/detail_book/:id', controller.detailBooK)
        .post('/remove_book/:id', middleware.authBusiness, controller.removeBook)
        .get('/categoryForAdd/:id', controller.categoryAdd)
        .get('/category/:id', controller.categoryBook)
        .get('/all_category', controller.All_CataCategory)
    // .post('/upload/booK/:id', upload.fields([{ name: 'fileElem' }, { name: 'myImage' }]), controller.uploadFile)
    app.use(router);

}