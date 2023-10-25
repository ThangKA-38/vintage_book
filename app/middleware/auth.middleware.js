const jwt = require('jsonwebtoken');
require('dotenv/config');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'Không lấy được token.' });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'không xác minh được.' });
        }
        req.userData = decoded;
        next();
    });
};
