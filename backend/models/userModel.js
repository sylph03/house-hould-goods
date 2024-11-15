const db = require('../config/db');

// đưa dữ liệu người dùng và cơ sở dữ liệu
const insertUser = (dataUser) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO users(password, email, full_name, gender, date_of_birth, phone_number, address, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const value = [dataUser.password, dataUser.email, dataUser.full_name, dataUser.gender, dataUser.date_of_birth, dataUser.phone_number, dataUser.address, dataUser.role];

        db.query(sql, value, (error, results) => {
            if (error) return reject(error);
            resolve({ user_id: results.insertId, ...dataUser });
        });
    });
};


// lấy dữ liệu người dùng theo email 
const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
            if (error) return reject(error);
            resolve(results[0]);
        });
    });
};

// lấy dữ liệu người dừng theo số điện thoại
const getUserByPhone = (phone_number) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE phone_number = ?', [phone_number], (error, results) => {
            if (error) return reject(error);
            resolve(results[0]);
        });
    });
};

module.exports = {
    insertUser,
    getUserByEmail,
    getUserByPhone
}