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

exports.showDataCategory = (req, res) => {
  Book.getCategory((data) => {
    res.render('createForm.ejs', { dataCategory: data })
  })
}

//Thêm sách mới
exports.createNewBook = (req, res) => {
  const newData = {
    book_title: req.body.bookTitle,
    author: req.body.author,
    publication_year: req.body.publicationYear,
    price: req.body.price,
  };
  //kiểm tra xem người dùng có thêm danh mục mới không
  if (req.body.newCategory) {
    const newCategoryData = {
      category_name: req.body.newCategory,
    };
    //thêm vao danh mục mới
    Book.addCategory(newCategoryData, (err, newCategory) => {
      if (err) {
        res.status(401).json(err);
      } else {
        newData.category_id = newCategory.id; //thêm category_id  mới vào newData
        Book.addBook(newData, (err, newBook) => {
          if (err) {
            res.status(401).json(err);
          } else {
            uploadFiles(newBook.id);
          }
        });
      }
    });
  } else {
    newData.category_id = req.body.category; // lấy id danh mục có sẵn
    Book.addBook(newData, (err, newBook) => {
      if (err) {
        res.status(401).json(err);
      } else {
        uploadFiles(newBook.id);
      }
    });
  }

  // hàm upload ảnh và file
  function uploadFiles(Book_id) {
    // Upload file
    if (req.fileValidationError) {
      return res.status(400).send(req.fileValidationError);
    } else if (!req.files || !req.files['fileElem'] || !req.files['myImage']) {
      return res.status(400).send('Please select both files to upload');
    }

    const fileBook = req.files['fileElem'][0].filename;
    const fileIMG = req.files['myImage'][0].filename;

    Book.upload([Book_id, fileBook, fileIMG], (err) => {
      if (err) {
        res.status(401).json(err);
      } else {
        res.json({ message: 'Thêm sách và tải ảnh thành công' });
      }
    });
  }
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
  Book.getByCategoryID(id, (data) => {
    //res.status(200).json({ category: data });
    res.render({ Data: data })
  })
}