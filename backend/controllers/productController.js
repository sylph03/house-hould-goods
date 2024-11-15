const productModel = require('../models/productModel');

// Lấy toàn bộ sản phẩm
const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: 'Error fetching products' });
    }
};

// Lấy chi tiết sản phẩm
const getProductDetail = async (req, res) => {
    try {
        const { product_id } = req.params;
        const product = await productModel.getProductDetail(product_id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error retrieving product details:", error);
        res.status(500).json({ message: 'Error retrieving product details' });
    }
};

// Lấy các sản phẩm theo trạng thái đặc biệt (new, hot, sale)
const getNotRegularProducts = async (req, res) => {
    try {
        const { newProducts, hotProducts, saleProducts } = await productModel.getNotRegularProducts();
        res.status(200).json({ newProducts, hotProducts, saleProducts });
    } catch (error) {
        console.error("Error fetching not regular products:", error);
        res.status(500).json({ message: "Error fetching not regular products" });
    }
};

// Lấy sản phẩm theo trạng thái
const getProductsByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const products = await productModel.getProductsByStatus(status);
        if (!products.length) {
            return res.status(404).json({ message: `No products found with status ${status}` });
        }
        res.status(200).json(products);
    } catch (error) {
        console.error(`Error fetching products with status ${status}:`, error);
        res.status(500).json({ message: `Error fetching products with status ${status}` });
    }
};

// Lấy sản phẩm liên quan theo danh mục
const getRelatedProductsByCategory = async (req, res) => {
    try {
        const { product_id } = req.params;
        const relatedProducts = await productModel.getRelatedProductsByCategory(product_id);
        res.status(200).json(relatedProducts);
    } catch (error) {
        console.error("Error retrieving related products by category:", error);
        res.status(500).json({ message: "Error retrieving related products by category" });
    }
};

// Lấy danh sách danh mục
const getCategories = async (req, res) => {
    try {
        const categories = await productModel.getCategories();
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error retrieving categories:", error);
        res.status(500).json({ message: 'Error retrieving categories' });
    }
};

module.exports = {
    getAllProducts,
    getProductDetail,
    getNotRegularProducts,
    getProductsByStatus,
    getRelatedProductsByCategory,
    getCategories,
};
