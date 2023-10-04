const User = require('../models/auth/auth.model');
//const bcrypt = require('bcrypt');

exports.showLoginForm = (req, res) => {
    res.render('auth/login');
}

exports.login = (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
        User.findByEmail(email, (err, user) => {
            if (!user) {
                res.redirect('/login');
            } else {
              //  bcrypt.compare(password, user.password, (err, result) => {})
                    if (password == user.password) {
                        req.session.loggedin = true;
                        req.session.user = user;
                        res.redirect('/home');
                    } else {
                        // A user with that email address does not exists
                        const conflictError = 'User credentials are not valid.';
                        return res.render('auth/login', { conflictError });
                    }
                
            }
        })
    } else {
        // A user with that email address does not exists
        const conflictError = 'User credentials are not valid.';
        res.render('auth/login', { conflictError });
    }
}

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) res.redirect('/500');
        res.redirect('/');
    })
}

exports.list_account = (req, res) => {
    User.get_all((data) => {
        res.render('blog', { result: data })

    })
}