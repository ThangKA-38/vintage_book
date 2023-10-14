const Book = require('../models/book.model')
const multer = require('multer');

// hiển thị sách ra web
exports.ShowBook = (req, res) => {
  Book.getAllBook((data) => {
    res.status(200).json({ listBooK: data });
  })
}

// show sách theo id
exports.detailBooK = (req, res, err) => {
  var id = req.params.id;
  Book.findByID(id, (data) => {
    if (!data) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.status(200).json({ detail: data });
    }
  })
}

//xóa sách 
exports.removeBook = (req, res) => {
  var id = req.params.id;
  Book.Remove(id, (err) => {
    res.status(200).json({ message: 'Book deleted successfully' });
  })
}

//cập nhật file sách và ảnh
exports.uploadFile = (req, res, err) => {
  if (req.fileValidationError) {
    return res.status(400).send(req.fileValidationError);
  } else if (!req.files || !req.files['fileElem'] || !req.files['myImage']) {
    return res.status(400).send('Please select both files to upload');
  }

  // for (let i = 0; i <= 3; i++) {
  //   var Book_id = Math.floor(Math.random() * 3);

  // }
  Book_id = req.params.id;
  var fileBook = req.files['fileElem'][0].filename;
  var fileIMG = req.files['myImage'][0].filename;
  Book.upload([Book_id, fileBook, fileIMG], () => {
    res.json({ data: [Book_id, fileBook, fileIMG] })
  })
}

//lấy theo danh mục sách
exports.categoryBook = (req, res) => {
  var id = req.params.id;
  Book.category(id, (data) => {
    res.status(200).json({ category: data });
  })
}