module.exports = app =>{
    var router = require('express').Router();
    const controller = require('../controllers/book.controller')

    var appRoot = require('app-root-path')
    const multer = require('multer')
    const path = require('path')

    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            // console.log(appRoot)
            cb(null, appRoot + "/Public/upload");
        },

        // By default, multer removes file extensions so let's add them back
        filename: function(req, file, cb) {
            cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
        }
    });

    const imageFilter = function(req, file, cb) {
        // Accept images only
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    };

    let upload = multer({ storage: storage });
    // fileFilter: imageFilter

    router.get('/',(req,res)=>{
        res.render('introduction.ejs')
    })

    router.get('/home',(req,res)=>{
        res.render('home.ejs')
    })


    router.get('/book',controller.ShowBook)
    .post('/upload', upload.fields([{ name: 'fileElem' }, { name: 'myImage' }]), controller.uploadFile)
    app.use(router);
}