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
    SELECT  book.book_id,book.book_title,book.price, book_img_file.image_path
    from book 
    LEFT JOIN book_img_file  
    ON book.book_id = book_img_file.book_id
    GROUP BY book.book_id,book.book_title,book.price, book_img_file.image_path
    
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
    `
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
Book.Create = (newData, result) => {
    sql('INSERT INTO book SET = ?', newData, (err, book) => {
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

module.exports = Book;