const Book = require('../models/book.model')
const multer = require('multer');

exports.ShowBook= (req,res)=>{
    Book.getAllBook((data)=>{
            res.json({listBooK: data})

    })
}

exports.uploadFile = (req,res,err)=>{
    if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError);
      } else if (!req.files || !req.files['fileElem'] || !req.files['myImage']) {
        return res.status(400).send('Please select both files to upload');
      }
    

      for (let i = 0; i <= 3; i++) {
        var Book_id = Math.floor(Math.random() * 3);
        
      }
    console.log(Book_id);
    var fileBook = req.files['fileElem'][0].filename;
    var fileIMG = req.files['myImage'][0].filename;
    Book.upload([Book_id, fileBook,fileIMG], () => {
        res.json({data : [Book_id, fileBook,fileIMG]})
    })
}
