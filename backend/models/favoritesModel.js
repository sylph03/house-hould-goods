const db = require('../config/db');

// Thêm sản phẩm vào mục yêu thích
const insertFavorites = (user_id, product_id) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO favorites(user_id, product_id) VALUES (?, ?)', [user_id, product_id], (error, results) => {
            if (error) {
                console.error("Error insert favorites:", error);
                return reject(error);
            }
            resolve({ favorites_id: results.insertId, user_id, product_id });
        });
    });
};

// Xóa sản phẩm khỏi mục yêu thích
const deleteFavorites = (user_id, product_id) => {
    return new Promise((resolve, reject) => {  
        db.query('DELETE FROM favorites WHERE user_id = ? AND product_id = ?', [user_id, product_id], (error, results) => {
            if (error) {
                console.error("Error delete favorites:", error);
                return reject(error);
            }
            resolve(results); // Trả về kết quả với affectedRows
        });
    });
};

// Lấy danh sách sản phẩm yêu thích của người dùng
const getFavorites = (user_id) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT DISTINCT p.product_id FROM products p
            JOIN favorites f ON p.product_id = f.product_id
            WHERE f.user_id = ?
        `;
        
        db.query(query, [user_id], (error, results) => {
            if (error) {
                console.error("Error getting favorites:", error);
                return reject(error);
            }
            resolve(results);
        });
    });
};

// Kiểm tra sản phẩm đã có trong mục yêu thích chưa
const checkFavoriteExists = (user_id, product_id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM favorites WHERE user_id = ? AND product_id = ?', [user_id, product_id], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results.length > 0); // Trả về true nếu đã có sản phẩm yêu thích
        });
    });
};

module.exports = {
    insertFavorites,
    deleteFavorites,
    getFavorites,
    checkFavoriteExists
};
