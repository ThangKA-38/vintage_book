const User = require('../models/auth/auth.model')
require('dotenv/config');

exports.create = (req, res) => {
    res.render('auth/register');
}

exports.getAll = (req,res)=>{
    User.getAll_Account((data) =>{
        return res.render('success', { dataUser: data });

    })
}
exports.register = (req,res)=>{
    const {username, email, password,role_id} = req.body;
    const parsedRoleId = parseInt(role_id);
    
    if(username && email && password && role_id){
        User.findByEmail(email,(err,user)=>{
            if (err || user) {
   
                    console.log(err);
                    return res.status(500).json({ message: err });

                }
            User.createUser({username, email, password,role_id: parsedRoleId}, (err) => {
                if (!err) {
                 // return res.redirect('/');
                 return res.json({username, email, password,role_id:parsedRoleId});
                    
                }
            })
        })
    }
}


