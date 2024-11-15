const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoritesController');

// Thêm sản phẩm vào mục yêu thích
router.post('/', favoritesController.insertFavorites);

// Xóa sản phẩm khỏi mục yêu thích
router.delete('/:user_id/:product_id', favoritesController.deleteFavorites); // Chuyển sang params

// Lấy danh sách sản phẩm yêu thích của người dùng
router.get('/:user_id', favoritesController.getFavorites); // Sử dụng params thay vì body

module.exports = router;
