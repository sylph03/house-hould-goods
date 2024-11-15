const db = require('../config/db');

// Lấy toàn bộ sản phẩm
const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM products', (error, results) => {
            if (error) {
                console.error("Error fetching all products:", error);
                return reject(error);
            }
            resolve(results);
        });
    });
};

// Lấy thông tin chi tiết về sản phẩm
const getProductDetail = (product_id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT 
                p.product_id, p.product_name, p.product_image_url, p.price, p.old_price, 
                p.product_status, pd.product_description, pd.product_info, p.stock, 
                b.brand_name, c.category_name, c.category_name AS child_category_name,
                parent_c.category_name AS parent_category_name
            FROM 
                products p 
            JOIN 
                product_detail pd ON p.product_id = pd.product_id 
            JOIN 
                brands b ON p.brand_id  = b.brand_id 
            JOIN 
                product_categories pc ON p.product_id = pc.product_id
            JOIN 
                categories c ON pc.category_id = c.category_id   
            LEFT JOIN 
                categories parent_c ON c.parent_category_id = parent_c.category_id
            WHERE 
                p.product_id = ?
            LIMIT 1`, 
            [product_id], 
            (error, results) => {
                if (error) {
                    console.error("Database query error:", error);
                    return reject(error);
                }
                if (results.length === 0) {
                    return reject(new Error("No product found with the given product_id."));
                }
                resolve(results[0]);
            }
        );
    });
};

// Hàm lấy sản phẩm theo trạng thái (new, hot, sale)
const getProductsByStatus = (status) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT product_id, product_name, product_image_url, price, old_price, product_status
             FROM products 
             WHERE product_status = ? 
             LIMIT 10`, 
            [status], 
            (error, results) => {
                if (error) {
                    console.error(`Error fetching products with status ${status}:`, error);
                    return reject(error);
                }
                resolve(results);
            }
        );
    });
};

// Lấy thông tin sản phẩm theo từng trạng thái (new, hot, sale)
const getNewProducts = () => getProductsByStatus('new');
const getHotProducts = () => getProductsByStatus('hot');
const getSaleProducts = () => getProductsByStatus('sale');

// Trả về 3 loại sản phẩm đặc biệt (new, hot, sale)
const getNotRegularProducts = async () => {
    try {
        const [newProducts, hotProducts, saleProducts] = await Promise.all([
            getNewProducts(),
            getHotProducts(),
            getSaleProducts()
        ]);
        return { newProducts, hotProducts, saleProducts };
    } catch (error) {
        console.error("Error fetching not regular products:", error);
        throw error;
    }
};

// Lấy thông tin sản phẩm liên quan theo danh mục
const getRelatedProductsByCategory = (product_id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT DISTINCT 
                p.product_id, 
                p.product_name, 
                p.product_image_url, 
                p.price, 
                p.old_price, 
                p.product_status
            FROM 
                products p
            JOIN 
                product_categories pc ON p.product_id = pc.product_id  
            JOIN 
                categories c ON pc.category_id = c.category_id        
            LEFT JOIN 
                categories parent_c ON c.parent_category_id = parent_c.category_id 
            WHERE 
                (c.category_id IN (SELECT category_id FROM product_categories WHERE product_id = ?)
                OR c.parent_category_id IN (SELECT category_id FROM product_categories WHERE product_id = ?))
                AND p.product_id != ?
            LIMIT 10;
            `, 
            [product_id, product_id, product_id], 
            (error, results) => {
                if (error) {
                    console.error("Error fetching related products by category:", error);
                    return reject(error);
                }
                if (results.length === 0) {
                    return reject(new Error("No related products found with the given product_id."));
                }
                resolve(results);
            }
        );
    });
};

// Lấy dữ liệu danh mục
const getCategories = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM categories ORDER BY parent_category_id ASC', (error, results) => {
            if (error) {
                console.error("Error fetching categories:", error);
                return reject(error);
            }
            resolve(results);
        });
    });
};


module.exports = {
    getAllProducts,
    getNotRegularProducts,
    getProductDetail,
    getProductsByStatus,
    getRelatedProductsByCategory,
    getCategories,
};
