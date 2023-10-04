const mysql = require('mysql');
const dbconfig = require('../config/db.config');

const db = mysql.createConnection({
    // host: dbconfig.HOST,
    // user: dbconfig.USER,
    // password: dbconfig.PASSWORD,
    // database: dbconfig.DB

    host :'127.0.0.1',
    user:'root',
    password:'',
    database:'vintage_book'
});

db.connect(error => {
    if (error) {
        console.log(error);
    } else 
        console.log('connect databse successfull...');
})

module.exports = db;

