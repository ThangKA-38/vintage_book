const Book = require('../models/book.model')
const multer = require('multer');

// hiển thị sách ra web
exports.ShowBook = (req, res) => {
    Book.getAllBook((data) => {
        res.status(200).json({ listBooK: data });
    })
};

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
};

// hiển thị dữ liệu ở trang thêm sách 
exports.showDataCategory = (req, res) => {
    Book.getCategory((data) => {
        res.render('form_Add_book.ejs', { Data: data })
    })

};

exports.All_CataCategory = (req, res) => {
    Book.getCategory((data) => {
        res.json({ category: data })
    })
};

//lấy theo danh mục sách(id)
exports.categoryBook = (req, res) => {
    var id = req.params.id;
    Book.getByCategoryID(id, (data) => {
        res.json({ Data: data })
    })
};


//Thêm sách mới
exports.createNewBook = (req, res) => {
    const newData = {
        book_title: req.body.bookTitle,
        author: req.body.author,
        publication_year: req.body.publicationYear,
        price: req.body.price,

    };
    //kiểm tra xem người dùng có thêm danh mục mới không
    if (req.body.newCategory && req.body.newSupplier) {
        const newCategoryData = {
            category_name: req.body.newCategory,
        };
        const newSupplierData = {
            category_name: req.body.newCategory,
        };
        //thêm vao danh mục mới
        addNewCateg(newCategoryData);
        addNewSupplier(newSupplierData);
        addNewBook(newData)
    } else if (req.body.newCategory) {
        const newCategoryData = {
            category_name: req.body.newCategory,
        };
        addNewCateg(newCategoryData);
    } else if (req.body.newSupplier) {
        newData.category_id = req.body.category;
        const newSupplierData = {
            category_name: req.body.newSupplier,
        };
        addNewSupplier(newSupplierData);
        addNewBook(newData);
    }
    else {
        newData.category_id = req.body.category; // lấy id danh mục có sẵn
        newData.supplier_id = req.body.supplier;
        addNewBook(newData)
    }
    // hàm upload ảnh và ảnh
    console.log(newData);
    if (req.body.newCategory) {

    }
    else {
        newData.category_id = req.body.category; // lấy id danh mục có sẵn
        newData.supplier_id = req.body.supplier;
        addNewBook(newData)
    }
    function uploadFiles(Book_id) {
        // Upload file
        if (req.fileValidationError) {
            return res.status(400).send(req.fileValidationError);
        } else if (!req.files || !req.files['fileElem'] || !req.files['myImage']) {
            return res.status(400).send('Please select both files to upload');
        }

        const fileBook = req.files['fileElem'][0].filename;
        const fileIMG = req.files['myImage'][0].filename;

        const bookFilePath = `/public/upload/${fileBook}`;
        const imageFilePath = `/public/upload/${fileIMG}`;
        Book.upload([Book_id, fileBook, fileIMG], (err) => {
            if (err) {
                res.status(401).json(err);
            } else {
                // res.json({ data: [Book_id, bookFilePath, imageFilePath] });
            }
        })
    };
    //hàm thêm sách
    function addNewBook(data) {
        Book.addBook(data, (err) => {
            if (err) {
                res.status(401).json(err);
            } else {
                uploadFiles(data.id);
                res.json({ 'new booK': data })
            }
        })
    };

    function addNewCateg(data) {
        Book.addCategory(data, (err, category) => {
            if (err) {
                res.status(401).json(err);
            } else {
                newData.category_id = category.id; //thêm category_id  mới vào newData
            }
        })
    };

    function addNewSupplier(data) {
        Book.addCategory(data, (err, supplier) => {
            if (err) {
                res.status(401).json(err);
            } else {
                newData.supplier_id = supplier.id; //thêm category_id  mới vào newData
            }
        });
    }
};

//xóa sách 
exports.removeBook = (req, res) => {
    var id = req.params.id;
    Book.Remove(id, (err) => {
        res.status(200).json({ message: 'Book deleted successfully' });
    })
};

