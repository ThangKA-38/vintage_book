const sql = require('./db');

const Book = (book) => {
    this.book_title = book.book_title
    this.author = book.author
    this.publication_year = book.publication_year
    this.price = book.price
    this.supplier_id = - book.supplier_id
    this.category_id = book.category_id
}

//lấy tất cả sách trong db ra 
Book.getAllBook = (result) => {
    const db = `
    SELECT  
    book.book_id,book.book_title,book.price, book_img_file.image_path,book_img_file.file_image_id,book_category.category_name,book_category.category_id
    FROM book 
    LEFT JOIN book_img_file  
    ON book.book_id = book_img_file.book_id
    LEFT JOIN book_category
    ON book.category_id = book_category.category_id
    GROUP BY book.book_id,book.book_title,book.price, book_img_file.image_path,book_category.category_name,book_category.category_id
    `
    sql.query(db, (err, book) => {
        if (err) {
            result(err, null)
        } else {
            result(book)
        }
    })
}
//Lấy chi tiết từng sách 
Book.findByID = (id, result) => {
    const db = `
    SELECT * from book 
    LEFT JOIN book_img_file 
    ON book.book_id = book_img_file.book_id
    LEFT JOIN book_supplier 
    ON book.supplier_id = book_supplier.supplier_id
    LEFT JOIN book_category 
    ON book.category_id = book_category.category_id
    HAVING book.book_id=${id}
    `;
    sql.query(db, (err, book) => {
        if (err) {
            result(err, null)
        } else {
            result(book)
        }
    })
}

// tìm kiếm sách bằng tên
Book.findByNameBook = (data, result) => {
    sql.query(`SELECT * FROM book WHERE book_title=${data}`, (err, book) => {
        if (err) {
            result(err, null)
        } else {
            result(book)
        }

    })
}

//thêm sách 
Book.addBook = (newData, result) => {
    sql.query('INSERT INTO book SET ?', newData, (err, book) => {
        if (err) {
            result(err, book)
        } else {
            result(null, {
                id: book.insertId, ...newData
            })
        }
    })
}

//xóa sách 
Book.Remove = (id, result) => {
    sql.query(`DELETE FROM book WHERE book_id= ${id}`, (err) => {
        if (err) {
            result(err, null)
            return;
        } else {
            result("xóa dữ liệu sách có id: " + id + " Thành công!")
        }
    })
}

// //Sửa thông tin sách 
// Book.update = (data, result) => {

//     sql.query("UPDATE book SET content=?,image=? WHERE id=?", [data.content, data.image, data.id], (err, res) => {
//         if (err) {
//             result(err, null)
//             return;
//         } else {
//             result(null, res)
//         }
//     })
// }

//thêm ảnh và file 
Book.upload = (newData, result) => {
    const db = 'INSERT INTO booK_img_file (book_id, file_path, image_path) VALUES(?,?,?)';
    sql.query(db, newData, (err, book) => {
        if (err) {
            console.error("Error inserting data:", err);
            result(err, null)
            return;
        }
        console.log("Data inserted successfully:", book);
        result(null, book);
    })
}

Book.getCategory = (result) => {
    const db = `
    SELECT c.category_id,c.category_name, s.supplier_id,s.supplier_name,s.supplier_name,s.address
    FROM book_category c 
    LEFT JOIN book b ON b.category_id = c.category_id 
    LEFT JOIN book_supplier s ON s.supplier_id = b.book_id
    `
    sql.query(db, (err, book) => {
        if (err) {
            result(err, null)
        } else {
            result(book)
        }
    })
}
Book.getByCategoryID = (id, result) => {
    const db = `
    SELECT 
    book.book_id,
    book.book_title,
    book.price,
    book_img_file.image_path,
    book.category_id,
    book_category.category_name
    FROM
        book
    LEFT JOIN book_img_file 
        ON book.book_id = book_img_file.book_id
    LEFT JOIN book_category 
        ON book.category_id = book_category.category_id
    WHERE
        book.category_id = ${id}
    `
    sql.query(db, (err, book) => {
        if (err) {
            result(err, null)
        } else {
            result(book)
        }
    })
}

Book.addCategory = (newData, result) => {
    sql.query('INSERT INTO book_category SET ?', newData, (err, category) => {
        if (err) {
            result(err, category)
        } else {
            result(null, {
                id: category.insertId, ...newData
            })
        }
    })
}

// thêm mới nhà cung cấp
Book.addSupplier = (newData, result) => {
    sql.query('INSERT INTO book_supplier SET ?', newData, (err, supplier) => {
        if (err) {
            result(err, supplier)
        } else {
            result(null, {
                id: supplier.insertId, ...newData
            })
        }
    })
}


module.exports = Book;

