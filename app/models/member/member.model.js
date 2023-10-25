const sql = require('../db');

const Member = {};


//thêm thông tin người dùng
Member.addInfor = (newData, result) => {

    const db = `INSERT INTO user_info SET ?`
    sql.query(db, newData, (err, member) => {
        if (err) {
            console.log(err, member);
        } else {
            result(null, {
                id: member.insertId, ...newData
            })
        }
    })
}



module.exports = Member