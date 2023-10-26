const Member = require('../../models/member/member.model');

exports.formAddInfor = (req, res) => {
    res.render('formAdd_Infor.ejs');
}

exports.addNewInfor = (req, res) => {
    const newData = {
        fullName: req.body.fullName,
        address: req.body.address,
        phone_number: req.body.phone_number,
        birth_date: req.body.birth_date,
        gender: req.body.gender,
        avatar: req.file ? req.file.filename : null
    }
    console.log(newData.avatar);
    Member.addInfor(newData, (err) => {
        if (err) {
            console.log(err);
            res.json({ error: 'An error occurred while adding' });
        } else {
            console.log('User added to the database');
            const uploadedImagePath = req.file ? `/public/upload/${req.file.filename}` : null;
            res.status(200).json({ message: 'Adding successfully', avatar: uploadedImagePath });
        }
    })
}