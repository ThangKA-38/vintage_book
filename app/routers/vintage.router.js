module.exports = app =>{
    var router = require('express').Router();
    const controller = require('../controllers/Register.controller')
    router.get('/',(req,res)=>{
        res.render('home')
    })

    router.get('/success',controller.getAll)
    app.use(router);
}