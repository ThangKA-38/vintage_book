exports.loggedin = (req, res, next) => {
    if (req.session.loggedin) {
        res.locals.user = req.session.user
        next();
    } else {
        res.redirect('/login')
    }
}

exports.isAuth = (req, res, next) => {
    if (req.session.loggedin) {
        res.locals.user = req.session.user
        res.redirect('/home');
    } else {
        next();
    }
}

exports.checkRole = (role) => {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            // Người dùng có vai trò tương ứng
            return next();
        }
        res.status(403).json({ message: 'Access denied' });
    };
}