const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// lấy tất cả sản phẩm
router.get('/', productController.getAllProducts);

// lấy các sản phẩm không phải 'regular'
router.get('/not-regular', productController.getNotRegularProducts);

// lấy sản phẩm theo trạng thái cụ thể (vd: 'new', 'hot', 'sale')
router.get('/status/:status', productController.getProductsByStatus);

// lấy chi tiết sản phẩm 
router.get('/detail/:product_id', productController.getProductDetail);

// lấy sản phẩm liên quan theo danh mục 
router.get('/related/:product_id', productController.getRelatedProductsByCategory);

// lấy thông tin danh mục
router.get('/categories', productController.getCategories);

module.exports = router;