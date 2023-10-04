const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});


app.use(express.static('public'));
app.use(express.json());
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
app.use(methodOverride(function(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
// Cấu hình session
app.use(session({
    secret: 'admin123',
    resave: true,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.set('views','app/views');

require('./app/routers/router')(app);

app.listen(3031, () => {
    console.log('Server start on : http://localhost:3031');
})