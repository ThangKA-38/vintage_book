const User = require('../models/auth/auth.model');
//const bcrypt = require('bcrypt');

exports.showLoginForm = (req, res) => {
    res.render('auth/login');
}

exports.login = (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
        User.findByEmail(email, (err,user) => {
            if (!user) {
                res.status(401).json({ error: 'User not found' });
            } else {
                if (password == user.password) {
                    req.session.loggedin = true;
                    req.session.user = user;
                    res.json({ success: true, message: 'Login successful' });
                 
                } else {
                    res.status(401).json({ error: 'Invalid password' });
                }
            }
        });
    } else {
        res.status(400).json({ error: 'Invalid credentials' });
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) res.redirect('/500');
        res.redirect('/');
    })
}

exports.list_account = (req, res) => {
    User.getAll_Account((data) => {
        res.json({ result: data });
    });
}